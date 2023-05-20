const Card = require("./card.js")

/**
 * Deck class for creating an array of card objects and
 * handles methods like shuffling the deck.
 * 
 * @param stack : private field containing the deck of cards not
 * on the table.
 */
class Deck {
    #stack = [];

    constructor() {
        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 13; j++) {
                const newCard = new Card(j, i);
                this.#stack.push(newCard);
            }
        }
    }

    printDeck() {
        this.#stack.forEach(card => {
            console.log(card.card);
        });

    }
    swap(i, j) {
        //const temp = this.#deck[i];
    }

    /**
     * Method to split the deck and uses a modelo operator to determine which
     * half to add first.
     */
    shuffle() {
        const firstHalf = this.#stack.slice(0, this.#stack.length/2);
        const secondHalf = this.#stack.slice(this.#stack.length/2);
        const originalLength = this.#stack.length;

        this.#stack = [];
        for(let i = 0; i < (originalLength/2); i++) {
            if(i % 2 == 0) {
                this.#stack.push(firstHalf[i])
                this.#stack.push(secondHalf[i])
            }
            else {
                this.#stack.push(secondHalf[i])
                this.#stack.push(firstHalf[i])
            }
        }
    }
}


module.exports = Deck;
