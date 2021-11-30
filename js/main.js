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

let messageEl = document.querySelector('.roundResult');

/*----- event listeners -----*/

document.querySelector('.play').addEventListener('click', play);
document.querySelector('.reset').addEventListener('click', reset);


/*----- functions -----*/

function init() {
    p1Deck = [];
    p2Deck = [];
    discardDeck = [];
    p1Points = 0;
    p2Points = 0;
    winCondition = null;
    warCondition = null;
    buildMasterDeck();
    cardDistribution();
};

function cardDistribution() {
    let newDeck = getNewShuffledDeck();
    p1Deck = newDeck.splice(0, 26);
    p2Deck = newDeck;
};

function play() {
    checkFinalScore();
    if (p1Deck.length <= 0 || p2Deck.length <= 0) return;
    let p1Card = 0;
    let p2Card = 0;
    p1Card = p1Deck.pop();
    p2Card = p2Deck.pop();
    compareCards(p1Card.value, p2Card.value);
    // put into discard pile array/deck
    // Grab the corresponding picture from the deck to show what was played
    document.getElementById('p1').className = `card ${p1Card.face}`;
    document.getElementById('p2').className = `card ${p2Card.face}`;
    discardDeck.push(p1Card, p2Card);
    console.log(discardDeck);
};

function compareCards(a, b) {
    console.log(a);
    console.log(b);
    if (a === b) {
        messageEl.innerText = "It's a tie, time for war!"
        war(a, b);
    } else if (a > b) {
        p1Points++;
        pointEls.p1.innerText = p1Points;
        messageEl.innerText = "Player 1 wins this round!";
    } else {
        p2Points++;
        pointEls.p2.innerText = p2Points;
        messageEl.innerText = "Player 2 wins this round!";
    }
};

function compareWar(a, b) {
    if (a === b) {
        messageEl.innerText = "It's a tie, time for another war!"
        war();
    } else if (a > b) {
        p1Points += 4;
        pointEls.p1.innerText = p1Points;
        messageEl.innerText = "Player 1 wins the War!";
    } else {
        p2Points += 4;
        pointEls.p2.innerText = p2Points;
        messageEl.innerText = "Player 2 wins the War!";
    }
};

function war() {
    discardP1War();
    discardP2War();
    let p1Card = 0;
    let p2Card = 0;
    p1Card = p1Deck.pop();
    p2Card = p2Deck.pop();
    compareWar(p1Card.value, p2Card.value);
    discardDeck.push(p1Card, p2Card);
};

function discardP1War() {
    for (let i = 0; i < 3; i++) {
        discardDeck.push(p1Deck[i]);
        p1Deck.splice(i, 1);
    }
};

function discardP2War() {
    for (let i = 0; i < 3; i++) {
        discardDeck.push(p2Deck[i]);
        p2Deck.splice(i, 1);
    }
};

function reset() {
    init();
    document.getElementById('p1-points').innerText = 0;
    document.getElementById('p2-points').innerText = 0;
    document.getElementById('p1').className = null;
    document.getElementById('p2').className = null;
    messageEl.innerText = "The results will be displayed here!"

};

function checkFinalScore() {
    if (discardDeck.length >= 52) {
        winMessage();
    }
};

function winMessage() {
    if (p1Points > p2Points) {
        messageEl.innerText = "Congratulations! Player 1 has triumphed and won the match!";
    } else {
        messageEl.innerText = "Congratulations! Player 2 has fought brilliantly and won the duel!";
    }
};

function buildMasterDeck() {
    const deck = [];
    // Use nested forEach to generate card objects
    suits.forEach(function (suit) {
        ranks.forEach(function (rank) {
            deck.push({
                // The 'face' property maps to the library's CSS classes for cards
                face: `${suit}${rank}`,
                // Setting the 'value' property for game of blackjack, not war
                value: Number(rank) || faceCardValue[rank]
                // Change second part to adjust face cards to a number
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

init();