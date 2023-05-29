
//Package Requirements
const express = require("express")
//const cors = require("cors")
const http = require("http")
const WebSocket = require('ws')
const uuid = require("uuid")

//Import other locally stored javascript methos classes etc
const card = require('./models/card')
//const userRoutes = require('./routes/userRoutes.js')
const Game = require("./models/game")

const app = express();
app.use(express.json());
//app.use('/user', userRoutes);

const server = http.createServer(app);


function broadcastStatusChange(wss, playerId) {
    // Get the game state for the player with toJSON
    let gameState = game.toJSON(playerId);

    // Convert game state to a string
    let gameStateStr = JSON.stringify(gameState);

    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(gameStateStr);
        }
    });
}

const wss = new WebSocket.Server({ server });
const game = new Game(1);

wss.on('connection', (ws) => {
    //on connection assign unique id
    let id = uuid.v4();
    ws.id = id;
    

    
    const playerId = ws.id
    const success = game.playerJoins(playerId);

    if (!success) {
        ws.close(1001, 'Game is full');
    } else {
        // Handle game connection as normal
    }

    console.log( `Connection ${ws.id} open.` );

    ws.on('message', (message) => {

        try {
            let data
            data = JSON.parse(message);
                game.setPlayerStatus(data.playerid, data.action, data.value).catch(error => {
                console.log(`Error setting player status: ${error}`);
            });

            broadcastStatusChange(wss, data.playerid);
        } catch (err) {
            console.error( `Failed to process message: ${err}` );
        }
    });
    ws.on('close', () => {
        if()
        game.playerLeaves(id);
        console.log( `Connection ${ws.id} closed.` );
        let i = 0;
        game.list
    });
});


server.listen(3000, () => {
    console.log("Listening on http://localhost:3000")
})


//var testCard = new card(1, 3);

//console.log(testCard)