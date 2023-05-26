//Package Requirements
const express = require("express")
//const cors = require("cors")
const http = require("http")
const WebSocket = require('ws')

//Import other locally stored javascript methos classes etc
const card = require('./models/card')
const userRoutes = require('./routes/userRoutes.js')
const Game = require("./models/game")

const app = express();
app.use(express.json());
app.use('/user', userRoutes);
const server = http.createServer(app);
var wss = new WebSocket.Server({ server });

//array of instances of games
games = [];

for(i = 0; i < 5; i++) {
    games.push(new Game(i))
}


wss.on('connection', (ws) => {
    //on connection assign unique id
    let id = uuid.v4();
    ws.id = id;
    let game = games[0]

    game.playerJoins(id);
    ws.on('close', () => {
        game.playerLeaves(id)
        console.log( `Connection ${ws.id} closed.` );
    });
});

server.listen(3000, () => {
    console.log("Listening on http://localhost:3000")
})


//var testCard = new card(1, 3);

//console.log(testCard)