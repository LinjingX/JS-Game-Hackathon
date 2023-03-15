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
        sprites,
        attackBox = {offset: {}, width: undefined, height: undefined},
        hitbox = {width: undefined, height: undefined}
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
        this.hitbox = {
            position: {
              x: this.position.x,
              y: this.position.y,
            },
            width: hitbox.width,
            height: hitbox.height
        }
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        }
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites
        this.dead = false

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    draw() {
        let crop_start_x = 0
        if (this.lastKey === 'a'){
            crop_start_x = this.image.width - (this.framesCurrent + 1) * (this.image.width / this.framesMax)
        } else {crop_start_x = this.framesCurrent * (this.image.width / this.framesMax)}

        c.drawImage(
          this.image,
          crop_start_x,
          0,
          this.image.width / this.framesMax,
          this.image.height,
          this.position.x - this.offset.x,
          this.position.y - this.offset.y,
          (this.image.width / this.framesMax) * this.scale,
          this.image.height * this.scale
        )
      }

    update(platformlist) {
        //c.fillStyle = 'rgba(0, 255, 0, 0.2)'
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //c.fillStyle = 'rgba(255, 0, 0, 0.2)'
        //c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        this.draw()
        if (!this.dead) {this.animateFrames()}
        
        this.hitbox.position.x = this.position.x
        this.hitbox.position.y = this.position.y

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // draw attack box
        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        this.position.x += this.velocity.x

        // apply gravity
        this.velocity.y += GRAVITY_RATE
        this.position.y += this.velocity.y

        // loop through the platform, check if player standing on any platform
        for(let i = 0; i < platformlist.length; i++){
            if(platformCollision({object1: this.hitbox, object2: platformlist[i]})) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.position.y = platformlist[i].position.y - this.hitbox.height
                }
            } 
        }

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 100) {
            // stop player from sinking into the ground upon initial impact from spawn fall
            this.velocity.y = 0
            this.position.y = 752
        }
    }


    attack() {
        if (this.lastKey === 'a' || this.lastKey === 'ArrowRight') {
            this.switchSprite('attack1_flipped')
        } else {this.switchSprite('attack1')}

        this.isAttacking = true
    }

    takeHit() {
        this.health -= DAMAGE
        if (this.health <= 0) {
            this.switchSprite('death')
        } else {
            if(this.lastKey === 'a' || this.lastKey === 'ArrowRight'){
                this.switchSprite('takeHit2')
            } else {this.switchSprite('takeHit')}
        }
    }

    switchSprite(sprite) {
        // stop animating on death
        if (this.image === this.sprites.death.image) {
            if (this.framesCurrent === this.sprites.death.framesMax - 1) {this.dead = true}
            return
        }

        // overriding all other animations with the attack animation
        if (this.image === this.sprites.attack1.image && 
            this.framesCurrent < this.sprites.attack1.framesMax - 1){
            return
        }

        if (this.image === this.sprites.attack1_flipped.image && 
            this.framesCurrent < this.sprites.attack1_flipped.framesMax - 1){
            return
        }

        // override when fighter gets hit
        if (this.image === this.sprites.takeHit.image && 
            this.framesCurrent < this.sprites.takeHit.framesMax - 1){
            return
        }

        if (this.image === this.sprites.takeHit2.image && 
            this.framesCurrent < this.sprites.takeHit2.framesMax - 1){
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
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'takeHit2':
            if (this.image !== this.sprites.takeHit2.image) {
                this.image = this.sprites.takeHit2.image
                this.framesMax = this.sprites.takeHit2.framesMax
                this.framesCurrent = 0
            }
                break
            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }
}

class MidairPlatform {
    constructor({
        position, 
        width, 
        height, 
        imageSrc}) {
      this.position = position
      this.width = width
      this.height = height
      this.image = new Image()
      this.image.src = imageSrc
    }
  
    draw() {
      //c.fillStyle = 'rgba(255, 0, 0, 0.5)'
      //c.fillRect(this.position.x, this.position.y, this.width, this.height)
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
    }
  
    update() {
      this.draw()
    }
  }
