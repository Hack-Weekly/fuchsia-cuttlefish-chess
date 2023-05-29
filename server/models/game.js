const Deck = require("./deck")
const Player = require("./player")
const Hand = require('pokersolver').Hand;
class Game {

    /* 
        Default setting. Basically a new player won't be able to join if the table has a game in progress
    */
    #inProgress = false
    


    #startingCash = 5000

    //keeps track of which user is anting up all or half
    #bblind
    #lblind

    //game identifier for object
    #gameid

    //object from the Deck class
    #deck



    //Determines number of hands to render and when to refuse connections
    #numOfPlayers = 0;
    #maxPlayers = 7;
    #playersOut = 0;
    //gets id values in an array for 
    #listOfPlayers;
    #winners = [];
    #river = [];
    #pot = 0


    //controlls the layout of the player's ui if not on bet it grays it out
    //if one player puts and overlay to wait for player.

    #state = "empty";
    #round = 1
    

    constructor(gameid) {
        this.#gameid = gameid;
        this.#listOfPlayers = []
    }

    //returns true if they can join
    async playerJoins(playerid) {
        if(this.#numOfPlayers >= this.#maxPlayers) {
            return false;
        }
        else {
            //sets the table position to
            this.#listOfPlayers.push(
                new Player(playerid, this.#startingCash, this.#numOfPlayers)
            );
            this.#numOfPlayers++;
            if (this.#numOfPlayers === this.#maxPlayers) {
                try {
                    await this.newGame();
                } catch (err) {
                    console.error(err);
                    return false;
                }
            }
            return true;
        }
    }

    async playerLeaves(playerid) {
        this.#numOfPlayers--;
        this.#listOfPlayers = this.#listOfPlayers.filter(player => player.getID() !== playerid);
        let i = 0;
        this.#listOfPlayers = this.#listOfPlayers.forEach(player => {
            player.setTablePosition(i);
            i++;
            this.#playersOut++;
        }) 
    }

    isThinking(playerid) {
        let player = this.#listOfPlayers.find(player => player.getID() === playerid);

        if(!player || player.getPlayerStatus() != "thinking") return false;

        return true;
    }
    getPlayerStatus() {
        newListOfPlayers = []
        return this.#listOfPlayers.map(player => {
            player.setID(8);
        });
    }

    setPlayerStatus(playerid, value, amount = 0) {
        return new Promise((resolve, reject) => {
            let player = this.#listOfPlayers.find(player => player.getID() === playerid);
            if(!player) return reject('Player not found');
            
            if(player.getStatus() === "thinking") {
                let timeout = setTimeout(() => {
                    // If player did not respond, make a default move.
                    player.setStatus(Player.actions.indexOf("check"));
                    resolve();
                }, 30000); // Wait for 30 seconds.
    
                // Listen for the player's action and clear the timeout if player has responded.
                player.on('action', () => {
                    clearTimeout(timeout);
                    resolve();
                });
            } else {
                reject('Player is not thinking');
            }
        });
    }

    /*
        Moves the blinds after a game
    */
    moveBlinds() {
        if(this.#bblind == this.#numOfPlayers - 1) {
            this.#lblind = this.#bblind;
            this.#bblind = 0;
        }
        else if(this.#lblind == this.#numOfPlayers - 1) {
            this.#lblind = this.#bblind;
            this.#bblind++;
        }
    }

    convertCards(cards) {
        return cards.map(card => card.getCardValue());
    }

    /*
    this is really badly implemented. Will write a better evaluation algorithim in the future
    */
    evaluate() {
        let jsonObject = {
            hands: []
        }
        this.#listOfPlayers.forEach(player => {
            if(player.getStatus() != "fold") {
                this.#winners.push(player)
            }
        });

        let handArray = []

        for(let i = 0; i < this.#winners.length; i++) {
            this.#river.forEach(card => {
                handArray.push(card.getCardValue())
            })
            this.#winners[i].getHandStatus().forEach(card => {
                handArray.push(card.getCardValue())
            })

            var handCards = convertCards(handArray);
            var hand = Hand.solve(handCards);
            this.#winners[i].setRank(hand.rank);
        }

        this.#winners.sort((player1, player2) => player2.getRank() - player1.getRank());
    }
    //adds to the balance in the list of players field

    addWinnings(playerid, value) {
        this.#listOfPlayers.forEach(player => {
            if(player.getID() === playerid) {
                player.addCash(value);
            }
        })
    }

    getWinner() {
        let isTied = true;
        let  PotSplit = 1;
        let i = 0
        while(isTied) {
            if(this.#winners[i].getRank() === this.#winners[i+1]) {
                PotSplit++;
            }
            else {
                isTied = false;
            }
        }
        if(PotSplit > 1) {

        }
        for(let i = 0; i < PotSplit; i++) {
            this.addWinnings(this.#winners[i].getID(), (this.#pot/PotSplit));
        }
    }
    
    async newGame() {
        this.#deck = new Deck();
        let continueGame =  true
        for(let i = 0; i < 5; i++) {
            this.#deck.shuffle();
        }
        while(this.#playersOut < this.#maxPlayers -1 || continueGame ) {
            for(let i = 0; i < this.#numOfPlayers; i++) {
                // If the player is the 'big blind' player
                if(i == this.#bblind) { // Assuming that you have the big blind index
                    await this.setPlayerStatus(this.#listOfPlayers[i].getID(), 'thinking');
                } else {
                    await this.setPlayerStatus(this.#listOfPlayers[i].getID(), 'waiting');
                }
            }
            this.#round++
            if(this.#round >= 4) {
                continueGame = false
            }
        }
        this.evaluate();
        this.getWinner();
        this.moveBlinds();
        //change everything to default
        reset()
    }
    toJSON(playerid) {
        let player = this.#listOfPlayers.find(fPlayer => fPlayer.getID() === playerid)
        let hand = player.getHandStatus(playerid)
        let river
        const jsonObject = {
            numOfPlayers: this.#numOfPlayers,
            maxPlayers: this.#maxPlayers,
            round: this.#round,
            pot: this.#pot,
            river: [],
            players: []
        };

        for(let i = 0; i < this.#listOfPlayers.length; i++) {
            const player = this.#listOfPlayers[i];
            const playerObject = {
                balance: player.getCash(),
                bet: player.getBet(),
                tablePosition: player.getTablePosition(),
                hand: []
            }

        }
    }
}

module.exports = Game;