const board = document.querySelector(".board");
const dot = document.createElement("div");

dot.classList.add("dot");
board.appendChild(dot);

let x = 0;
let y = 0;
let velocityX = 1;
let velocityY = 0;

drawDot();

function drawDot() {
  dot.style.left = `${x * 20}px`;
  dot.style.top = `${y * 20}px`;
}

function changeDirection(event) {
  if (event.key === "ArrowLeft") {
    velocityX = -1;
    velocityY = 0;
  } else if (event.key === "ArrowUp") {
    velocityX = 0;
    velocityY = -1;
  } else if (event.key === "ArrowRight") {
    velocityX = 1;
    velocityY = 0;
  } else if (event.key === "ArrowDown") {
    velocityX = 0;
    velocityY = 1;
  }
}

document.addEventListener("keydown", changeDirection);

function frameLoop() {
  if (x >= 20 || x < 0 || y >= 10 || y < 0) {
    return;
  }

  x += velocityX;
  y += velocityY;
  drawDot();

  requestAnimationFrame(frameLoop);
}

frameLoop();

function startGame() {
  dot.remove();
  dot.classList.add("dot");
  board.appendChild(dot);
  x = Math.floor(Math.random() * 20);
  y = Math.floor(Math.random() * 10);
  drawDot();
  requestAnimationFrame(frameLoop);
}