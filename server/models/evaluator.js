
const ranks = {
    royalFlush: false,
    straitFlush: false,
    pairFours: false,
    fullHouse: false,
    flush: false,
    straight: false,
    pairThrees: false,
    twoPairTwos: false,
    pair: false,
    highCard: true
};

/*
    Fine for now but there are better ways of doing this if hosting multiple games
*/

class Evaluate {
    #handOneRank = {...ranks};
    #handOne = []
    #handTwoRank = {...ranks};
    #handTwo = []

    checkPair(int, array) {
        
        array.forEach(element => {
            if(element)
        })
    }
    checkHouse() {

    }

    rankHand(hand, handNumber) {
        var suitMap = new Map()
        var valueMap = new Map()
        hand.forEach(card => {
            if(!suitMap.has(card.getSuit())) {
                suitMap.set(card.getSuit(), 1);
            }
            else {
                let currentValue = suitMap.get(card.getSuit());
                suitMap.set(card.getSuit(), currentValue + 1);
            }
        });
        hand.forEach(card => {
            if(!valueMap.has(card.getValue())) {
                valueMap.set(card.getValue(), 1);
            }
            else {
                let currentValue = valueMap.get(card.getSuit());
                valueMap.set(card.getValue(), currentValue + 1);
            }
        });
    }

    //get and sorts cards
    constructor(handOne, handTwo) {
        this.#HandOne = handOne;
        this.#handOne.sort((card1, card2) => card1.getValue() - card2.getValue())

        this.#HandTwo = handTwo;
        this.#handOne.sort((card1, card2) => card1.getValue() - card2.getValue())
    }
    


}