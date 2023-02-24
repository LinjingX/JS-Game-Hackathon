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

const keys = {
    w : {pressed: false},
    a : {pressed: false},
    d : {pressed: false},
    ArrowLeft : {pressed: false},
    ArrowRight : {pressed: false}
}

/* ****************************** CLASSES ****************************** */

// The basic unit of the game, everything is represented by a sprite
class Sprite {
    constructor({
      position,
      imageSrc,
      scale = 2,
      framesMax = 1,
      offset = { x: 0, y: 0 }
    }) {
      this.position = position
      this.width = 50
      this.height = 150
      this.image = new Image()
      this.image.src = imageSrc
      this.scale = scale
      this.framesMax = framesMax
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 5
      this.offset = offset
    }
  
    draw() {
      c.drawImage(
        this.image,
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width / this.framesMax) * this.scale,
        this.image.height * this.scale
      )
    }
  
    animateFrames() {
      this.framesElapsed++
  
      if (this.framesElapsed % this.framesHold === 0) {
        if (this.framesCurrent < this.framesMax - 1) {
          this.framesCurrent++
        } else {
          this.framesCurrent = 0
        }
      }
    }
  
    update() {
      this.draw()
      this.animateFrames()
    }
}

// Each player is represented by a Fighther class, extend Sprite class
class Fighter {
    
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.width = 100
        this.height = SPRITE_HEIGHT
        this.lastKey
        this.attackBox = {
            position: this.position,
            width: 200,
            height: 100,
        }
        this.color = 'red'
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // attack box
        c.fillStyle = 'green'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }

    update() {
        this.draw()
        
        this.position.y += this.velocity.y

        this.position.x += this.velocity.x

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

const background = new Sprite({position: {x: 0, y: 0}, imageSrc: './assets/background.png'})

// Create players
const player1 = new Fighter({position: {x: 0, y: getRandomInt(-100, 100)}, velocity: {x: 0, y: 0}})
const player2 = new Fighter({position: {x: 1000, y: getRandomInt(-100, 100)}, velocity: {x: 0, y: 0}})

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
    background.update()
    player1.update()
    player2.update()

    player1.velocity.x = 0
    player2.velocity.x = 0

    if (keys.a.pressed && player1.lastKey === 'a') {
        player1.velocity.x = -5
    } else if (keys.d.pressed && player1.lastKey === 'd') {
        player1.velocity.x = 5
    }

    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
        player2.velocity.x = -5
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 5
    }

    // detect collision
    if (player1.attackBox.position.x + player1.attackBox.width >= player2.position.x 
        && player1.attackBox.position.x <= player2.position.x + player2.width 
        && player1.attackBox.position.y + player1.attackBox.height >= player2.position.y
        && player1.attackBox.position.y <= player2.position.y + player2.height) {
        console.log('go') 
    }
}

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player1.lastKey = 'd'
        break
        case 'a':
            keys.a.pressed = true
            player1.lastKey = 'a'
        break
        case 'w':
            player1.velocity.y = -10
        break
    }

    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            player2.lastKey = 'ArrowRight'
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            player2.lastKey = 'ArrowLeft'
        break
        case 'ArrowUp':
            player2.velocity.y = -10
        break
    }

    console.log(event.key)
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
        break
        case 'a':
            keys.a.pressed = false
        break
    }

    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
        break
    }
    console.log(event.key)
})

/* HELPER FUNCTIONS */

// Used to randomise a player's spawn point
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}