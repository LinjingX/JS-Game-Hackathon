/* CANVAS CONSTANTS */
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d"); /* "c" is the context */

const CANVAS_WIDTH = 1024 * 2;
const CANVAS_HEIGHT = 576 * 2;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

/* SPRITE CONSTANTS */
const SPRITE_WIDTH = 50 * 2;
const SPRITE_HEIGHT = 150 * 2;

/* OTHER CONSTANTS */
const GRAVITY_RATE = 0.2;
const GROUND_OFFSET = 100;
const DAMAGE = 2.5;
const DISPLAY_TIE = "DRAW";
const DISPLAY_P1WIN = "SAMURAI MACK Wins!";
const DISPLAY_P2WIN = "KENJI Wins!";
const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
};

/* ****************************** INITIALISE ****************************** */

c.fillRect(0, 0, canvas.width, canvas.height);

// Create background sprite
const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./assets/background.png",
});

// Create shop sprites
const shop = new Sprite({
  position: { x: 1200, y: 256 },
  imageSrc: "./assets/shop.png",
  scale: 5.5,
  framesMax: 6,
});

const shop2 = new Sprite({
  position: { x: 100, y: 256 },
  imageSrc: "./assets/shop.png",
  scale: 5.5,
  framesMax: 6,
});

// Create mid air platform
var platformlist = [];

const midairplatform1 = new MidairPlatform({
  position: { x: 150, y: 500 },
  width: 550,
  height: 25,
  imageSrc: "./assets/transparent.png",
});
platformlist.push(midairplatform1);

const midairplatform2 = new MidairPlatform({
  position: { x: 325, y: 720 },
  width: 200,
  height: 25,
  imageSrc: "./assets/transparent.png",
});
platformlist.push(midairplatform2);

const midairplatform3 = new MidairPlatform({
  position: { x: 1250, y: 500 },
  width: 550,
  height: 25,
  imageSrc: "./assets/transparent.png",
});
platformlist.push(midairplatform3);

const midairplatform4 = new MidairPlatform({
  position: { x: 1425, y: 720 },
  width: 200,
  height: 25,
  imageSrc: "./assets/transparent.png",
});
platformlist.push(midairplatform4);

// Create player 1

const controller1 = new Controller();
const fighter1 = new Fighter({
  position: new Vec2d(550, 200),
  velocity: new Vec2d(0, 0),
  offset: new Vec2d(345, 280),
  scale: 4,
  framesMax: 8,
});
console.log(fighter1);
const player1 = new Player({
  fighter: new SamuraiMack(fighter1),
  health: 100,
  damage: 7.5,
});

// Render players
fighter1.draw();
console.log(player1);

// Animate (render) game
animate();

// Decrement timer
decreaseTimer();

// Animate (render) game
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  shop2.update();
  for (let i = 0; i < platformlist.length; i++) {
    platformlist[i].update();
  }

  // player1.update(platformlist, GROUND_OFFSET);
  fighter1.update(platformlist, GROUND_OFFSET);
}

// Event listener for when key is being pressed
window.addEventListener("keydown", (event) => {
  if (!player1.dead) {
    switch (event.key) {
      case "d":
        keys.d.pressed = true;
        player1.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player1.lastKey = "a";
        break;
      case "w":
        if (player1.position.y > player1.height / 2 && player1.canjump) {
          player1.velocity.y = -10;
          player1.canjump = false;
          player1.candoublejump = true;
        } else if (player1.position.y > player1.height / 2 && player1.candoublejump) {
          player1.velocity.y = -10;
          player1.candoublejump = false;
        }
        break;
      case " ":
        player1.attack();
        break;
    }
  }
  console.log(event.key);
});

// Event listener for when key is no longer being pressed
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }

  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
  console.log(event.key);
});
