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
class Fighter extends Sprite{
    
    constructor({
        position, 
        velocity, 
        imageSrc,
        scale = 2,
        framesMax = 1,
        offset = { x: 0, y: 0 }, 
        sprites
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

        this.velocity = velocity
        this.width = 100
        this.height = SPRITE_HEIGHT
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 200,
            height: 100,
        }
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    update() {
        this.draw()
        this.animateFrames()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 195) {
            // stop player from sinking into the ground upon initial impact from spawn fall
            this.velocity.y = 0
            this.position.y = 657
        } else {
            // otherwise apply gravity
            this.velocity.y += GRAVITY_RATE
        }
    }

    attack() {
        if (this.lastKey === 'a') {
            this.switchSprite('attack1_flipped')
        } else {this.switchSprite('attack1')}
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.attack1.image && 
            this.framesCurrent < this.sprites.attack1.framesMax - 1){
            return
        }

        if (this.image === this.sprites.attack1_flipped.image && 
            this.framesCurrent < this.sprites.attack1_flipped.framesMax - 1){
            return
        }

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'idle2':
                if (this.image !== this.sprites.idle2.image) {
                    this.image = this.sprites.idle2.image
                    this.framesMax = this.sprites.idle2.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run2':
                if (this.image !== this.sprites.run2.image) {
                    this.image = this.sprites.run2.image
                    this.framesMax = this.sprites.run2.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump2':
                if (this.image !== this.sprites.jump2.image) {
                    this.image = this.sprites.jump2.image
                    this.framesMax = this.sprites.jump2.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'fall2':
                if (this.image !== this.sprites.fall2.image) {
                    this.image = this.sprites.fall2.image
                    this.framesMax = this.sprites.fall2.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attack1_flipped':
                if (this.image !== this.sprites.attack1_flipped.image) {
                    this.image = this.sprites.attack1_flipped.image
                    this.framesMax = this.sprites.attack1_flipped.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }
}

/* ****************************** INITIALISE ****************************** */

c.fillRect(0, 0, canvas.width, canvas.height)

// Create background sprite
const background = new Sprite({
    position: {x: 0, y: 0}, 
    imageSrc: './assets/background.png'
})

// Create shop sprite
const shop = new Sprite({
    position: {x: 1200, y: 256}, 
    imageSrc: './assets/shop.png',
    scale: 5.5,
    framesMax: 6
})

// Create players
const player1 = new Fighter({
    position: {x: 0, y: getRandomInt(-100, 100)}, 
    velocity: {x: 0, y: 0},
    offset: {
        x: 0,
        y: 0
    }, 
    imageSrc: './assets/samuraiMack/Idle.png',
    scale: 4,
    framesMax: 8,
    offset: {
        x: 300,
        y: 190
    }, 
    sprites: {
        idle: {
            imageSrc: './assets/samuraiMack/Idle.png', 
            framesMax: 8
        }, 
        idle2: {
            imageSrc: './assets/samuraiMack/Idle2.png', 
            framesMax: 8
        }, 
        run : {
            imageSrc: './assets/samuraiMack/Run.png', 
            framesMax: 8, 
            image: new Image()
        },
        run2 : {
            imageSrc: './assets/samuraiMack/Run2.png', 
            framesMax: 8,
            image: new Image()
        },
        jump : {
            imageSrc: './assets/samuraiMack/Jump.png', 
            framesMax: 2, 
            image: new Image()
        }, 
        jump2 : {
            imageSrc: './assets/samuraiMack/Jump2.png', 
            framesMax: 2, 
            image: new Image()
        }, 
        fall : {
            imageSrc: './assets/samuraiMack/Fall.png', 
            framesMax: 2, 
            image: new Image()
        }, 
        fall2 : {
            imageSrc: './assets/samuraiMack/Fall2.png', 
            framesMax: 2, 
            image: new Image()
        }, 
        attack1 : {
            imageSrc: './assets/samuraiMack/Attack1.png', 
            framesMax: 6, 
            image: new Image()
        },
        attack1_flipped : {
            imageSrc: './assets/samuraiMack/attack1_flipped.png', 
            framesMax: 6, 
            image: new Image()
        }
    }
})

const player2 = new Fighter({
    position: {x: 1000, y: getRandomInt(-100, 100)}, 
    velocity: {x: 0, y: 0},
    offset: {
        x: -100,
        y: 0
    }, 
})

// Render players
player1.draw()
console.log(player1)

player2.draw()
console.log(player2)

// Animate (render) game
animate()


/* ****************************** FUNCTIONS ****************************** */

// Return if a collision between a players attack box and players hitbox has occured
function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x 
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width 
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

// Determine winner of the game based on players health
function determineWinner ({player1, player2, timeID}) {
    clearTimeout(timeID)
    if (player1.health === player2.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (player1.health > player2.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins!'
    } else {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins!'
    }
    document.querySelector('#displayText').style.display = 'flex'
}

// Regulate game timer
let timer = 10
let timeID
function decreaseTimer() {
    timeID = setTimeout(decreaseTimer, 1000)
    if (timer > 0) {
        timer--
        document.querySelector('#timer').innerHTML = timer
    } else {
        determineWinner({player1, player2, timeID})
    }
}
decreaseTimer()

// Animate (render) game
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player1.update()
    // player2.update()

    player1.velocity.x = 0
    player2.velocity.x = 0
    
    // detect player1 movement
    // manage player1 sprite

    if (keys.a.pressed && player1.lastKey === 'a') {
        player1.velocity.x = -5
        player1.switchSprite('run2')
    } else if (keys.d.pressed && player1.lastKey === 'd') {
        player1.velocity.x = 5
        player1.switchSprite('run')
    } else if (player1.lastKey === 'a'){
        player1.switchSprite('idle2')
    } else {
        player1.switchSprite('idle')
    }

    if (player1.velocity.y < 0) {
        player1.switchSprite('jump')
    } else if (player1.velocity.y > 0) {
        player1.switchSprite('fall')
    }

    if (player1.velocity.y < 0 && player1.lastKey === 'a') {
        player1.switchSprite('jump2')
    } else if (player1.velocity.y > 0 && player1.lastKey === 'a') {
        player1.switchSprite('fall2')
    }

    // detect player2 movement
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
        player2.velocity.x = -5
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 5
    }

    // detect player1 collisions
    if (rectangularCollision({rectangle1: player1, rectangle2: player2}) && player1.isAttacking) {
        player1.isAttacking = false
        console.log('go')

        // subtract health from player 1's attack
        player2.health -= 5
        document.querySelector('#player2Health').style.width = player2.health + '%'
    }
    
    // detect player2 collisions
    if (rectangularCollision({rectangle1: player2, rectangle2: player1}) && player2.isAttacking) {
        player2.isAttacking = false
        console.log('enemy attack successful') 

        // subtract health from player 2's attack
        player1.health -= 5
        document.querySelector('#player1Health').style.width = player1.health + '%'
    }

    // end game based on health
    if (player1.health  <= 0 || player2.health  <= 0) {
        determineWinner({player1, player2, timeID})
    }
}

// Event listener for when key is being pressed
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
        case ' ':
            player1.attack()
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
        case 'ArrowDown':
            player2.attack()
            break
    }

    console.log(event.key)
})

// Event listener for when key is no longer being pressed
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