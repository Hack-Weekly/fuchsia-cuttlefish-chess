/**
 * Class to hold information about a user in a class object
 * 
 */


class Player {

    static #actions = ["check", "fold", "raise","thinking", "out", "allin"];

    #status;

    //websocket id associated with 
    #playerid;

    #amount;
    #bet
    #tablePosition;

    #hand = [];
    #rank;
    constructor(playerid, startingAmount, position) {
        this.#playerid;
        this.#amount = startingAmount;
        this.#tablePosition = position;
    }

    dealHand(cards) {
        cards.forEach(card => {
            this.#hand.push(card);
        });
    }
    showHand() {
        return this.#hand;
    }
    getStatus() {
        return this.#status;
    }
    setStatus(value) {
        //Default to thinking for any out of range numbers
        if(value < 0 || value > 5) {
            this.#status = Player.#actions[4];
        }
        //Default to thinking for any non numbers and floats
        if (!isNaN(value) || !Number.isInteger(value)) {
            this.#status = Player.#actions[4];
        }
        else {
            this.#status = Player.#actions[value];
        }
    }

    getID() {
        return this.#playerid;
    }
    setID(playerid) {
        this.#playerid = playerid;
    }

    getRank() {
        return this.#rank;
    }
    setRank(rank) {
        this.#rank = rand
    }
    addCash(amount) {
        this.#amount += amount;
    }
    
    removeCash(amount) {
        if (this.#amount >= amount) {
            this.#amount -= amount;
            return true;
        } else {
            return false;
        }
    }
    getCash() {
        return this.#amount;
    }

    placeBet(bet, minimum) {
        if(bet < minimum || bet < 0) {
            return false; 
        }
        if(bet > minimum) {
            if(bet > this.#amount) {
                this.#bet = this.#amount;
            }
            this.#bet = bet
            return true
        }
    }

    getBet() {
        return this.#bet;
    }
    setBet() {
        return this.#bet
    }

    getTablePosition() {
        return this.#tablePosition;
    }
}

module.exports = Player