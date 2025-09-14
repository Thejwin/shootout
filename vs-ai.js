let userInput = 'shoot'; 
let playable = false;
let bottomPos = -200;
let leftPos = 50;
let playerScore = 0;
let opponentScore = 0;
let currentRound = 0;
let totalRound = 5
let gameStarted = false;

let invertedKeeper = false;

const btn_left = document.getElementById("btn-left");
const btn_middle = document.getElementById("btn-middle");
const btn_right = document.getElementById("btn-right");
const infoText = document.getElementById("info-texts");
const infoTextH2 = document.getElementById("infoTextH2");
const scorePlayer = document.getElementById("player-score");
const scoreOpponent = document.getElementById("opponent-score");
const playerAttempts = document.querySelectorAll(".score-box-player");
const opponentAttempts = document.querySelectorAll(".score-box-opponent");

infoTextH2.addEventListener('click',() => initGame());
btn_left.addEventListener('click',() => shootOrSave("left"));
btn_middle.addEventListener('click',() => shootOrSave("middle"));
btn_right.addEventListener('click',() => shootOrSave("right"));

const keeper = document.getElementById("keeper");
const ball = document.getElementById("ball");

function chooseRandom() {
  let options = ['left', 'middle', 'right'];
  return options[Math.floor(Math.random() * 3)];
}

function shoot(direction) {
  bottomPos += 140;  // move up
  if (direction === 'left') {
    leftPos -= 35; // move left
  } 
  else if (direction === 'right') {
    leftPos += 40; // move right
  }

  ball.style.bottom = bottomPos + "px";
  ball.style.left = leftPos + "%";
  ball.style.transform = "translateX(-50%) scale(0.2)";
}


function save(direction) {
  
  if (direction === 'middle') {
    keeper.src = "./img/characters/gk3.png";
  }
  else if (direction === 'right' ){
    keeper.src = "./img/characters/gk2.png";
    keeper.style.left = "40%";
    keeper.style.transform = "scale(0.8)";
    keeper.style.bottom = "-30px";
  }
  else {
    keeper.src = "./img/characters/gk2.png";
    keeper.style.left = "-20%";
    keeper.style.transform = "scale(0.8) scaleX(-1)";
    invertedKeeper = true;
    keeper.style.bottom = "-30px";
  }
}

function resetSprites(){
  // reset keeper 
  keeper.src = "./img/characters/gk0.png";
  keeper.style.left = "50%";
  keeper.style.transform = "translateX(-50%) scale(1)";
  if (invertedKeeper) {
    keeper.style.transform = "translateX(-50%) scale(1) scaleX(-1)";
    invertedKeeper = false;
  }
  keeper.style.bottom = "-10px";

  // reset ball
  ball.style.bottom = "-200px";
  ball.style.left = "50%";
  ball.style.transform = "translateX(-40%) scale(0.8)"
  bottomPos = -200;
  leftPos = 50;
}

function updateScores() {
  scoreOpponent.textContent = opponentScore;
  scorePlayer.textContent = playerScore;
}

function shootOrSave(direction) {
  if (playable){
    if (userInput === 'shoot') {
      infoTextH2.innerText = "SHOOT!";
      let opponentChoice = chooseRandom();
      shoot(direction);
      save(opponentChoice);
      playable = false;
      if (direction === opponentChoice) {
        infoTextH2.innerText = "It's a save";
        playerAttempts.forEach((box) => {
          if (box.id === String(currentRound)) {
            box.style.backgroundColor= "rgba(255, 0, 0, 1)";
          }
        });
      }
      else {
        infoTextH2.innerText = "It's a goal";
        playerScore++;
        playerAttempts.forEach((box) => {
          if (box.id === String(currentRound)) {
            box.style.backgroundColor= "rgb(127, 255, 0)";
          }
        });
      }
      userInput = 'save';
    }

    else{ 
      infoTextH2.innerText = "SAVE!";
      let opponentChoice = chooseRandom();
      save(direction);
      shoot(opponentChoice);
      playable = false;
      if (direction === opponentChoice) {
        infoTextH2.innerText = "It's a save";
        opponentAttempts.forEach((box) => {
          if (box.id === String(currentRound)) {
            box.style.backgroundColor= "rgba(255, 0, 0, 1)";
          }
        });
      }
      else {
        infoTextH2.innerText = "It's a goal";
        opponentScore++;
        opponentAttempts.forEach((box) => {
          if (box.id === String(currentRound)) {
            box.style.backgroundColor= "rgb(127, 255, 0)";
          }
        });
      }
      userInput = 'shoot';
      currentRound++;
      if (currentRound === 5) {
        updateScores();
        endGame();
        return;
      }
    }


    setTimeout(() => {
      resetSprites();
      updateScores();
      setTimeout(() => {
        playable = true;
      }, 1000);
      infoTextH2.innerText = `${userInput}!`.toUpperCase();
    }, 1000);
  }
}

function resetAttempts() {
  opponentAttempts.forEach((box) => {
  box.style.backgroundColor= "aliceblue";
  });
  playerAttempts.forEach((box) => {
  box.style.backgroundColor= "aliceblue";
  });
}

function endGame() {
  // code to announce winner and reset things

  infoTextH2.innerText = "Restart";
  playable = false
  gameStarted = false;
}

function  initGame() {
  if (!gameStarted) {
  playerScore = 0;
  opponentScore = 0;
  currentRound = 0;
  resetAttempts();
  resetSprites();
  updateScores();
  playable = true;
  infoTextH2.innerText = "SHOOT!";
  gameStarted = true;
  }

}
