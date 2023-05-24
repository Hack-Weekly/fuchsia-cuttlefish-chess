//Package Requirements
const express = require("express")
//const cors = require("cors")
const http = require("http")
const WebSocket = require('ws')

//Import other locally stored javascript methos classes etc
const card = require('./models/card')
//const db = require('./models')
const Deck = require("./models/deck")
const userRoutes = require('./routes/userRoutes.js')

const app = express();
app.use('/user', userRoutes);
const server = http.createServer(app);
var ws = new WebSocket.Server({ server });


server.listen(3000, () => {
    console.log("Listening on http://localhost:3000")
})


//var testCard = new card(1, 3);

//console.log(testCard)