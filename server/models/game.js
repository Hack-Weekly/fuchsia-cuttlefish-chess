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

    playerJoins(playerid) {
        if(this.#numOfPlayers >= this.#maxPlayers)
        this.#listOfPlayers.push(playerid);
    }

    playerLeaves(playerid) {
        this.#listOfPlayers = this.#listOfPlayers.filter(item => item !== playerid);
    }

    getStatus()


    newGame() {
        this.#deck = new Deck();
        for(let i = 0; i < 5; i++) {
            this.#deck.shuffle();
        }
    }
}

module.exports = Game;