
class Card {
    static values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    static suits = ["Hearts", "Diamonds", "Spades", "Clubs"];

    #value;
    #suit;
    card;

    constructor(valueIndex, suitIndex) {
        this.#value = Card.values[valueIndex];
        this.#suit = Card.suits[suitIndex];
        this.card = this.toString();
    }
    card

    toString() {
        
        //Handles to string for number cards
        switch (this.#value) {
            case 1:
                return "Ace of " + this.#suit;
            case 2:
                return "Two of " + this.#suit;
            case 3:
                return "Three of " + this.#suit;
            case 4:
                return "Four of " + this.#suit;
            case 5:
                return "Five of " + this.#suit;
            case 6:
                return "Six of " + this.#suit;
            case 7:
                return "Seven of " + this.#suit;
            case 8:
                return "Eight of " + this.#suit;
            case 9:
                return "Nine of " + this.#suit;
            case 10:
                return "Ten of " + this.#suit;
            case 11:
                return "Jack of " + this.#suit;
            case 12:
                return "Queen of " + this.#suit;
            case 13:
                return "King of " + this.#suit;
            default:
                console.log("Unexcepted input");
                break;
        }
    }
}
    
module.exports = Card;