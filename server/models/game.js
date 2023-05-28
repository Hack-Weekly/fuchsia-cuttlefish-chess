const Deck = require("./deck")
const Player = require("./player")
const Hand = require('pokersolver').Hand;
class Game {

    /* 
        Default setting. Basically a new player won't be able to join if the table has a game in progress
    */
    #eliminationMode = true
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
    //gets id values in an array for 
    #listOfPlayers = [];
    #winners = [];
    #river = [];
    #pot = 0


    //controlls the layout of the player's ui if not on bet it grays it out
    //if one player puts and overlay to wait for player.

    #state = "empty";
    #round = 1
    

    constructor(gameid) {
        this.#gameid = gameid;
        this.newGame();
    }

    //returns true if they can join
    playerJoins(playerid) {
        if(this.#numOfPlayers >= this.#maxPlayers) {
            return false;
        }
        else {
            //sets the table position to
            this.#listOfPlayers.push(
                new Player(playerid, this.#startingCash, this.#numOfPlayers)
            );
            this.#numOfPlayers++;
            return true;
        }
        
    }

    playerLeaves(playerid) {
        this.#numOfPlayers--;
        if(this.#eliminationMode) {
            
        }
        this.#listOfPlayers = this.#listOfPlayers.filter(player => player.getID() !== playerid);
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

    // websocketid and the switch/case value for state. Does nothing if its not their turn.
    setPlayerStatus(playerid, value) {
        let player = this.#listOfPlayers.find(player => player.getID() === playerid);
        
        if(!player) return false
        
        if(player.getPlayerStatus() === "thinking") {
            let timeout = setTimeout(() => {
                if(player.get)
                player.setStatus(Player.actions.indexOf("check"));
            })
        }
        return false;
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

            var handCards = convertCards(hand1Array);
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
            this.addWinnings(this.#winners[i].getID, (this.#pot/PotSplit));
        }
    }
    

    newGame() {
        this.#deck = new Deck();
        for(let i = 0; i < 5; i++) {
            this.#deck.shuffle();
        }

        for(let i = 0; i < 5; i++) {
            let roundFinished = false; 
            if(!roundFinished) {

            }
        }
        this.hands
    }
    
    toJSON(playerid) {
        let hand = this.getHandStatus(playerid)
        let river
        const jsonObject = {
            numOfPlayers: this.#numOfPlayers,
            maxPlayers: this.#maxPlayers,
            round: this.#round,
            hand: [],
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