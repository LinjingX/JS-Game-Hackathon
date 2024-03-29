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
const GROUND_OFFSET = -400
const DAMAGE = 10
const FALL_DAMAGE = 100
const PLAYER1_MAX_HEALTH = 200
const DISPLAY_TIE = 'DRAW'
const DISPLAY_P1WIN = 'BASEBALL MAN Wins!'
const DISPLAY_P2WIN = 'WUKONG Wins!'
const RIGHT = 1
const LEFT = -1
const KNOCKBACK = 25
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
    imageSrc: './assets/magicCliffs.png'
})

// Create mid air platform
var platformlist = []

const midairplatform1 = new MidairPlatform({
    position: {x: 0, y: 640},
    width: 370,
    height: 25, 
    imageSrc: './assets/transparent.png'
})
platformlist.push(midairplatform1)

const midairplatform2 = new MidairPlatform({
    position: {x: 350, y: 900},
    width: 100,
    height: 50, 
    imageSrc: './assets/transparent.png'
})
platformlist.push(midairplatform2)

const midairplatform3 = new MidairPlatform({
    position: {x: 400, y: 950},
    width: 100,
    height: 50, 
    imageSrc: './assets/transparent.png'
})
platformlist.push(midairplatform3)

const midairplatform4 = new MidairPlatform({
    position: {x: 450, y: 1000},
    width: 100,
    height: 50, 
    imageSrc: './assets/transparent.png'
})
platformlist.push(midairplatform4)

const midairplatform5 = new MidairPlatform({
    position: {x: 500, y: 1050},
    width: 100,
    height: 50, 
    imageSrc: './assets/transparent.png'
})
platformlist.push(midairplatform5)

const midairplatform6 = new MidairPlatform({
    position: {x: 770, y: 535},
    width: 340,
    height: 25, 
    imageSrc: './assets/transparent.png'
})
platformlist.push(midairplatform6)

const midairplatform7 = new MidairPlatform({
    position: {x: 1110, y: 930},
    width: 155,
    height: 25, 
    imageSrc: './assets/transparent.png'
})
platformlist.push(midairplatform7)

const midairplatform8 = new MidairPlatform({
    position: {x: 1525, y: 945},
    width: 525,
    height: 25, 
    imageSrc: './assets/transparent.png'
})
platformlist.push(midairplatform8)

// Create player 1
const player1 = new Fighter({
    position: {x: 150, y: getRandomInt(-100, 100)}, 
    velocity: {x: 0, y: 0},
    offset: {
        x: 0,
        y: 0
    }, 
    imageSrc: './assets/baseballBat/Idle.png',
    scale: 4,
    framesMax: 10,
    offset: {
        x: 300,
        y: 270
    }, 
    sprites: {
        idle: {
            imageSrc: './assets/baseballBat/Idle.png', 
            framesMax: 10
        }, 
        idle2: {
            imageSrc: './assets/baseballBat/Idle-flip.png', 
            framesMax: 10
        }, 
        run : {
            imageSrc: './assets/baseballBat/Run.png', 
            framesMax: 8, 
            image: new Image()
        },
        run2 : {
            imageSrc: './assets/baseballBat/Run-flip.png', 
            framesMax: 8,
            image: new Image()
        },
        jump : {
            imageSrc: './assets/baseballBat/Jump.png', 
            framesMax: 3, 
            image: new Image()
        }, 
        jump2 : {
            imageSrc: './assets/baseballBat/Jump-flip.png', 
            framesMax: 3, 
            image: new Image()
        }, 
        fall : {
            imageSrc: './assets/baseballBat/Fall.png', 
            framesMax: 3, 
            image: new Image()
        }, 
        fall2 : {
            imageSrc: './assets/baseballBat/Fall-flip.png', 
            framesMax: 3, 
            image: new Image()
        }, 
        attack1 : {
            imageSrc: './assets/baseballBat/Attack1.png', 
            framesMax: 7, 
            image: new Image()
        },
        attack1_flipped : {
            imageSrc: './assets/baseballBat/Attack1-flip.png', 
            framesMax: 7, 
            image: new Image()
        },
        attack2 : {
            imageSrc: './assets/baseballBat/Attack2.png', 
            framesMax: 6, 
            image: new Image()
        },
        attack2_flipped : {
            imageSrc: './assets/baseballBat/Attack2-flip.png', 
            framesMax: 6, 
            image: new Image()
        },
        takeHit: {
            imageSrc: './assets/baseballBat/Hit.png',
            framesMax: 3 
        },
        takeHit2: {
            imageSrc: './assets/baseballBat/Hit-flip.png',
            framesMax: 3
        }, 
        death: {
            imageSrc: './assets/baseballBat/Death.png',
            framesMax: 11
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
        width: SPRITE_WIDTH + 100,
        height: SPRITE_HEIGHT - 50
    }, 
    health: 100, 
    damage: 7,
    facing: RIGHT
})

// Create player 2
const player2 = new Fighter({
    position: {x: 1525, y: getRandomInt(-100, 100)}, 
    velocity: {x: 0, y: 0},
    offset: {
        x: -100,
        y: 0
    }, 
    imageSrc: './assets/wukong/Idle-flip.png',
    scale: 4,
    framesMax: 4,
    offset: {
        x: 350,
        y: 315
    }, 
    sprites: {
        idle: {
            imageSrc: './assets/wukong/Idle-flip.png', 
            framesMax: 4
        }, 
        idle2: {
            imageSrc: './assets/wukong/Idle.png', 
            framesMax: 4
        }, 
        run : {
            imageSrc: './assets/wukong/Run-flip.png', 
            framesMax: 8, 
            image: new Image()
        },
        run2 : {
            imageSrc: './assets/wukong/Run.png', 
            framesMax: 8,
            image: new Image()
        },
        jump : {
            imageSrc: './assets/wukong/Jump-flip.png', 
            framesMax: 2, 
            image: new Image()
        }, 
        jump2 : {
            imageSrc: './assets/wukong/Jump.png', 
            framesMax: 2, 
            image: new Image()
        }, 
        fall : {
            imageSrc: './assets/wukong/Fall-flip.png', 
            framesMax: 2, 
            image: new Image()
        }, 
        fall2 : {
            imageSrc: './assets/wukong/Fall.png', 
            framesMax: 2, 
            image: new Image()
        }, 
        attack1 : {
            imageSrc: './assets/wukong/Attack1-flip.png', 
            framesMax: 4, 
            image: new Image()
        },
        attack1_flipped : {
            imageSrc: './assets/wukong/Attack1.png', 
            framesMax: 4, 
            image: new Image()
        },
        attack2 : {
            imageSrc: './assets/wukong/Attack2-flip.png', 
            framesMax: 4, 
            image: new Image()
        },
        attack2_flipped : {
            imageSrc: './assets/wukong/Attack2.png', 
            framesMax: 4, 
            image: new Image()
        },
        takeHit: {
            imageSrc: './assets/wukong/Hit-flip.png',
            framesMax: 4
        },
        takeHit2: {
            imageSrc: './assets/wukong/Hit.png',
            framesMax: 4
        }, 
        death: {
            imageSrc: './assets/wukong/Death.png',
            framesMax: 4
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
        width: SPRITE_WIDTH - 25,
        height: SPRITE_HEIGHT - 50
    },
    health: 100,
    damage: 4.3,
    facing: LEFT
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
    //shop.update()
    for(let i = 0; i < platformlist.length; i++){
        platformlist[i].update()
    }
    player1.update(platformlist, GROUND_OFFSET)
    player2.update(platformlist, GROUND_OFFSET)

    player1.velocity.x = 0
    player2.velocity.x = 0
    
    /* --- PLAYER 1 SPRITES --- */

    // movement sprites - player1
    if (keys.a.pressed && player1.lastKey === 'a') {
        if (player1.position.x > 0) {
            player1.velocity.x = -5
        }
        player1.switchSprite('run2')
        player1.facing = LEFT
    } else if (keys.d.pressed && player1.lastKey === 'd') {
        if (player1.position.x < (CANVAS_WIDTH - player1.width)) {
            player1.velocity.x = 5
        }
        player1.switchSprite('run')
        player1.facing = RIGHT
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
        player2.facing = LEFT
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        if (player2.position.x < (CANVAS_WIDTH - player2.width)) {
            player2.velocity.x = 5
        }
        player2.switchSprite('run2')
        player2.facing = RIGHT
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
        player2.takeHit(player1.damage)

        // knockback to player 2 on hit
        if (player1.facing === RIGHT) {
            player2.position.x += KNOCKBACK
        } else if (player1.facing === LEFT) {
            player2.position.x -= KNOCKBACK
        }

        // change health bar colour
        document.getElementById("player2Health").style.transition = "background 1s";
        if (player2.health <= 40 && player2.health > 20) {
            document.getElementById("player2Health").style.backgroundColor = '#ffaa0d'
        }
        else if (player2.health <= 20) {
            document.getElementById("player2Health").style.backgroundColor = 'red'
        }

        player1.isAttacking = false
        console.log('go')

        // reduce player 2's health bar
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
        player1.takeHit(player2.damage)

        // knockback to player 1 on hit
        if (player2.facing === RIGHT) {
            player1.position.x += KNOCKBACK
        } else if (player2.facing === LEFT) {
            player1.position.x -= KNOCKBACK
        }

        // change health bar colour
        document.getElementById("player1Health").style.transition = "background 1s";
        if (player1.health <= 40 && player1.health > 20) {
            document.getElementById("player1Health").style.backgroundColor = '#ffaa0d'
        }
        else if (player1.health <= 20) {
            document.getElementById("player1Health").style.backgroundColor = 'red'
        }

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

    // player fall to death
    if (player1.position.y >= CANVAS_HEIGHT){
        player1.fallToDeath()
    }

    if (player2.position.y >= CANVAS_HEIGHT){
        player2.fallToDeath()
    }

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
                if(player1.position.y > (player1.height/2) && player1.canjump){
                    player1.velocity.y = -10
                    player1.canjump = false
                    player1.candoublejump = true
                } else if (player1.position.y > (player1.height/2) && player1.candoublejump){
                    player1.velocity.y = -10
                    player1.candoublejump = false
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
                if(player2.position.y > (player2.height/2) && player2.canjump){
                    player2.velocity.y = -10
                    player2.canjump = false
                    player2.candoublejump = true
                } else if (player2.position.y > (player2.height/2) && player2.candoublejump){
                    player2.velocity.y = -10
                    player2.candoublejump = false
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
