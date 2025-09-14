let userInput = 'save'; 

let playable = false;
let bottomPos = -200;
let leftPos = 50;

let invertedKeeper = false;

const btn_left = document.getElementById("btn-left");
const btn_middle = document.getElementById("btn-middle");
const btn_right = document.getElementById("btn-right");
const infoText = document.getElementById("info-texts");
const infoTextH2 = document.getElementById("infoTextH2");

infoTextH2.addEventListener('click',() => initGame());
btn_left.addEventListener('click',() => shootOrSave("left"));
btn_middle.addEventListener('click',() => shootOrSave("middle"));
btn_right.addEventListener('click',() => shootOrSave("right"));

const keeper = document.getElementById("keeper");
const ball = document.getElementById("ball");

function  initGame() {
  playable = true;
  infoTextH2.innerText = "Shoot";
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

function shootOrSave(direction) {
  if (playable){
    if (userInput === 'shoot') {
      shoot(direction);
      //playable = false;
    }
    else{ 
      save(direction);
      shoot(direction);
      playable = false;
      infoTextH2.innerText = "It's a save :(";
    }

    setTimeout(() => {
      resetSprites();
      infoTextH2.innerText = "Shoot";
      setTimeout(() => {
        playable = true;
      }, 1000);
    }, 1000);
  }
}