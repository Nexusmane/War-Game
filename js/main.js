/*----- constants -----*/

const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = buildMasterDeck();
const faceCardValue = {
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
};

/*----- app's state (variables) -----*/

let shuffledDeck, p1Deck, p2Deck, discardDeck = [];
let p1Points ,p2Points = 0;
let winCondition, warCondition = null;



/*----- cached element references -----*/

const shuffledContainer = document.getElementById('shuffled-deck-container');



/*----- event listeners -----*/

document.querySelector('.play').addEventListener('click', play);
document.querySelector('.reset').addEventListener('click', reset);



/*----- functions -----*/

function init() {
    shuffledDeck = [];
    p1Deck = [];
    p2Deck =[];
    discardDeck = [];
    p1Points = 0;
    p2Points = 0;
    winCondition = null;
    warCondition = null;
    render();
};

function shuffleDeck() {
};

function play() {
    console.log("Play button works");
};

function war(){
};

function reset() {
    console.log("Reset button works");
};

function render() {
};

///////////////////////////////////////////////////////////////

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
