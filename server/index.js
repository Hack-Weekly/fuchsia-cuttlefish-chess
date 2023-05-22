//Package Requirements
const express = require("express")
//const cors = require("cors")
//const http = require("http")

//Import other locally stored javascript methos classes etc
const card = require('./models/card')
//const db = require('./models')
const Deck = require("./models/deck")
const 


const app = express();



const deck = new Deck()
for(let i = 0; i < 10; i++) {
    deck.shuffle();
}
var sock = new WebSocket();
sock.send()
deck.printDeck();
//var testCard = new card(1, 3);

//console.log(testCard)