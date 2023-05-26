const Deck = require("./deck")

class game {
    //Determines number of hands to render
    #numOfPlayers = 0;
    //gets id values in an array for 
    #listOfPlayers = [];
    //controlls the layout of the player's ui if not on bet it grays it out
    //if one player puts and overlay to wait for player.
    #state = "empty";
    #round = ""
    

    constructor(numOfPlayers) {
        this.newGame();
    }

    playerJoins(playerid) {
        this.#listOfPlayers.push(playerid);
    }

    playerLeaves(playerid) {
        this.#listOfPlayers = this.#listOfPlayers.filter(item => item !== playerid);
    }


    newGame() {
        this.#deck = new Deck();
        for(i = 0; i < 5; i++) {
            this.#deck.shuffle();
        }
        
    }


}