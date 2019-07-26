const cards = document.querySelectorAll(".memory-card");

let hasFlipped = false;
let lockBoard = false;
let firstCard;
let secondCard;

function flipCard() {
  // early return if the board is locked or if you click the same card
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlipped) {
    hasFlipped = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.image === secondCard.dataset.image;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// immediately invoked function expression --> executes itself immediately after its declaration
(function shuffle() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 16);
    card.style.order = randomPosition;
  });
})();

cards.forEach(card => card.addEventListener("click", flipCard));
