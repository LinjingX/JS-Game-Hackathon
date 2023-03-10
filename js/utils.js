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

function platformCollision({object1, object2}){
    return (
        object1.position.y + object1.height >= object2.position.y &&
        object1.position.y + object1.height <= object2.position.y + object2.height &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.x + object1.width >= object2.position.x
    )
}

// Determine winner of the game based on players health
function determineWinner ({player1, player2, timeID}) {
    clearTimeout(timeID)
    if (player1.health === player2.health) {
        document.querySelector('#displayText').innerHTML = DISPLAY_TIE
    } else if (player1.health > player2.health) {
        document.querySelector('#displayText').innerHTML = DISPLAY_P1WIN
    } else {
        document.querySelector('#displayText').innerHTML = DISPLAY_P2WIN
    }
    document.querySelector('#displayText').style.display = 'flex'
}

// Regulate game timer
let timer = 61
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

/* HELPER FUNCTIONS */

// Used to randomise a player's spawn point
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
