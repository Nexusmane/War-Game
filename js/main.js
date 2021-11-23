/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const faceCardValue = {
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
};
const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/

let shuffledDeck, p1Deck, p2Deck, discardDeck;
let p1Points, p2Points;
let winCondition, warCondition;


/*----- cached element references -----*/
let pointEls = {
    p1: document.getElementById('p1-points'),
    p2: document.getElementById('p2-points'),
};


/*----- event listeners -----*/

document.querySelector('.play').addEventListener('click', play);
document.querySelector('.reset').addEventListener('click', reset);


/*----- functions -----*/

function init() {
    p1Deck = [];
    p2Deck =[];
    discardDeck = [];
    p1Points = 0;
    p2Points = 0;
    winCondition = null;
    warCondition = null;
    buildMasterDeck();
    cardDistribution();
    render();
};

init();

function cardDistribution() {
    let newDeck = getNewShuffledDeck();
    p1Deck = newDeck.splice(0, 26);
    p2Deck = newDeck;
};

function play() {
    
};

function war(){
};

function reset() {
    init();
};

function render() {
};


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
  };

///////////////////////////////////////////////////////////////
//*------- Constants --------*// 



// Build a 'master' deck of 'card' objects used to create shuffled decks
renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));

/*----- app's state (variables) -----*/
// let shuffledDeck, p1Hand, p2hand;

// function init() {
//   shuffledDeck = getNewShuffledDeck;
// //   p1Hand = shuffledDeck.pop() // Adds one card into player 1's hand
//   render();
// }

function render() {
  // render the variables (duh)
  let cardTemplate = `<div class"class ${p1Hand[0].face}"></div>`;
  someEl.innerHTML = cardTemplate
}

/*----- cached element references -----*/
const shuffledContainer = document.getElementById('shuffled-deck-container');

/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', renderNewShuffledDeck);

/*----- functions -----*/

// function renderNewShuffledDeck() {
//   // Create a copy of the masterDeck (leave masterDeck untouched!)
//   shuffledDeck = getNewShuffledDeck();
//   renderDeckInContainer(shuffledDeck, shuffledContainer);
// }

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


// renderNewShuffledDeck();