/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
// console.log(ctx);
CANVAS_WIDTH = canvas.width = 1440;
CANVAS_HEIGHT = canvas.height = 800;
const numberOfEnemies = 50;
const enemiesArray = [];

let gameFrame = 0;

// enemy1 = {
//     x: 0,
//     y: 0,
//     width: 200,
//     height: 200,
// }

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "./enemies/enemy2.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = Math.random() * 2;
    this.angleSpeed = Math.random() * 2;
  }
  update() {
    // this.x -= this.speed;
    // this.y -= Math.sin(this.angle);
    // this.angle += 0.05;

    if (this.x + this.width < 0) this.x = canvas.width;
    // animate characters
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.drawImage(
    //   this.image, // image to draw
    //   this.frame * this.spriteWidth, // area to crop out on the image
    //   0, // area to crop out on the image
    //   this.spriteWidth, // area to crop out on the image
    //   this.spriteHeight, // area to crop out on the image
    //   this.x, // where on the canvas to place cropped out image
    //   this.y, // where on the canvas to place cropped out image
    //   this.width, // where on the canvas to place cropped out image
    //   this.height // where on the canvas to place cropped out image
    // );
  }
}

// const enemy1 = new Enemy();

for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy());
}

// console.log(enemiesArray);

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //   enemy1.update();
  //   enemy1.draw();
  enemiesArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
