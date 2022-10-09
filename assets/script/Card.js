export default class Card {

    constructor() { 
        this._figures = ["jack", "queen", "king", "ace"];
        this._hearts = this.createSuit("hearts");
        this._diamonds = this.createSuit("diamonds");
        this._clubs = this.createSuit("clubs");
        this._spades = this.createSuit("spades");
        this._cardsDeck = [this._hearts, this._diamonds, this._clubs, this._spades];
    }

    createSuit(cardType) {
        let suit = [];
        let numCard = 2;
        let card;
        let figuresIndex = 0;
        for (let i = 0, k = 13; i < k; i++) {
             if (numCard > 10) {
                card = {id:i, img:`${this._figures[figuresIndex]}_of_${cardType}`, value:10};
                figuresIndex++;
            } else {
                card = {id:i, img:`${numCard}_of_${cardType}`, value:numCard};
            }
            suit.push(card);
            numCard++;
        }
        return suit;
    }

    pickRandomCard() {
        let randomSuit = this._cardsDeck[Math.floor(Math.random() * this._cardsDeck.length)];
        let randomCard = randomSuit[Math.floor(Math.random() * randomSuit.length)];
        return randomCard;
    }

}