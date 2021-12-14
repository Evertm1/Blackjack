// script testing
console.log('js is connected');

// define constants
//deck (from jim_clark)
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks (from jim_clark)

const masterDeck = buildMasterDeck();
let tempDeck = [...masterDeck];
//^ will need
//
//renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));
//^ probably will not need
// define state variables

let playerHand = [];
let dealerHand = [];
let winner = null;
let playerTotal = 0;
let dealerTotal = 0;
let shuffledDeck;

// cached elements
playerHandEl = document.querySelector('#playerhand');
playerTotalEl = document.querySelector('#playertotal');
dealerHandEl = document.querySelector('#dealerhand');
dealerTotalEl = document.querySelector('#dealertotal');
winLoseEl = document.querySelector('#winlose');
dealerStaysEl = document.querySelector('#dealerstays');
//const shuffledContainer = document.getElementById('shuffled-deck-container'); // (from jim_clark)

// cached button elements
const hitMeBtn = document.querySelector('#hitme').addEventListener("click", hitMe);
const stayBtn = document.querySelector('#stay').addEventListener("click", stay);
const playAgainBtn = document.querySelector('#playagain').addEventListener("click", playAgain);


// initialize page upon loading
init();

function init() {
    //initialize master deck
    buildMasterDeck();
    //shuffle deck - reassign tempDeck(which is a clone of the master deck) to shuffled deck
    let tempDeck = getNewShuffledDeck();
    console.log(tempDeck);
    //add first two cards of tempDeck to playerHand
    playerHand.push(tempDeck[0], tempDeck[1]);
    console.log(playerHand);
    //add next two cards of tempDeck to dealerHand
    dealerHand.push(tempDeck[2], tempDeck[3]);
    console.log(dealerHand);
    //calculate playerTotal
    playerTotal =  playerHand[0].value + playerHand[1].value;
    console.log(playerTotal);
    //calculate dealerTotal
    dealerTotal = dealerHand[0].value + dealerHand[1].value;
    console.log(dealerTotal);
    //deactivate playAgainBtn
    //render starting hands and totals
    render();
}

// ---------------functions for card deck (from jim_clark)
//----- functions ----- 
///*
function getNewShuffledDeck() {
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    const tempDeck = [...masterDeck];
    const newShuffledDeck = [];
    while (tempDeck.length) {
      // Get a random index for a card still in the tempDeck
      const rndIdx = Math.floor(Math.random() * tempDeck.length);
      // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
      newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return newShuffledDeck;
  }
  
function renderNewShuffledDeck() {
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    shuffledDeck = getNewShuffledDeck();
    renderDeckInContainer(shuffledDeck, shuffledContainer);
  }
  
function renderDeckInContainer(deck, container) {
    container.innerHTML = '';
    // Let's build the cards as a string of HTML
    let cardsHtml = '';
    deck.forEach(function(card) {
      cardsHtml += `<div class="card ${card.face}"></div>`;
    });
    // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
    // const cardsHtml = deck.reduce(function(html, card) {
    //   return html + `<div class="card ${card.face}"></div>`;
    // }, '');
    container.innerHTML = cardsHtml;
  }
  
function buildMasterDeck() {
    const deck = [];
    // Use nested forEach to generate card objects
    suits.forEach(function(suit) {
      ranks.forEach(function(rank) {
        deck.push({
          // The 'face' property maps to the library's CSS classes for cards
          face: `${suit}${rank}`,
          // Setting the 'value' property for game of blackjack, not war
          value: Number(rank) || (rank === 'A' ? 11 : 10)
        });
      });
    });
    return deck;
  }
  
  renderNewShuffledDeck();
//------------------end of copied functions 

//*/
// function that calculates cards on the board- will be used as an index
function getCardsOnBoard() {
    return playerHand.length + dealerHand.length
}
//A function that adds two cards to player hand, called upon initialization
function dealPlayerHand() {

}


//define button functions
function stay() {
    console.log('stay button test')
    // call dealerTurn()
    // calculate playerTotal
    // if winner= null and playerTotal > dealerTotal, update winner to 'player
    // call render()
};

function hitMe() {
    console.log('hit me button test')
    //add card to player hand
    playerHand.push(tempDeck[getCardsOnBoard()]);
    //calculate playerTotal
    //IF player total > 21 and no aces are present, update winner variable to 'computer'
    //ELSE if playerTotal > and at least one ace is present, begin reducing ace value to 1 until playerTotal < 21
    //if winner value is null, call dealerTurn()
    //check if dealer busts- update winner variable to 'player'
    // call render()
};

function playAgain() {
    console.log('play again button test')
    // init()
};

function dealerTurn () {
    //while dealer total <17 add card to dealerHand
    //calculate dealerTotal
    //IF dealerTotal > 21 AND no aces are present in dealer hand, update winner to 'player'
    //ELSE IF dealer total >21 AND at least one ace is present, begin reducing ace values to 1 until toal is <21, then stop reducing ace values
        // IF all aces values are reduced to 1, AND  dealer total > 21, update winner to 'player'
};

function render () {
    // update view with current values for: playerHand, dealerHand, playerTotal, dealerTotal
    playerTotalEl.textContent = "Player Total: " + playerTotal;
    dealerTotalEl.textContent = "Dealer Total: " + dealerTotal;
    renderDeckInContainer(playerHand, playerHandEl);
    renderDeckInContainer(dealerHand, dealerHandEl);
    // if winner != null, update view with end of game message, activate playAgainBtn, deactivate hitMeBtn and stayBtn
};

