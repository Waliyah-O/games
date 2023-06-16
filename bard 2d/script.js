var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Create the player object
var player = {
  x: 250,
  y: 250,
  width: 50,
  height: 50,
  speed: 5
};

// Create the enemy objects
var enemies = [];
for (var i = 0; i < 10; i++) {
  enemies.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    width: 50,
    height: 50,
    speed: 5
  });
}

// Game loop
function loop() {
  // Update the player position
  player.x += player.speed;
  player.y += player.speed;

  // Check for collisions between the player and enemies
  for (var i = 0; i < enemies.length; i++) {
    if (player.x < enemies[i].x + enemies[i].width &&
      player.x + player.width > enemies[i].x &&
      player.y < enemies[i].y + enemies[i].height &&
      player.y + player.height > enemies[i].y) {
      // Game over!
      alert("You lost!");
      return;
    }
  }

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player
  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw the enemies
  for (var i = 0; i < enemies.length; i++) {
    ctx.fillStyle = "blue";
    ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
  }

  // Request a redraw of the canvas
  requestAnimationFrame(loop);
}

// Start the game loop
requestAnimationFrame(loop);
