const Game = require("../models/game");


class GameService {
    #game
    #wss
    constructor() {
        this.#game = new Game()
        this.#wss = new WebSocket.Server({ server });
    }
    addPlayer() {
        
    }

    handleCommand(command, value) {
    }

    broadcastGameState() {
        this.#game
    }
}