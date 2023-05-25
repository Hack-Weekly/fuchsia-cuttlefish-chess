const Deck = require("./deck")

class game {
    #numOfPlayers
    #deck;
    

    constructor(numOfPlayers) {
    }

    updatePlayerCount(numOfPlayers) {
        this.#numOfPlayers
    }

    newGame() {
        this.#deck = new Deck();
    }


}