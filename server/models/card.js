
class Card {
    static #values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    static #suits = ["Hearts", "Diamonds", "Spades", "Clubs"];

    #value;
    #suit;

    constructor(valueIndex, suitIndex) {
        this.#value = values[valueIndex];
        this.#suit = suit[suitIndex];
    }

    toString() {
        
        //Handles to string for number cards
        if(this.#value > 1 && this.#value < 11) {

        }
        else {

        }
    }
}
    