function startGame() {
  hideHomeScreen();
  generateGameBoard();
  showGameScreen();
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

function generateTokenGutter() {
  let gameBoardContainer = document.getElementById(
    "connect-four-board-container"
  );
  for (let i = 1; i < 8; i++) {
    let newGutterSpace = document.createElement("div");
    newGutterSpace.id = `token-${i}`;
    newGutterSpace.classList = "board-square d-inline bg-success";
    gameBoardContainer.appendChild(newGutterSpace);
  }
}

function generateTokenSpaces() {
  let gameBoardContainer = document.getElementById(
    "connect-four-board-container"
  );
  for (let i = 1; i < 43; i++) {
    let newGameSpace = document.createElement("div");
    newGameSpace.id = `space-${i}`;
    newGameSpace.classList =
      "board-square d-inline d-flex justify-content-center align-items-center bg-warning";
    let newGameSpaceHole = document.createElement("div");
    newGameSpaceHole.classList = "gameSpaceHole";
    newGameSpace.append(newGameSpaceHole);
    gameBoardContainer.appendChild(newGameSpace);
  }
}

function showInstructions() {
  console.log("this function will show the instructions.");
}
