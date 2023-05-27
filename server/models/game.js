const Deck = require("./deck")

class Game {

    //socket identifier for actions user takes
    static #actions = ["check", "fold", "raise"]

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

    //hands
    #hand

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
            this.#numOfPlayers++;
            this.#listOfPlayers.push(playerid);
            return true;
        }
        
    }

    playerLeaves(playerid) {
        this.#listOfPlayers = this.#listOfPlayers.filter(item => item !== playerid);
    }
    //JSON message to emit to players about the game. Their hand, round, pot, bet, and other information
    getStatus(playerid) {

    }


    newGame() {
        this.#deck = new Deck();
        for(let i = 0; i < 5; i++) {
            this.#deck.shuffle();
        }
    }
}

module.exports = Game;