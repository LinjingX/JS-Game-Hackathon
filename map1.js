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
const DAMAGE = 2.5
const DISPLAY_TIE = 'Tie'
const DISPLAY_P1WIN = 'Samurai Mack Wins!'
const DISPLAY_P2WIN = 'Kenji Wins!'
const keys = {
    w : {pressed: false},
    a : {pressed: false},
    d : {pressed: false},
    ArrowLeft : {pressed: false},
    ArrowRight : {pressed: false}
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

// Create mid air platform
var platformlist = []

const midairplatform1 = new MidairPlatform({
    position: {x: 50, y: 600},
    width: 300,
    height: 50, 
    imageSrc: './assets/platform.png'
})
platformlist.push(midairplatform1)

const midairplatform2 = new MidairPlatform({
    position: {x: 700, y: 500},
    width: 300,
    height: 50, 
    imageSrc: './assets/platform.png'
})
platformlist.push(midairplatform2)

const midairplatform3 = new MidairPlatform({
    position: {x: 1250, y: 500},
    width: 550,
    height: 50, 
    imageSrc: './assets/platform.png'
})
platformlist.push(midairplatform3)

// Create player 1
const player1 = new Fighter({
    position: {x: 550, y: getRandomInt(-100, 100)}, 
    velocity: {x: 0, y: 0},
    offset: {
        x: 0,
        y: 0
    }, 
    imageSrc: './assets/samuraiMack/Idle.png',
    scale: 4,
    framesMax: 8,
    offset: {
        x: 345,
        y: 280
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
        },
        attack2 : {
            imageSrc: './assets/samuraiMack/Attack2.png', 
            framesMax: 4, 
            image: new Image()
        },
        attack2_flipped : {
            imageSrc: './assets/samuraiMack/Attack2-flip.png', 
            framesMax: 4, 
            image: new Image()
        },
        takeHit: {
            imageSrc: './assets/samuraiMack/Take Hit.png',
            framesMax: 4 
        },
        takeHit2: {
            imageSrc: './assets/samuraiMack/Take Hit2.png',
            framesMax: 4 
        }, 
        death: {
            imageSrc: './assets/samuraiMack/Death.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 90,
            y: 30
        },
        width: 300,
        height: 100
    },
    hitbox: {
        width: SPRITE_WIDTH,
        height: SPRITE_HEIGHT - 90
    }
})

// Create player 2
const player2 = new Fighter({
    position: {x: 1400, y: getRandomInt(-100, 100)}, 
    velocity: {x: 0, y: 0},
    offset: {
        x: -100,
        y: 0
    }, 
    imageSrc: './assets/kenji/Idle.png',
    scale: 4,
    framesMax: 4,
    offset: {
        x: 350,
        y: 300
    }, 
    sprites: {
        idle: {
            imageSrc: './assets/kenji/Idle.png', 
            framesMax: 4
        }, 
        idle2: {
            imageSrc: './assets/kenji/Idle_flip.png', 
            framesMax: 4
        }, 
        run : {
            imageSrc: './assets/kenji/Run.png', 
            framesMax: 8, 
            image: new Image()
        },
        run2 : {
            imageSrc: './assets/kenji/Run_flip.png', 
            framesMax: 8,
            image: new Image()
        },
        jump : {
            imageSrc: './assets/kenji/Jump.png', 
            framesMax: 2, 
            image: new Image()
        }, 
        jump2 : {
            imageSrc: './assets/kenji/Jump_flip.png', 
            framesMax: 2, 
            image: new Image()
        }, 
        fall : {
            imageSrc: './assets/kenji/Fall.png', 
            framesMax: 2, 
            image: new Image()
        }, 
        fall2 : {
            imageSrc: './assets/kenji/Fall_flip.png', 
            framesMax: 2, 
            image: new Image()
        }, 
        attack1 : {
            imageSrc: './assets/kenji/Attack1.png', 
            framesMax: 4, 
            image: new Image()
        },
        attack1_flipped : {
            imageSrc: './assets/kenji/Attack1_flip.png', 
            framesMax: 4, 
            image: new Image()
        },
        attack2 : {
            imageSrc: './assets/kenji/Attack2.png', 
            framesMax: 4, 
            image: new Image()
        },
        attack2_flipped : {
            imageSrc: './assets/kenji/Attack2-flip.png', 
            framesMax: 4, 
            image: new Image()
        },
        takeHit: {
            imageSrc: './assets/kenji/Take Hit.png',
            framesMax: 3 
        },
        takeHit2: {
            imageSrc: './assets/kenji/Take Hit_flip.png',
            framesMax: 3 
        }, 
        death: {
            imageSrc: './assets/kenji/Death.png',
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: -280,
            y: 30
        },
        width: 300,
        height: 100
    },
    hitbox: {
        width: SPRITE_WIDTH,
        height: SPRITE_HEIGHT - 90
    }
})

// Render players
player1.draw()
console.log(player1)

player2.draw()
console.log(player2)

// Animate (render) game
animate()

// Decrement timer
decreaseTimer()

// Animate (render) game
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    for(let i = 0; i < platformlist.length-1; i++){
        platformlist[i].update()
    }
    player1.update(platformlist)
    player2.update(platformlist)

    player1.velocity.x = 0
    player2.velocity.x = 0
    
    /* --- PLAYER 1 SPRITES --- */

    // movement sprites - player1
    if (keys.a.pressed && player1.lastKey === 'a') {
        if (player1.position.x > 0) {
            player1.velocity.x = -5
        }
        player1.switchSprite('run2')
    } else if (keys.d.pressed && player1.lastKey === 'd') {
        if (player1.position.x < (CANVAS_WIDTH - player1.width)) {
            player1.velocity.x = 5
        }
        player1.switchSprite('run')
    } else if (player1.lastKey === 'a'){
        player1.switchSprite('idle2')
    } else {
        player1.switchSprite('idle')
    }

    // jump and fall sprite right - player1
    if (player1.velocity.y < 0) {
        player1.switchSprite('jump')
    } else if (player1.velocity.y > 0) {
        player1.switchSprite('fall')
    }

    // jump and fall sprite left - player1
    if (player1.velocity.y < 0 && player1.lastKey === 'a') {
        player1.switchSprite('jump2')
    } else if (player1.velocity.y > 0 && player1.lastKey === 'a') {
        player1.switchSprite('fall2')
    }

    /* --- PLAYER 2 SPRITES --- */

    // movement sprites - player2
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
        if (player2.position.x > 0) {
            player2.velocity.x = -5
        }
        player2.switchSprite('run')
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        if (player2.position.x < (CANVAS_WIDTH - player2.width)) {
            player2.velocity.x = 5
        }
        player2.switchSprite('run2')
    } else if (player2.lastKey === 'ArrowRight'){
        player2.switchSprite('idle2')
    } else {
        player2.switchSprite('idle')
    }

    // jump and fall sprite left - player2
    if (player2.velocity.y < 0) {
        player2.switchSprite('jump')
    } else if (player2.velocity.y > 0) {
        player2.switchSprite('fall')
    }

    // jump and fall sprite right - player2
    if (player2.velocity.y < 0 && player2.lastKey === 'ArrowRight') {
        player2.switchSprite('jump2')
    } else if (player2.velocity.y > 0 && player2.lastKey === 'ArrowRight') {
        player2.switchSprite('fall2')
    }

    /* --- COLLISIONS --- */

    // detect player1 collisions & player2 gets hit
    if (rectangularCollision({rectangle1: player1, rectangle2: player2}) && player1.isAttacking && player1.framesCurrent === 4) {
        player2.takeHit()
        player1.isAttacking = false
        console.log('go')

        // subtract health from player 2's health
        gsap.to('#player2Health', {
            width: player2.health + '%'
        })
    }
    // if player1 misses
    if (player1.isAttacking && player1.framesCurrent === 4){
        player1.isAttacking = false
    }
    
    // detect player2 collisions & player1 gets hit
    if (rectangularCollision({rectangle1: player2, rectangle2: player1}) && player2.isAttacking && player2.framesCurrent === 1) {
        player1.takeHit()
        player2.isAttacking = false
        console.log('enemy attack successful') 

        // subtract health from player 1's health
        gsap.to('#player1Health', {
            width: player1.health + '%'
        })
    }

    // if player2 misses
    if (player2.isAttacking && player2.framesCurrent === 1){
        player2.isAttacking = false
    }

    // detect player1 and mid-air platform collisions
    

    // end game based on health
    if (player1.health  <= 0 || player2.health  <= 0) {
        determineWinner({player1, player2, timeID})
    }
}

// Event listener for when key is being pressed
window.addEventListener('keydown', (event) => {
    if (!player1.dead) {
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
                if(player1.position.y > (player1.height/2)){
                    player1.velocity.y = -10
                }
                break
            case ' ':
                player1.attack()
                break
        }
    }
    if (!player2.dead) {
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
                if(player2.position.y > (player2.height/2)){
                    console.log('ok')
                    player2.velocity.y = -10
                }
                break
            case 'ArrowDown':
                player2.attack()
                break
        }
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
