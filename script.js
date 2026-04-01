// Questions & Answers
const pairs = [
    { question: "Capital of France?", answer: "Paris" },
    { question: "5 + 7?", answer: "12" },
    { question: "Water chemical formula?", answer: "H2O" },
    { question: "Fastest land animal?", answer: "Cheetah" }
];

// Convert to card objects
let cards = [];

pairs.forEach((pair, index) => {
    cards.push({ id: index, text: pair.question, type: "q" });
    cards.push({ id: index, text: pair.answer, type: "a" });
});

// Shuffle
cards = cards.sort(() => Math.random() - 0.5);

const board = document.getElementById("game-board");

// Render cards
cards.forEach((card, idx) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.setAttribute("data-id", card.id);
    div.setAttribute("data-type", card.type);
    div.setAttribute("data-index", idx);
    div.innerHTML = "?";

    div.addEventListener("click", flipCard);

    board.appendChild(div);
});

let flippedCards = [];
let preventClick = false;

function flipCard() {
    if (preventClick) return;

    const index = this.getAttribute("data-index");
    const card = cards[index];

    // Don't click already matched
    if (this.classList.contains("matched") || this.classList.contains("flipped")) return;

    this.classList.add("flipped");
    this.innerHTML = card.text;

    flippedCards.push(this);

    if (flippedCards.length === 2) {
        preventClick = true;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    const id1 = card1.getAttribute("data-id");
    const id2 = card2.getAttribute("data-id");

    const type1 = card1.getAttribute("data-type");
    const type2 = card2.getAttribute("data-type");

    if (id1 === id2 && type1 !== type2) {
        // It's a match
        card1.classList.add("matched");
        card2.classList.add("matched");
    } else {
        // Not a match → flip back
        setTimeout(() => {
            card1.classList.remove("flipped");
            card1.innerHTML = "?";
            card2.classList.remove("flipped");
            card2.innerHTML = "?";
        }, 800);
    }

    setTimeout(() => {
        flippedCards = [];
        preventClick = false;
    }, 900);
}