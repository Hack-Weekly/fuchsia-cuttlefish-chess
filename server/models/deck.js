const Card = require('card.js')

class Deck {
    #cards = [];


    constructor() {
        for(i = 0; i < 5; i++) {
            for(j = 0; j < 14; j++) {
                newCard = Card(i, j)
                this.#cards.push()
            }
        }
    }

}