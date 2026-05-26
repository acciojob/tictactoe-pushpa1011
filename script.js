//your JS code here. If required.
let player1 = "";
let player2 = "";
let currentPlayer = "X";
let gameActive = true;

const submitBtn = document.getElementById("submit");
const gameDiv = document.getElementById("game");
const formDiv = document.getElementById("player-form");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value || "Player 1";
  player2 = document.getElementById("player-2").value || "Player 2";

  formDiv.classList.add("hidden");
  gameDiv.classList.remove("hidden");

  messageDiv.textContent = `${player1}, you're up`;
});

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

function handleClick(e) {
  const cell = e.target;

  if (cell.textContent !== "" || !gameActive) return;

  cell.textContent = currentPlayer;

  if (checkWinner()) {
    const winner = currentPlayer === "X" ? player1 : player2;
    messageDiv.textContent = `${winner} congratulations you won!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  const nextPlayer = currentPlayer === "X" ? player1 : player2;
  messageDiv.textContent = `${nextPlayer}, you're up`;
}

function checkWinner() {
  const values = Array.from(cells).map(cell => cell.textContent);

  const winningPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winningPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      values[a] &&
      values[a] === values[b] &&
      values[a] === values[c]
    );
  });
}