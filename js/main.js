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

let playerHand;
let dealerHand;
let winner;
let playerTotal;
let dealerTotal;
let shuffledDeck;
let money = 1000



// cached elements
playerHandEl = document.querySelector('#playerhand');
playerTotalEl = document.querySelector('#playertotal');
dealerHandEl = document.querySelector('#dealerhand');
dealerTotalEl = document.querySelector('#dealertotal');
winLoseEl = document.querySelector('#winlose');
dealerStaysEl = document.querySelector('#dealerstays');
moneyBlinkerEl = document.querySelector('#moneyblinker');
moneyTotalEl = document.querySelector('#moneytotal');

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
    tempDeck = getNewShuffledDeck();
    console.log(tempDeck);
    //enables buttons
    startBtns();
    //add first two cards of tempDeck to playerHand
    playerHand = [];
    dealerHand = [];
    winner = null;
    playerHand.push(tempDeck[0], tempDeck[1]);
    console.log(playerHand);

    //add next two cards of tempDeck to dealerHand
    dealerHand.push(tempDeck[2], tempDeck[3]);
    console.log(dealerHand);
    //calculate playerTotal
    playerTotal =  playerHandCalculator();
    console.log(playerTotal);
    //calculate dealerTotal
    dealerTotal = dealerHandCalculator();
    //deactivate playAgainBtn
    //render starting hands and totals
    if (playerTotal === 21 && dealerTotal != 21){
        winner = 'player(blackjack)';
    } else if (playerTotal != 21 && dealerTotal === 21){
        winner = 'computer';
    } else if (playerTotal === 21 && dealerTotal === 21){
        winner = 'tie';
    };
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
/*  don't think I need code below....
function renderNewShuffledDeck() {
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    shuffledDeck = getNewShuffledDeck();
    renderDeckInContainer(shuffledDeck, shuffledContainer);
  }
 */  
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
  
 // renderNewShuffledDeck();
//------------------end of copied functions 

//*/
// function that calculates cards on the board- will be used as an index
function getCardsOnBoard() {
    return playerHand.length + dealerHand.length
};

// Function that loops over player hand array and calculates total based on value in object

function playerHandCalculator() {
    total = 0;
    for (i = 0; i < playerHand.length; i++) {
        total += playerHand[i].value;
    }
    return total;
};

// Function that loops over dealer hand array and calculates total based on value in object

function dealerHandCalculator() {
    total = 0;
    for (i = 0; i < dealerHand.length; i++) {
        total += dealerHand[i].value;
    }
    return total;
};

// helper function that checks arrays for aces
//const aceCheck = card => card.value === 11;
//^playerHand.some(aceCheck) will = true if an ace is present in player hand
  

// helperfunction that begins reducing ace values to 1 until hand total is less than 21





    
// Function that disables buttons
function endBtns(){ 
    document.getElementById('hitme').disabled = true;
    document.getElementById('stay').disabled = true;
    document.getElementById('playagain').removeAttribute('disabled'); 
};
//Function that enables buttons (upon initialization)
function startBtns(){
    document.getElementById('hitme').removeAttribute('disabled');
    document.getElementById('stay').removeAttribute('disabled'); 
    document.getElementById('playagain').disabled = true
};
//function that adds $100 to toal moneyEl upon winning a hand
function moneyAdd(){
    money = money + 100;
    moneyTotalEl.textContent = "Chips: $"+money;
    moneyBlinkerEl.textContent = "+$100";
    moneyBlinkerEl.style.color = "rgb(166, 255, 158)"
};
//function that subtracts $100 upon losing a hand
function moneySubtract(){
    money = money -100;
    moneyTotalEl.textContent = "Chips: $"+money;
    moneyBlinkerEl.textContent = "-$100";
    moneyBlinkerEl.style.color = "rgb(119, 13, 13)";
};


//define button functions
function stay() {
    console.log('stay button test')
    // call dealerTurn()
    dealerTurn();
    // calculate playerTotal
    playerTotal = playerHandCalculator();
    // if winner= null and playerTotal > dealerTotal, update winner to 'player
    if (winner === null && playerTotal > dealerTotal) {
        winner = 'player'
    } else if (winner === null && playerTotal === dealerTotal) {
        winner = 'tie'
    } else if (winner === null && playerTotal < dealerTotal) {
        winner = 'computer'
    }
    // call render()
    render();
};

function hitMe() {
    console.log('hit me button test')
    //add card to player hand
    playerHand.push(tempDeck[getCardsOnBoard()]);
    //calculate playerTotal
    playerTotal = playerHandCalculator();
    //IF player total > 21 and no aces are present, update winner variable to 'computer'
    while (playerTotal > 21 && playerHand.some(card => card.value === 11)){
        //console.log('reducing aces')
        playerHand.forEach(function(card){
            if (card.value === 11){
                card.value = 1;
                playerTotal = playerHandCalculator();
                console.log(playerTotal, card.value);
            }
 //           if (playerTotal <= 21) return;
        })
        console.log(playerTotal);
//        if (playerTotal > 21){
        //     return
        // }
    };
    
    if (playerTotal > 21){
        winner = 'computer- player busts'
    };
    //ELSE if playerTotal > and at least one ace is present, begin reducing ace value to 1 until playerTotal < 21
    //if winner value is null, call dealerTurn()
    //UPDATE: dealer turn should not activate until player stays- line below can be removed
    //if (winner === null) {
    //    dealerTurn();
    //}

    //check if dealer busts- update winner variable to 'player'
    // call render()
    render();
};

function playAgain() {
    console.log('play again button test');
    init();
};

function dealerTurn () {
    console.log('dealer turn');
    //while dealer total <17 add card to dealerHand
    while (dealerTotal < 17) {
        dealerHand.push(tempDeck[getCardsOnBoard()]);
        dealerTotal = dealerHandCalculator();
    };
    //calculate dealerTotal
    dealerTotal = dealerHandCalculator();

    while (dealerTotal > 21 && dealerHand.some(card => card.value === 11)){
    
        dealerHand.forEach(function(card){
            if (card.value === 11){
                card.value = 1;
                dealerTotal = dealerHandCalculator();
                console.log(dealerTotal, card.value);
            }
 
        });
        console.log(dealerTotal);
    //IF dealerTotal > 21 update winner to 'player' after reducing ace values 

    };
    if (dealerTotal > 21) {
        winner = 'player- dealer busts'
    };
    //ELSE IF dealer total >21 AND at least one ace is present, begin reducing ace values to 1 until toal is <21, then stop reducing ace values
        // IF all aces values are reduced to 1, AND  dealer total > 21, update winner to 'player'
    render ();
};

function render () {
    // update view with current values for: playerHand, dealerHand, playerTotal, dealerTotal
    playerTotalEl.textContent = "Player Hand: " + playerTotal;
    dealerTotalEl.textContent = "Dealer Hand: " + dealerTotal;
    moneyTotalEl.textContent = "Chips: $"+money;
    moneyBlinkerEl.textContent = ""
    renderDeckInContainer(playerHand, playerHandEl);
    renderDeckInContainer(dealerHand, dealerHandEl);
    // if winner != null, update view with end of game message, activate playAgainBtn, deactivate hitMeBtn and stayBtn
    if (winner === 'player') {
        winLoseEl.textContent = "You Win!";
        endBtns();
        moneyAdd();
 
    } else if (winner === 'computer') {
        winLoseEl.textContent = "Dealer Wins!";
        endBtns();
        moneySubtract();

    } else if (winner === 'tie') {
        winLoseEl.textContent = "It's a Draw";
        endBtns();
    } else if (winner === 'player(blackjack)') {
        winLoseEl.textContent = "Blackjack!";
        endBtns();
        moneyAdd();
    } else if (winner === 'player- dealer busts'){
        winLoseEl.textContent = "Dealer Busts";
        endBtns();
        moneyAdd()
    } else if (winner === 'computer- player busts'){
        winLoseEl.textContent = "You're Busted!";
        endBtns();
        moneySubtract();
    } else {
        winLoseEl.textContent = " "
    };
};

