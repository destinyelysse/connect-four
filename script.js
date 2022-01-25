let gameTokens = 0;
let currentToken = null;
let currentGutterPosition = 4;
const player1tokenColor = "red";
const player1name = "Player 1";
const player2tokenColor = "green";
const player2name = "Player 2";
let playerGoingFirst = player1name;
let currentPlayer = player1name;
let currentTokenColor = player1tokenColor;

let gameBoard = returnNewGameBoardArray();

window.addEventListener("resize", resizeTokens);

function returnNewGameBoardArray() {
  let gameBoard = Array(7);
  for (let i = 0; i < 7; i++) {
    gameBoard[i] = Array(6).fill(null);
  }
  return gameBoard;
}

function startGame() {
  hideGameTitle();
  hideHomeScreen();
  generateGameBoard();
  showGameScreen();
  setGameMessageForPlayerTurn();
  putNewTokenOnScreen();
}

function hideGameTitle() {
  const title = document.getElementById("game-title");
  title.classList.add("d-none");
}

function hideHomeScreen() {
  homeScreen = document.getElementById("home-screen");
  homeScreen.classList.add("d-none");
}

function showGameScreen() {
  gameScreen = document.getElementById("game-screen");
  gameScreen.classList.remove("d-none");
}

function generateGameBoard() {
  generateTokenGutter();
  generateTokenSpaces();
}

function setGameMessageForPlayerTurn() {
  document.getElementById(
    "game-message"
  ).textContent = `${currentPlayer}, your turn!`;
}

function generateTokenGutter() {
  const gameBoardContainer = document.getElementById(
    "connect-four-board-container"
  );
  for (let i = 1; i < 8; i++) {
    let newGutterSpace = document.createElement("div");
    newGutterSpace.id = `gutter-${i}-0`;
    newGutterSpace.classList = "board-square d-inline";
    gameBoardContainer.appendChild(newGutterSpace);
  }
}

function generateTokenSpaces() {
  let gameBoardContainer = document.getElementById(
    "connect-four-board-container"
  );
  for (let i = 1; i < 7; i++) {
    for (let j = 1; j < 8; j++) {
      let newGameSpace = document.createElement("div");
      newGameSpace.id = `space-${i}-${j}`;
      newGameSpace.classList =
        "board-square d-inline d-flex justify-content-center align-items-center";
      let newGameSpaceHole = document.createElement("div");
      newGameSpaceHole.classList = "gameSpaceHole";
      newGameSpace.appendChild(newGameSpaceHole);
      gameBoardContainer.appendChild(newGameSpace);
    }
  }
}

function disableGameButtons() {
  document.getElementById("move-left-btn").classList.add("disabled");
  document.getElementById("drop-token-btn").classList.add("disabled");
  document.getElementById("move-right-btn").classList.add("disabled");
}

function enableGameButtons() {
  document.getElementById("move-left-btn").classList.remove("disabled");
  document.getElementById("drop-token-btn").classList.remove("disabled");
  document.getElementById("move-right-btn").classList.remove("disabled");
}

function putNewTokenOnScreen() {
  gameTokens++;
  currentGutterPosition = 4;
  let newToken = makeNewToken();
  let playedTokens = document.getElementById("played-tokens-container");
  playedTokens.appendChild(newToken);
}

function makeNewToken() {
  let newToken = document.createElement("div");
  let gutterPos = document.getElementById(`gutter-${currentGutterPosition}-0`);
  let gutterRect = gutterPos.getBoundingClientRect();
  newToken.id = `token-${gameTokens}`;
  newToken.classList = `token ${getTokenColorClass()}`;
  newToken.setAttribute("data-space", gutterPos.id);
  newToken.style.top = `${gutterPos.offsetTop}px`;
  newToken.style.left = `${gutterPos.offsetLeft}px`;
  newToken.style.width = `${gutterRect.width * 0.9}px`;
  newToken.style.height = `${gutterRect.height * 0.9}px`;
  newToken.style.marginLeft = `${gutterRect.width * 0.05}px`;
  newToken.style.marginTop = `${gutterRect.height * 0.05}px`;
  currentToken = newToken;
  return newToken;
}

function moveCurrentTokenLeft() {
  if (currentGutterPosition > 1) {
    currentGutterPosition--;
    let targetGutter = document.getElementById(
      `gutter-${currentGutterPosition}-0`
    );
    currentToken.setAttribute("data-space", targetGutter.id);
    let targetGutterRect = targetGutter.getBoundingClientRect();
    currentToken.style.top = `${targetGutterRect.top}px`;
    currentToken.style.left = `${targetGutterRect.left}px`;
  }
}

function moveCurrentTokenRight() {
  if (currentGutterPosition < 7) {
    currentGutterPosition++;
    let targetGutter = document.getElementById(
      `gutter-${currentGutterPosition}-0`
    );
    currentToken.setAttribute("data-space", targetGutter.id);
    let targetGutterRect = targetGutter.getBoundingClientRect();
    currentToken.style.top = `${targetGutterRect.top}px`;
    currentToken.style.left = `${targetGutterRect.left}px`;
  }
}

function dropToken() {
  if (gameBoard[currentGutterPosition - 1][0] === null) {
    disableGameButtons();
    const rowPosition = determineRowPosition(
      gameBoard[currentGutterPosition - 1]
    );
    gameBoard[currentGutterPosition - 1][rowPosition - 1] = currentTokenColor;
    const targetSpace = document.getElementById(
      `space-${rowPosition}-${currentGutterPosition}`
    );
    const targetSpaceRect = targetSpace.getBoundingClientRect();
    currentToken.style.top = `${targetSpaceRect.top}px`;
    currentToken.style.left = `${targetSpaceRect.left}px`;
    currentToken.setAttribute("data-space", targetSpace.id);
    const gameIsWon = checkIfWin(
      currentGutterPosition - 1,
      rowPosition - 1,
      currentTokenColor
    );
    if (gameIsWon) {
      endGameWithWinner();
    } else if (gameHasSpaces()) {
      prepareNextRound();
    } else {
      gameHasNoSpacesLeft();
    }
  }
}

function determineRowPosition(arr) {
  for (let p = arr.length - 1; p >= 0; p--) {
    if (arr[p] === null) {
      return p + 1;
    }
  }
}

function prepareNextRound() {
  setTimeout(() => {
    toggleCurrentPlayer();
    setGameMessageForPlayerTurn();
    toggleColor();
    putNewTokenOnScreen();
    enableGameButtons();
  }, 1200);
}

function toggleCurrentPlayer() {
  if (currentPlayer === player1name) {
    currentPlayer = player2name;
  } else {
    currentPlayer = player1name;
  }
}

function toggleColor() {
  if (currentTokenColor === player1tokenColor) {
    currentTokenColor = player2tokenColor;
  } else {
    currentTokenColor = player1tokenColor;
  }
}

function getTokenColorClass() {
  return `token-${currentTokenColor}`;
}

function gameHasSpaces() {
  if (
    gameBoard[0][0] === null ||
    gameBoard[1][0] === null ||
    gameBoard[2][0] === null ||
    gameBoard[3][0] === null ||
    gameBoard[4][0] === null ||
    gameBoard[5][0] === null ||
    gameBoard[6][0] === null
  ) {
    return true;
  } else {
    return false;
  }
}

function checkIfWin(col, row, color) {
  // check if horizontal win
  if (
    col - 1 >= 0 &&
    gameBoard[col - 1][row] === color &&
    col + 1 < 7 &&
    gameBoard[col + 1][row] === color
  ) {
    if (
      (col - 2 >= 0 && gameBoard[col - 2][row] === color) ||
      (col + 2 < 7 && gameBoard[col + 2][row] === color)
    ) {
      return true;
    }
  } else if (
    col - 3 >= 0 &&
    gameBoard[col - 1][row] === color &&
    gameBoard[col - 2][row] === color &&
    gameBoard[col - 3][row] === color
  ) {
    return true;
  } else if (
    col + 3 < 7 &&
    gameBoard[col + 1][row] === color &&
    gameBoard[col + 2][row] === color &&
    gameBoard[col + 3][row] === color
  ) {
    return true;
  }

  // check if vertical win
  if (
    row - 1 >= 0 &&
    gameBoard[col][row - 1] === color &&
    row + 1 < 6 &&
    gameBoard[col][row + 1] === color
  ) {
    if (
      (row - 2 >= 0 && gameBoard[col][row - 2] === color) ||
      (row + 2 < 6 && gameBoard[col][row + 2] === color)
    ) {
      return true;
    }
  } else if (
    row - 3 >= 0 &&
    gameBoard[col][row - 1] === color &&
    gameBoard[col][row - 2] === color &&
    gameBoard[col][row - 3] === color
  ) {
    return true;
  } else if (
    row + 3 < 6 &&
    gameBoard[col][row + 1] === color &&
    gameBoard[col][row + 2] === color &&
    gameBoard[col][row + 3] === color
  ) {
    return true;
  }

  // check for diagonal wins
  if (
    col + 1 < 7 &&
    row + 1 < 6 &&
    gameBoard[col + 1][row + 1] === color &&
    col - 1 >= 0 &&
    row - 1 >= 0 &&
    gameBoard[col - 1][row - 1] === color
  ) {
    if (
      (col + 2 < 7 && row + 2 < 6 && gameBoard[col + 2][row + 2] === color) ||
      (col - 2 >= 0 && row - 2 >= 0 && gameBoard[col - 2][row - 2] === color)
    ) {
      return true;
    }
  } else if (
    col + 3 < 7 &&
    row + 3 < 6 &&
    gameBoard[col + 1][row + 1] === color &&
    gameBoard[col + 2][row + 2] === color &&
    gameBoard[col + 3][row + 3] === color
  ) {
    return true;
  } else if (
    col - 3 >= 0 &&
    row - 3 >= 0 &&
    gameBoard[col - 1][row - 1] === color &&
    gameBoard[col - 2][row - 2] === color &&
    gameBoard[col - 3][row - 3] === color
  ) {
    return true;
  }

  if (
    col - 1 >= 0 &&
    row + 1 < 6 &&
    gameBoard[col - 1][row - 1] === color &&
    col + 1 < 7 &&
    row - 1 <= 0 &&
    gameBoard[col + 1][row - 1] === color
  ) {
    if (
      (col - 2 >= 0 && row + 2 < 6 && gameBoard[col - 2][row + 2] === color) ||
      (col + 2 < 7 && row - 2 >= 0 && gameBoard[col + 2][row - 2] === color)
    ) {
      return true;
    }
  } else if (
    col - 3 >= 0 &&
    row + 3 < 6 &&
    gameBoard[col - 1][row + 1] === color &&
    gameBoard[col - 2][row + 2] === color &&
    gameBoard[col - 3][row + 3] === color
  ) {
    return true;
  } else if (
    col + 3 < 7 &&
    row - 3 >= 0 &&
    gameBoard[col + 1][row - 1] === color &&
    gameBoard[col + 2][row - 2] === color &&
    gameBoard[col + 3][row - 3] === color
  ) {
    return true;
  }
  return false;
}

function endGameWithWinner() {
  setGameMessageEndGame();
  displayPlayAgainButton();
}

function gameHasNoSpacesLeft() {
  setGameMessageOutOfSpaces();
  displayPlayAgainButton();
}

function setGameMessageEndGame() {
  document.getElementById(
    "game-message"
  ).textContent = `${currentPlayer} WINS!`;
}

function setGameMessageOutOfSpaces() {
  document.getElementById("game-message").textContent =
    "DRAW! No more spaces available.";
}

function displayPlayAgainButton() {
  document.getElementById("gameplay-buttons").classList.add("d-none");
  document.getElementById("play-again-button").classList.remove("d-none");
}

function displayGameButtons() {
  document.getElementById("gameplay-buttons").classList.remove("d-none");
  document.getElementById("play-again-button").classList.add("d-none");
  enableGameButtons();
}

function playAgain() {
  clearBoard();
  displayGameButtons();
  if (playerGoingFirst === player1name) {
    playerGoingFirst = player2name;
    currentPlayer = player2name;
  } else {
    playerGoingFirst = player1name;
    currentPlayer = player1name;
  }
  setGameMessageForPlayerTurn();
  putNewTokenOnScreen();
}

function clearBoard() {
  const playedTokens = document.getElementById("played-tokens-container");
  while (playedTokens.firstChild) {
    playedTokens.removeChild(playedTokens.firstChild);
  }
  gameBoard = returnNewGameBoardArray();
}

function resizeTokens() {
  const tokens = document.getElementsByClassName("token");
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const tokenSpace = token.getAttribute("data-space");
    const space = document.getElementById(`${tokenSpace}`);
    spaceRect = space.getBoundingClientRect();
    token.style.top = `${space.offsetTop}px`;
    token.style.left = `${space.offsetLeft}px`;
    token.style.width = `${spaceRect.width * 0.9}px`;
    token.style.height = `${spaceRect.height * 0.9}px`;
    token.style.marginLeft = `${spaceRect.width * 0.05}px`;
    token.style.marginTop = `${spaceRect.height * 0.05}px`;
  }
}
