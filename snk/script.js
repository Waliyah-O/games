const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
// const timeDisplay = document.querySelector("#timeDisplay");
//increase snake size
class snakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;
let tileCount = 22;

let tileSize = canvas.clientWidth / tileCount - 2;
let headX = 10;
let headY = 10;

// array for snake parts
const snakeParts = [];
let tailLength = 2;

//initialize the speed of snake
let xVelocity = 0;
let yVelocity = 0;

//draw apple
let appleX = 5;
let appleY = 5;

//scores
let score = 0;

//time
let startTIme = 0;
let elapsedTime = 0;
let paused = true;
let intervalId;
let hours = 0;
let minutes = 0;
let seconds = 0;

// create game loop-to continuously update screen
function drawGame() {
  changeSnakePosition();
  // game over logic
  let result = isGameOver();
  if (result) {
    // if result is true
    return;
  }
  clearScreen();
  drawSnake();
  drawApple();

  checkCollision();
  drawScore();
  drawTime();
  setTimeout(drawGame, 1000 / speed); //update screen 7 times a second
}
//Game Over function
function isGameOver() {
  let gameOver = false;
  //check whether game has started
  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }
  if (headX < 0) {
    //if snake hits left wall
    gameOver = true;
  } else if (headX === tileCount+1) {
    //if snake hits right wall
    gameOver = true;
  } else if (headY < 0) {
    //if snake hits wall at the top
    gameOver = true;
  } else if (headY === tileCount+1) {
    //if snake hits wall at the bottom
    gameOver = true;
  }

  //stop game when snake crush to its own body

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      //check whether any part of snake is occupying the same space
      gameOver = true;
      break; // to break out of for loop
    }
  }

  //display text Game Over
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px verdana";
    ctx.fillText(
      "Game Over! ",
      canvas.clientWidth / 6.5,
      canvas.clientHeight / 2
    ); //position our text in center

	// if (confirm("Game Over!" )) {
	// 	window.location = "/";
	//   } 
  }

  return gameOver; // this will stop execution of drawGame method
}

// score function
function drawScore() {
  ctx.fillStyle = "white"; // set our text color to white
  ctx.font = "20px verdena"; //set font size to 10px of font family verdena
  ctx.fillText("Score: " + score, canvas.clientWidth - 80, 20); // position our score at right hand corner
}

function drawTime() {
  ctx.fillStyle = "white"; // set our text color to white
  ctx.font = "20px verdena"; //set font size to 10px of font family verdena
  ctx.fillText(timeDisplay.textContent, canvas.clientWidth - 490, 20); // position our score at right hand corner
}

window.addEventListener("keydown", () => {
  if (paused) {
    paused = false;
    startTIme = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 75);
  }
});

function updateTime() {
  elapsedTime = Date.now() - startTIme;

  seconds = Math.floor((elapsedTime / 1000) % 60);
  minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);
  gameScore = hours * 3600 + minutes * 60 + seconds;

  seconds = pad(seconds);
  minutes = pad(minutes);
  hours = pad(hours);

  timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

  function pad(unit) {
    return ("0" + unit).length > 2 ? unit : "0" + unit;
  }
}

// clear our screen
function clearScreen() {
  ctx.fillStyle = "black"; // make screen black
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight); // black color start from 0px left, right to canvas width and canvas height
}
function drawSnake() {
  ctx.fillStyle = "green";
  //loop through our snakeParts array
  for (let i = 0; i < snakeParts.length; i++) {
    //draw snake parts
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
  //add parts to snake --through push
  snakeParts.push(new snakePart(headX, headY)); //put item at the end of list next to the head
  if (snakeParts.length > tailLength) {
    snakeParts.shift(); //remove furthest item from  snake part if we have more than our tail size
  }
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}
function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}
function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}
// check for collision and change apple position
function checkCollision() {
  if (appleX == headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++; //increase our score value
  }
}
//add event listener to our body
document.body.addEventListener("keydown", keyDown);

function keyDown() {
  //up
  if (event.keyCode == 38) {
    //prevent snake from moving in opposite direction
    if (yVelocity == 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }
  //down
  if (event.keyCode == 40) {
    if (yVelocity == -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }

  //left
  if (event.keyCode == 37) {
    if (xVelocity == 1) return;
    yVelocity = 0;
    xVelocity = -1;
  }
  //right
  if (event.keyCode == 39) {
    if (xVelocity == -1) return;
    yVelocity = 0;
    xVelocity = 1;
  }
}

drawGame();
