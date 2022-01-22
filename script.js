function startGame(){
    homeScreen = document.getElementById("home-screen");
    homeScreen.classList.add("d-none");
    gameScreen = document.getElementById("game-screen");
    gameScreen.classList.remove("d-none");
}

function showInstructions(){
    console.log("this function will show the instructions.");
}