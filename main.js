// Game data
const cards = {
  1: [
    1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39,
    41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63,
  ],
  2: [
    2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31, 34, 35, 38, 39,
    42, 43, 46, 47, 50, 51, 54, 55, 58, 59, 62, 63,
  ],
  3: [
    4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39,
    44, 45, 46, 47, 52, 53, 54, 55, 60, 61, 62, 63,
  ],
  4: [
    8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31, 40, 41, 42,
    43, 44, 45, 46, 47, 56, 57, 58, 59, 60, 61, 62, 63,
  ],
  5: [
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63,
  ],
  6: [
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63,
  ],
};

// Game state
let currentCard = 1;
let binaryDigits = [];

// DOM elements
const welcomeScreen = document.querySelector(".welcome-screen");
const cardScreen = document.querySelector(".card-screen");
const resultScreen = document.querySelector(".result-screen");
const cardNumberElement = document.getElementById("card-number");
const currentCardElement = document.getElementById("current-card");
const numbersGrid = document.getElementById("numbers-grid");
const resultNumberElement = document.getElementById("result-number");

// Buttons
const startBtn = document.querySelector(".start-btn");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const restartBtns = document.querySelectorAll(".restart-btn");

// Initialize the game
function initGame() {
  welcomeScreen.style.display = "block";
  cardScreen.style.display = "none";
  resultScreen.style.display = "none";
  currentCard = 1;
  binaryDigits = [];
}

// Show a card
function showCard(cardNum) {
  cardNumberElement.textContent = cardNum;
  currentCardElement.textContent = cardNum;
  numbersGrid.innerHTML = "";

  cards[cardNum].forEach((number) => {
    const numberElement = document.createElement("div");
    numberElement.className = "number";
    numberElement.textContent = number;
    numbersGrid.appendChild(numberElement);
  });
}

// Calculate the result
function calculateResult() {
  // Convert binary array to decimal
  // Card 1 is 2^0, Card 2 is 2^1, ..., Card 6 is 2^5
  let result = 0;
  binaryDigits.forEach((digit, index) => {
    result += digit * Math.pow(2, index);
  });
  return result;
}

// Event listeners
startBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "none";
  cardScreen.style.display = "block";
  showCard(currentCard);
});

yesBtn.addEventListener("click", () => {
  binaryDigits.push(1);
  nextCard();
});

noBtn.addEventListener("click", () => {
  binaryDigits.push(0);
  nextCard();
});

restartBtns.forEach((btn) => {
  btn.addEventListener("click", initGame);
});

// Move to next card or show result
function nextCard() {
  currentCard++;
  if (currentCard <= 6) {
    showCard(currentCard);
  } else {
    // Show result
    cardScreen.style.display = "none";
    resultScreen.style.display = "block";
    resultNumberElement.textContent = calculateResult();
  }
}

// Initialize the game when page loads
initGame();
