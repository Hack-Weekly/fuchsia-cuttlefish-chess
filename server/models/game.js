const Deck = require("./deck")
const Player = require("./player")
class Game {

    

    /* 
        Default setting. Basically a new player won't be able to join if the table has a game in progress
    */
    #eliminationMode = true
    #inProgress = false
    
    /*
        If not using this setting the player will use this boolean to wait to connect using this
    */
    #inRound = false;


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
    //JSON message to emit to players about the game. Their hand, round, pot, bet, and other information
    getHandStatus(playerid) {
        gets
        let player = this.#listOfPlayers.find(player => player.getID() === playerid);
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


    newGame() {
        this.#deck = new Deck();
        for(let i = 0; i < 5; i++) {
            this.#deck.shuffle();
        }

        for(let i = 0; i < 5; i++) {
            let roundFinished = false; 
            this.#listOfPlayers.forEach
            if(!roundFinished) {

            }
        }
        this.hands
    }
}

module.exports = Game;