/* CANVAS CONSTANTS */
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d') /* "c" is the context */

const CANVAS_WIDTH = 1024*2
const CANVAS_HEIGHT = 576*2
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

/* SPRITE CONSTANTS */
const SPRITE_WIDTH = 50*2
const SPRITE_HEIGHT = 150*2

/* OTHER CONSTANTS */
const GRAVITY_RATE = 0.2

/* ****************************** CLASSES ****************************** */

// Each player is represented by a Sprite class
class Sprite {
    
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = SPRITE_HEIGHT
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, SPRITE_WIDTH, this.height)
    }

    update() {
        this.draw()
        // make player fall on spawn
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            // stop player from sinking into the ground upon initial impact from spawn fall
            this.velocity.y = 0
        } else {
            // otherwise apply gravity
            this.velocity.y += GRAVITY_RATE
        }
    }
}

/* ****************************** INITIALISE ****************************** */

c.fillRect(0, 0, canvas.width, canvas.height)

// Create players
const player1 = new Sprite({position: {x: 0, y: getRandomInt(-100, 100)}, velocity: {x: 0, y: 0}})
const player2 = new Sprite({position: {x: 1000, y: getRandomInt(-100, 100)}, velocity: {x: 0, y: 0}})

// Render players
player1.draw()
console.log(player1)

player2.draw()
console.log(player2)

// Animate (render) game
animate()

/* ****************************** FUNCTIONS ****************************** */

// Animate (render) game
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player1.update()
    player2.update()
}

/* HELPER FUNCTIONS */

// Used to randomise a player's spawn point
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}