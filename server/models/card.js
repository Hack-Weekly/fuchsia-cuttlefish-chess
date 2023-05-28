
class Card {
    static values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    static suits = ["h", "d", "s", "c"];

    #value;
    #suit;

    constructor(valueIndex, suitIndex) {
        this.#value = Card.values[valueIndex];
        this.#suit = Card.suits[suitIndex];
    }

    getValue() {
        return this.#value
    }
    setValue(value) {
        this.#value = value
    }

    getSuit() {
        return this.#suit
    }
    setSuit(suit) {
        this.#suit = suit
    }
    getCardValue() {
        return this.#value + this.#suit
    }

    toJSON() {
        let jsonObject = {
            value: this.#value,
            suit: this.#suit
        }
    }
}
    
module.exports = Card;