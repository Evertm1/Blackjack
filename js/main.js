// script testing
console.log('js is connected');

let clickTest = () => {
    console.log('a button has been pressed')
};


// define constants
//deck
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];


// define variables

let playerHand = [];
let dealerHand = [];
let winner = null;
let playerTotal = 0;
let dealerTotal = 0;

// cached elements
playerHandEl = document.querySelector('#playerhand');
playerTotalEl = document.querySelector('#playertotal');
dealerHandEl = document.querySelector('#dealerhand');
dealerTotalEl = document.querySelector('#dealertotal');
winLoseEl = document.querySelector('#winlose');
dealerStaysEl = document.querySelector('#dealerstays');

// cached button elements
const hitMeBtn = document.querySelector('#hitme').addEventListener("click", clickTest);
const stayBtn = document.querySelector('#stay').addEventListener("click", clickTest);
const playAgainBtn = document.querySelector('#playagain').addEventListener("click", clickTest);;

//functions
// initialize page upon loading
init();

function init() {
    //initialize master deck
    //shuffle deck
    //add two cards to playerHand
    //add two cards to dealerHand
    //calculate playerTotal
    //calculate dealerTotal
    //deactivate playAgainBtn
}





