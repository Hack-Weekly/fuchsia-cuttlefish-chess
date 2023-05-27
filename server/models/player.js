/**
 * Class to hold information about a user in a class object
 * 
 */


class Player {

    static #actions = ["check", "fold", "raise", "bet", "waiting", "thinking"];

    #status;

    //websocket id associated with 
    #playerid;

    #amount;
    #tablePosition;

    #hand = [];
    constructor(playerid, startingAmount, position) {
        this.#playerid
    }

    dealHand(cards) {
        cards.forEach(card => {
            this.#hand.push(card);
        });
    }

    showHand(id) {
        return null;
    }
    getStatus() {
        return this.#status
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
                return null;
                break;
        }

    }

    getID() {
        return this.#playerid;
    }
    setID(playerid) {
        this.#playerid = playerid;
    }
}

module.exports = Player