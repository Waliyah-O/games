// Get the canvas element
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

// Create the paddles
const paddleWidth = 10;
const paddleHeight = 100;

const player = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "white",
    dy: 8 // Paddle's vertical speed
};

const computer = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "white",
    dy: 4 // Paddle's vertical speed
};

// Create the ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 4,
    dx: 4, // Ball's horizontal speed
    dy: 4  // Ball's vertical speed
};

// Draw the paddles
function drawPaddle(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

// Draw the ball
function drawBall(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

// Update canvas drawing
function update() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the paddles
    drawPaddle(player.x, player.y, player.width, player.height, player.color);
    drawPaddle(computer.x, computer.y, computer.width, computer.height, computer.color);

    // Draw the ball
    drawBall(ball.x, ball.y, ball.radius, ball.color);

    // Move the paddles
    player.y += player.dy;
    computer.y += computer.dy;

    // Move the ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Detect collision with paddles
    if (
        ball.y + ball.radius > player.y &&
        ball.y - ball.radius < player.y + player.height &&
        ball.dx < 0
    ) {
        ball.dx *= -1;
    } else if (
        ball.y + ball.radius > computer.y &&
        ball.y - ball.radius < computer.y + computer.height &&
        ball.dx > 0
    ) {
        ball.dx *= -1;
    }

    // Detect collision with top and bottom walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Update scores and reset the ball position if a player misses
    if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        resetBall();
    } else if (ball.x - ball.radius < 0) {
        computerScore++;
        resetBall();
    }

    // Move the computer's paddle automatically
    if (computer.y + computer.height / 2 < ball.y) {
        computer.y += computer.dy;
    } else if (computer.y + computer.height / 2 > ball.y) {
        computer.y -= computer.dy;
    }
}

// Reset the ball position
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
    ball.dy = -ball.dy;
}

// Game loop
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
