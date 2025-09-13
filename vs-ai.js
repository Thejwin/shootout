/* function shoot(direction) {
  const ball = document.getElementById("ball");
  ball.className = ""; // reset
  void ball.offsetWidth; // force reflow
  ball.classList.add("shoot-" + direction);
} */

const btn_left = document.getElementById("btn-left");
const btn_middle = document.getElementById("btn-middle");
const btn_right = document.getElementById("btn-right");

btn_left.addEventListener('click',() => shoot("left"));
btn_middle.addEventListener('click',() => shoot("middle"));
btn_right.addEventListener('click',() => shoot("right"));

let bottomPos = -200;
let leftPos = 50;
function shoot(direction) {
  bottomPos += 140;  // move downward
  if (direction === 'left') {
    leftPos -= 35; // move left
  } 
  else if (direction === 'right') {
    leftPos += 40; // move right
  }
 
  const ball = document.getElementById("ball");
  ball.style.bottom = bottomPos + "px";
  ball.style.left = leftPos + "%";
  ball.style.transform = "translateX(-50%) scale(0.25)";
}

