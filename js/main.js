// define constants
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks

const masterDeck = buildMasterDeck();
let tempDeck = [...masterDeck];

// Define state variables

let playerHand;
let dealerHand;
let winner;
let playerTotal;
let dealerTotal;
let shuffledDeck;
let money = 1000



// Cached elements
playerHandEl = document.querySelector('#playerhand');
playerTotalEl = document.querySelector('#playertotal');
dealerHandEl = document.querySelector('#dealerhand');
dealerTotalEl = document.querySelector('#dealertotal');
winLoseEl = document.querySelector('#winlose');
dealerStaysEl = document.querySelector('#dealerstays');
moneyBlinkerEl = document.querySelector('#moneyblinker');
moneyTotalEl = document.querySelector('#moneytotal');

// Cached button elements with event listeners
const hitMeBtn = document.querySelector('#hitme').addEventListener("click", hitMe);
const stayBtn = document.querySelector('#stay').addEventListener("click", stay);
const playAgainBtn = document.querySelector('#playagain').addEventListener("click", playAgain);

//Initialize page upon loading
init();

function init() {

    //Initialize masteDeck
    buildMasterDeck();
    //Shuffle deck - reassign tempDeck to shuffled deck
    tempDeck = getNewShuffledDeck();
    //Ensure all ace value back to 11 if they were changed to 1 in previous hand
    tempDeck.forEach(function(card){
        if (card.value === 1){
            card.value = 11;
        }
    });
    //Enables 'hit me' and 'stay' buttons. Disable 'play again' button
    startBtns();
    
    //Set initial values for hands and winner
    playerHand = [];
    dealerHand = [];
    winner = null;

    //Add first two cards of tempDeck to playerHand
    playerHand.push(tempDeck[0], tempDeck[1]);
    console.log(playerHand);

    //Add next two cards of tempDeck to dealerHand
    dealerHand.push(tempDeck[2], tempDeck[3]);
    console.log(dealerHand);

    //Calculate playerTotal
    playerTotal =  playerHandCalculator();
    // In case two aces are dealt to player, effectively reduce one ace value to 1
    if (playerTotal === 22){
        playerTotal = 12
    };

    //Calculate dealerTotal
    dealerTotal = dealerHandCalculator();
    // In case two aces are dealt to dealer, effectively reduce one ace value to 1
    if (dealerTotal === 22){
        dealerTotal = 12
    };

    //In case either or both hands contain blackjack, end the game
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

// Renders cards on page 
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
  
//------------------end of card deck functions

// -------- helper functions to facilitate game -----

// Function that calculates cards on the board- will be used as an index to deal cards
function getCardsOnBoard() {
    return playerHand.length + dealerHand.length
};

// Function that loops over player hand array and calculates total based on value in card object

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
    
// Function that disables 'hit me' and 'stay' buttons, enables 'play again' button
function endBtns(){ 
    document.getElementById('hitme').disabled = true;
    document.getElementById('stay').disabled = true;
    document.getElementById('playagain').removeAttribute('disabled'); 
};
//Function that enables 'hit me' and 'stay' buttons, enables 'play again' button
function startBtns(){
    document.getElementById('hitme').removeAttribute('disabled');
    document.getElementById('stay').removeAttribute('disabled'); 
    document.getElementById('playagain').disabled = true
};
//function that adds $100 to toal moneyEl upon player win, blinks '+100"
function moneyAdd(){
    money = money + 100;
    moneyTotalEl.textContent = "Chips: $"+money;
    moneyBlinkerEl.textContent = "+$100";
    moneyBlinkerEl.style.color = "rgb(166, 255, 158)"
};
//function that subtracts $100 upon computer win, blinks '-100'
function moneySubtract(){
    money = money -100;
    moneyTotalEl.textContent = "Chips: $"+money;
    moneyBlinkerEl.textContent = "-$100";
    moneyBlinkerEl.style.color = "rgb(119, 13, 13)";
};


//------- Button functions ----------
//Function that calls dealer turn upon pressing 'stay', updates winner if applicable
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

//Function that adds card to player's hand, updates winner if applicable
function hitMe() {
    console.log('hit me button test')
    //add card to player hand
    playerHand.push(tempDeck[getCardsOnBoard()]);
    //bug 
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
            if (playerTotal <= 21) return;
        });
    
    };
    
    if (playerTotal > 21){
        winner = 'computer- player busts'
    };
    render();
    };


//Function that re-starts game by calling init()
function playAgain() {
    init();
    };

//Function that adds cards to dealer hand if applicable, updates winner if applicable
function dealerTurn () {
    console.log('dealer turn');
    //while dealer total <17 add card to dealerHand
    while (dealerTotal < 17) {
        dealerHand.push(tempDeck[getCardsOnBoard()]);
        dealerTotal = dealerHandCalculator();
    };
    //calculate dealerTotal
    dealerTotal = dealerHandCalculator();
    //If aces are present, their value will be reduced until dealerTotal < 21
    while (dealerTotal > 21 && dealerHand.some(card => card.value === 11)){
    
        dealerHand.forEach(function(card){
            if (card.value === 11){
                card.value = 1;
                dealerTotal = dealerHandCalculator();
                console.log(dealerTotal, card.value);
            }
            if (playerTotal <= 21) return;
        });
        console.log(dealerTotal);
    //IF dealerTotal > 21 update winner to 'player' after reducing ace values 

    };
    if (dealerTotal > 21) {
        winner = 'player- dealer busts'
    };
    render ();
};

// Render function updates the view
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
        let message = "Both Have " + playerTotal 
        winLoseEl.textContent = message;
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

