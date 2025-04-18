const cells = document.querySelectorAll(".cell");
const result = document.getElementById("result");
const resetBtn = document.getElementById("reset-btn");

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]             
];

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      result.textContent = `${board[a]} wins!`;
      gameOver = true;
      return;
    }
  }

  if (!board.includes(null)) {
    result.textContent = "It's a tie!";
    gameOver = true;
  }
}

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");

    if (board[index] || gameOver) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();

    if (!gameOver) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
});

resetBtn.addEventListener("click", () => {
  board = Array(9).fill(null);
  gameOver = false;
  currentPlayer = "X";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
  result.textContent = "";
});
