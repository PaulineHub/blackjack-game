import Board from './Board.js';

const elNumberPlayersWindow = document.getElementById('dialog-window');
const elBtnPlay = document.getElementById('playButton');
const elPlayersNumberInput = document.getElementById('playersNumber');
const elErrorMessageSpan = document.getElementById('errorMessageSpan');
const elBtnReplay = document.getElementById('btnReplay');
const errorMessage = "Please enter a number between 1 and 6.";
let round;


//start a round
elBtnPlay.addEventListener('click', function(e) {
    e.preventDefault();
    let playersNumber = Number(elPlayersNumberInput.value);
    if (playersNumber !== NaN && playersNumber > 0 && playersNumber < 7) {
        elNumberPlayersWindow.classList.add('invisible');
        round = new Board(playersNumber);
    } else {
        elErrorMessageSpan.innerText = errorMessage;
    }
})

 //listen if replay
elBtnReplay.addEventListener('click', function(){
    round.clearDomRound();
    elNumberPlayersWindow.classList.remove('invisible');
}.bind(this));


