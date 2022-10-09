import Game from './Game.js';
import Card from './Card.js';

export default class Player extends Game {
   
    constructor(el, id) {
        super(el);
        this._id = id;
        this._el = el;
        this._score = 0;
        this._isPlaying = true;
        this._isGameover = false;
        this._elCardSpace = this._el.querySelector('.cards-space');
        this._elPlayerBtns = this._el.querySelectorAll('button');
        this._cardsDeck = new Card;
    }

    play() {
        //take a card 
        let card = this._cardsDeck.pickRandomCard();
        let cardDomString = `<div class="card-container"><img src="assets/image/cards/${card.img}.png"></div>`;
        this._elCardSpace.insertAdjacentHTML('beforeend', cardDomString);
        //update score
        this._score += card.value;
        //check score over 21 (if so, game over)
        if (this._score > 21) {
            this._isPlaying == false;
            this._isGameover = true;
            this.gameOverState();
        }
    }

    stop() {
        this._isPlaying = false;
        this.onHoldState();
    }

    getIsPlaying() {
        return this._isPlaying;
    }

    getIsGameOver() {
        return this._isGameover;
    }

    getScore() {
        return this._score;
    }

    getId() {
        return this._id;
    }
    
}