export default class Game {

    constructor(el) {
        this._el = el;
        this._isNextPlayer = false;
    }

    nextPlayer(player) {
        this.passiveState();
        player.activeState();
    }

    activeState() {
        this._el.classList.add('player-enable');
        this._isNextPlayer = true;
    }

    passiveState() {
        this._el.classList.remove('player-enable');
        this._isNextPlayer = false;
    }

    gameOverState() {
        this._el.classList.add('player-loose');
    }

    onHoldState() {
        this._el.classList.add('player-on-hold');
    }

    

}