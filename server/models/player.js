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
        switch (value) {
            case 0:
                this.#status = Player.#actions[value]
                break;
            case 1:
                this.#status = Player.#actions[value]
                break;
            case 2:
                this.#status = Player.#actions[value]
                break;
            case 3:
                this.#status = Player.#actions[value]
                break;
            case 4:
                this.#status = Player.#actions[value]
                break;
            case 5:
                this.#status = Player.#actions[value]
                break;
            case 6:
                this.#status = Player.#actions[value]
                break;              
            default:
                break;
        }

    }

    getID() {
        return this.#playerid;
    }
    setID(playerid) {
        this.#playerid = playerid;
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
            th
            return true
        }
    }
}

module.exports = Player