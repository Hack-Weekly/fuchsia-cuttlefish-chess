const Deck = require("./deck")
const Player = require("./player")
const Hand = require('pokersolver').Hand
const WebSocket = require('ws')
class Game {


    //game settings
    #startingCash = 5000
    #maxPlayers = 7;
    #elimination = true;

    //game properties

    #gameid
    #deck = []
    #listOfPlayers = [];
    #winners = [];
    #river = [5];
    #pot = 0;
    #bblind = 1
    #lblind = 0
    #startGame = false;
    //Whenever there is a raise everyone
    #lastToBet = this.#lblind

    //holds the id value for the player its accepting inputs for.
    #bettingPlayer;
    #round = 0
    #numOfPlayers = 0;
    #playersOut = 0;
    

    constructor(gameid) {
        this.#gameid = gameid;
        this.#listOfPlayers = []
    }

    drawCard() {
        return this.#deck.shift();
    }
    reset() {
        if(!this.#elimination)  {
            this.#listOfPlayers = this.#listOfPlayers.filter(
                player => player.getStatus() === "out")
            this.#numOfPlayers = this.#listOfPlayers.length
        }
        this.#round = 0
        this.#pot = 0;
    }

    //returns true if they can join
    playerJoins(playerid, ws) {
        if(this.#numOfPlayers >= this.#maxPlayers) {
            return false;
        }
        else {
            //sets the table position to
            this.#listOfPlayers.push(
                new Player(playerid, this.#startingCash, this.#numOfPlayers, ws)
            );
            this.#numOfPlayers++;
            //if table is filled moves to the first round
            if(this.#numOfPlayers == this.#maxPlayers) {
                this.newRound();
            }
            this.broadcastGameState();
            return true;
        }
        
    }

    playerLeaves(playerid) {
        //handles players leaving on elimination mode.
        //Basically no new players can join until someone wins
        //this.#numOfPlayers--;
        let i = 0;
        for(let index = 0; index < this.#listOfPlayers.length; index++) {
            let player = this.#listOfPlayers[index]
            if (!player) {
                console.log("Player is undefined at index", index);
                continue;
            }
            if(player.getID() == playerid) {
                //set to out
                player.setStatus(4)

            }
            else if(player.getStatus() == "out") {
                //do nothing if already out
                //should only matter if in elimination mode
            }
            else {
                //update the table position
                player.setTablePosition(i);
                i++;
                //if the blind is ever over the players not out
                if(this.#bblind == (this.#numOfPlayers - this.#playersOut ) - 1) {
                    this.#lblind = this.#bblind;
                    this.#bblind = 0;
                }
                else if(this.#lblind == (this.#numOfPlayers - this.#playersOut ) - 1) {
                    this.#lblind = this.#bblind;
                    this.#bblind++
                }
                this.#playersOut++;
            }
        }
        this.broadcastGameState();
        
         
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
        let player = this.#listOfPlayers.find(player => player.getID() === playerid);
        if(!player) return false;
        else if(player.getTablePosition() == this.#bettingPlayer) {
            return false;
        }
        else{
            this.broadcastGameState();
            return true;
        }
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
            if(player.getStatus() != "fold" || player.getStatus() != "out") {
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

    //checks if there are one or more winners and calls the addWinnings function to add to player's cash.
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
    /**
     * ROUNDS
     * 0 - player check: if ironman starts game when full
     */
    endRound() {

        //if end round is called and it's the last round it finds the winner.
        if(this.#round == 5) {
            this.evaluate();
            this.getWinner();
            this.reset()
            this.moveBlinds();
        }

        //5th card
        if(this.#round == 4) {
            this.#river.push(this.drawCard())
        }
        //4th card
        if(this.#round == 3) {
            this.#river.push(this.drawCard())
        }
        //First 3 cards
        if(this.#round == 2) {
            for(let i = 0; i < 3; i++) {
                this.#river.push(this.drawCard())
            }
            
        }
        switch (this.#round) {
            case 5:
                this.evaluate();
                this.getWinner();
                this.reset()
                this.moveBlinds();
                break;
            case 4:
                this.#river.push(this.drawCard())
                break;
            case 3:
                this.#river.push(this.drawCard())
                break;
            case 2:
                for(let i = 0; i < 3; i++) {
                    this.#river.push(this.drawCard())
                }
                break;
            case 1:
                
                break;
            case 0:

            default:
                break;
        }
        this.#round
    }

    newRound() {
        //sets the last to bet to the little blind. Sets to one before the 
        this.#lastToBet = this.#lblind

    }
    newGame() {
        this.#deck = new Deck();
        let continueGame =  true
        for(let i = 0; i < 5; i++) {
            this.#deck.shuffle();
        }
        while(this.#playersOut < this.#maxPlayers -1 || continueGame ) {
            for(let i = 0; i < this.#numOfPlayers; i++) {
                // If the player is the 'big blind' player
                if(i == this.#bblind) { // Assuming that you have the big blind index
                    this.setPlayerStatus(this.#listOfPlayers[i].getID(), 'thinking');
                } else {
                    this.setPlayerStatus(this.#listOfPlayers[i].getID(), 'waiting');
                }
            }
            this.#round++
            if(this.#round >= 4) {
                continueGame = false
            }
        }
        
        //change everything to default
        
    }
    
    broadcastGameState() {
        
        this.#listOfPlayers.forEach(player => {
            console.log("testing broadcast")
            console.log("Player ID: ", player.getID());
            let gameState = this.toJSON(player.getID());
            let message = JSON.stringify(gameState);
            console.log(message)
            player.getWS().send(message);
        })
    }
    //might need a round to show all cards.
    toJSON(playerid) {
        let player = this.#listOfPlayers.find(fPlayer => fPlayer.getID() === playerid)

        let river = []
        const jsonObject = {
            numOfPlayers: this.#numOfPlayers,
            maxPlayers: this.#maxPlayers,
            round: this.#round,
            pot: this.#pot,

            playerToBet: this.#bettingPlayer,
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
            if(player.getID() == playerid || this.#round == 5) {
                let hand = player.showHand(player.getID());
                for(let j = 0; j < hand.length; j++) {
                    const handObject = {
                        card: hand[j],
                    }
                    playerObject.hand.push(handObject)
                }
            }
            for(let k = 0; k < river.length; k++) {
                this.#river.forEach(card => {
                    const riverObject = {
                        card: card
                    }
                    jsonObject.river.push(riverObject)
                })
            }
            jsonObject.players.push(playerObject);

        }
        return jsonObject;
    }
}

module.exports = Game;