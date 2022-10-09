import Player from './Player.js';

export default class Board {

    constructor(numPlayers) {
        this._numPlayers = numPlayers;
        this._elParent = document.querySelector('main');
        this._elResultWindow = document.querySelector('.result-window');
        this._elResultContainer = this._elResultWindow.querySelector('.result-container');
        this._elResultPortraitContainer = this._elResultWindow.querySelector('.result-portrait-container');
        this._players = []; 
        this._totalRounds;
        this._elSpanRounds = this._elResultWindow.querySelector('[data-rounds]');
        this._createdAt = new Date();
        this.init();
    }

    init() {
        this.createPlayers();
        // add a round played
        this.addRoundToLocalStorage();
        this._elSpanRounds.innerText = this._rounds;
        //initiate first player turn to play
        this._players[0]._isNextPlayer = true;
        this._players[0].activeState();
        // listen players actions
        for (let i = 0, l = this._players.length; i < l; i++) {
            this._players[i]._elPlayerBtns.forEach(function (elPlayerBtn) {
                elPlayerBtn.addEventListener('click', handleClick.bind(this))
            }.bind(this));
        }

        function handleClick(e) {

            let isSomeoneGambling = false;
            let playerId = e.target.parentElement.parentElement.parentElement.dataset.id;
            let nextPlayerId;
            if (playerId >= this._players.length - 1) nextPlayerId = 0;
            else nextPlayerId = Number(playerId) + 1;
            let score = e.target.parentElement.parentElement.firstElementChild.firstElementChild;

            //if player still playing
            if (this._players[playerId].getIsPlaying() && !this._players[playerId].getIsGameOver()) {
                // if it's his turn to play
                if (this._players[playerId]._isNextPlayer) {
                    if (e.target.dataset.id == 'btnPlay') {
                        this._players[playerId].play();
                        score.innerText = this._players[playerId].getScore();
                    } else {
                        this._players[playerId].stop();
                    }
                    // look for the next player
                    for (let i = nextPlayerId, l = this._players.length; i < l; i++) {
                        if (this._players[i].getIsPlaying() && !this._players[i].getIsGameOver()){
                            this._players[playerId].nextPlayer(this._players[i]);
                            isSomeoneGambling = true;
                            i = l;
                        } 
                    }
                    // if no other players still playing, check for the actual player
                    if (!isSomeoneGambling) {
                        if (this._players[playerId].getIsPlaying() && !this._players[playerId].getIsGameOver()) {
                            isSomeoneGambling = true;
                        }
                    }
                    // if no one is playing anymore, check the result
                    if (!isSomeoneGambling) {
                        this._players[playerId].passiveState();
                        let potentialWinners = [];
                        // check for potential winners
                        for (let i = 0, l = this._players.length; i < l; i++) {
                            if (!this._players[i].getIsGameOver()) {
                                potentialWinners.push(this._players[i]);
                            }
                        }
                        // announce winners (or no winner)
                        let winners = [];
                        if (potentialWinners.length > 0) {
                            winners = this.checkResults(potentialWinners);
                        }
                        this.announceResults(winners);
                    }  
                }
            //if player waiting for results, move to next player
            } else {
                this._players[playerId].nextPlayer(this._players[nextPlayerId]);
            }
        }  
    }

    addRoundToLocalStorage() {
        /* this._totalRounds = localStorage.getItem('totalRounds') ? JSON.parse(localStorage.getItem('totalRounds')) : 0;
        this._totalRounds++;
        localStorage.setItem('totalRounds',JSON.stringify( this._totalRounds)); */
        this._totalRounds = localStorage.getItem('totalRounds') ? localStorage.getItem('totalRounds') : 0;
        this._totalRounds++;
        localStorage.setItem('totalRounds',this._totalRounds);
    }

    clearDomRound() {
        this._elResultWindow.style.display = 'none';
        // clear content in containers
        this._elParent.innerHTML = '';
        this._elResultPortraitContainer.innerHTML = '';
        this._elResultContainer.innerHTML = '';
    }

    announceResults(winners) {
        this._elResultWindow.style.display = 'block';
        // print winner(s)    
        let winnerPortraitDomString = '';
        let winnerDomString = '';
        if (winners.length > 0) {
            for (let i = 0, l = winners.length; i < l; i++) {
                let numPlayer = Number(winners[i].getId()) + 1;
                winnerPortraitDomString += `<div class="player-image"><img src="assets/image/players/portrait-black-white/player${numPlayer}.png"></div>`
                winnerDomString += `<div> Congrats <strong>Player ${numPlayer}</strong>, you won!</div>`;
            } 
        } else {
            winnerDomString = `<div> No winner today!</div>`;
        }  
        this._elResultPortraitContainer.insertAdjacentHTML('beforeend', winnerPortraitDomString); 
        this._elResultContainer.insertAdjacentHTML('beforeend', winnerDomString); 
        // update printing of total of rounds
        this._elSpanRounds.innerText = this._totalRounds;
    }

    checkResults(players) {
        let winners = [players[0]];
        for (let i = 1, l = players.length; i < l; i++) {
            for (let j = 0, l = winners.length; j < l; j++) {
                if (players[i].getScore() > winners[j].getScore()) {
                    winners = [players[i]];
                    console.log('sup');
                } else if (players[i].getScore() == winners[j].getScore()) {
                    winners.push(players[i]);
                }
            }
        }
        return winners;
    }

    createPlayers() {
        //insert html players into the DOM
        for (let i = 0, l = this._numPlayers; i < l; i++) {
            this.injectPlayerDom(i);
        }
        // create players
        const elPlayers = document.querySelectorAll('.player');
        for (let i = 0, l = elPlayers.length; i < l; i++) {
            this._players[i] = new Player(elPlayers[i], i);
        }
    }

    injectPlayerDom(id) {
        let playerDomString = `
                                <div class="player" data-id="${id}">
                                <div class="player-image player-image-card"><img src="assets/image/players/portrait-black-white/player${id + 1}.png"></div>
                                    <h3>Player ${id + 1}</h3>
                                    <div class="cards-space">

                                    </div>
                                    <div class="actions-wrapper">
                                        <div class="rounds">Total: <span>0</span></div>
                                        <div class="buttons-wrapper">
                                            <button data-id="btnPlay" id="btnPlay">Play</button>
                                            <button data-id="btnStop" id="btnStop">Stop</button>
                                        </div>
                                    </div>
                                </div>
                                `;
        this._elParent.insertAdjacentHTML('beforeend', playerDomString);  
    }
    

}

