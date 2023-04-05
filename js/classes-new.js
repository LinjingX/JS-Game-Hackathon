/* ****************************** CLASSES ****************************** */

/**
 * The basic unit of the game, all rendered elements are represented by this
 */
class Sprite {
  /**
   * @type {Vec2d}
   */
  position;

  /**
   * @type {number}
   */
  width;

  /**
   * @type {number}
   */
  height;

  /**
   * @type {Image}
   */
  image; // + image.src

  /**
   * @type {number}
   */
  scale;

  /**
   * @type {number}
   */
  framesMax;

  /**
   * @type {number}
   */
  framesCurrent;

  /**
   * @type {number}
   */
  framesElapsed;

  /**
   * @type {number}
   */
  framesHold;

  /**
   * @type {Vec2d}
   */
  offset;

  constructor({ position, imageSrc, scale = 2, framesMax = 1, offset = { x: 0, y: 0 } }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.offset = offset;
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
    );
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}

/**
 * Futher abstraction needed to help define player to the local scope.
 * Encapsulates everything needed to define a player:
 *   - Who are they fighting with?
 *   - What are their controls?
 *   - Health multipliers?
 *   - Damage multipliers?
 */
class Player {
  /**
   * @type {Fighter}
   */
  fighter;

  /**
   * @type {Controller}
   */
  controller;

  /**
   * @type {number}
   */
  health = 100;

  /**
   * @type {number}
   */
  damage = 7.5;

  /**
   *
   * @param {Fighter} fighter
   * @param {Vec} props
   */
  constructor(props) {
    this.fighter = props.fighter;
    this.controller = props.controller;
    this.position = props.position;
    this.velocity = props.velocity;
    this.offset = props.offset;
  }

  update(platformlist, GROUND_OFFSET) {
    this.fighter.update();
  }
}

/**
 * Fighter retains all the sprite information but we'll change it later
 * @extends Sprite
 */
class Fighter extends Sprite {
  /**
   * @type {string}
   */
  imageSrc;

  /**
   * @type {any} - cbf
   */
  sprites;

  /**
   * @type {{offset: Vec2d, width: number, height: number}}
   */
  attackBox;

  /**
   * @type {{width: number, height: number}}
   */
  hitbox;

  /**
   * @type {Vec2d}
   */
  velocity;

  constructor(props) {
    console.log("Drawing fighter");
    super({
      position: props.position,
      imageSrc: props.imageSrc,
      scale: props.scale,
      framesMax: props.framesMax,
      offset: props.offset,
    });
  }

  draw() {
    let crop_start_x = 0;
    if (this.lastKey === "a") {
      crop_start_x = this.image.width - (this.framesCurrent + 1) * (this.image.width / this.framesMax);
    } else {
      crop_start_x = this.framesCurrent * (this.image.width / this.framesMax);
    }

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
    );
  }

  update(platformlist, groundoffset) {
    c.fillStyle = "rgba(0, 255, 0, 0.2)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // draw hitbox
    c.fillStyle = "rgba(255, 0, 0, 0.2)";
    c.fillRect(this.position.x, this.position.y, this.hitbox.width, this.hitbox.height);

    this.draw();
  }
}

/**
 * SamuraiMack Fighter - details all the sprite information including hitbox
 */
class SamuraiMack {
  /**
   * @param {Fighter} fighter object to use
   */
  constructor(fighter) {
    fighter.scale = 4;
    fighter.framesMax = 8;
    fighter.offset = { x: 345, y: 280 };
    fighter.imageSrc = "./assets/samuraiMack/Idle.png";
    fighter.image.src = fighter.imageSrc;
    console.log("Drawing SamuraiMack");
    fighter.sprites = {
      idle: {
        imageSrc: "./assets/samuraiMack/Idle.png",
        framesMax: 8,
      },
      idle2: {
        imageSrc: "./assets/samuraiMack/Idle2.png",
        framesMax: 8,
      },
      run: {
        imageSrc: "./assets/samuraiMack/Run.png",
        framesMax: 8,
        image: new Image(),
      },
      run2: {
        imageSrc: "./assets/samuraiMack/Run2.png",
        framesMax: 8,
        image: new Image(),
      },
      jump: {
        imageSrc: "./assets/samuraiMack/Jump.png",
        framesMax: 2,
        image: new Image(),
      },
      jump2: {
        imageSrc: "./assets/samuraiMack/Jump2.png",
        framesMax: 2,
        image: new Image(),
      },
      fall: {
        imageSrc: "./assets/samuraiMack/Fall.png",
        framesMax: 2,
        image: new Image(),
      },
      fall2: {
        imageSrc: "./assets/samuraiMack/Fall2.png",
        framesMax: 2,
        image: new Image(),
      },
      attack1: {
        imageSrc: "./assets/samuraiMack/Attack1.png",
        framesMax: 6,
        image: new Image(),
      },
      attack1_flipped: {
        imageSrc: "./assets/samuraiMack/attack1_flipped.png",
        framesMax: 6,
        image: new Image(),
      },
      attack2: {
        imageSrc: "./assets/samuraiMack/Attack2.png",
        framesMax: 6,
        image: new Image(),
      },
      attack2_flipped: {
        imageSrc: "./assets/samuraiMack/Attack2-flip.png",
        framesMax: 6,
        image: new Image(),
      },
      takeHit: {
        imageSrc: "./assets/samuraiMack/Take Hit.png",
        framesMax: 4,
      },
      takeHit2: {
        imageSrc: "./assets/samuraiMack/Take Hit2.png",
        framesMax: 4,
      },
      death: {
        imageSrc: "./assets/samuraiMack/Death.png",
        framesMax: 6,
      },
    };
    fighter.attackBox = {
      offset: {
        x: 90,
        y: 30,
      },
      width: 300,
      height: 100,
    };
    fighter.hitbox = {
      width: SPRITE_WIDTH,
      height: SPRITE_HEIGHT - 90,
    };
  }
}

/**
 * Pre-defined by the team. Untouched :)
 */
class MidairPlatform {
  constructor({ position, width, height, imageSrc }) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw() {
    //c.fillStyle = 'rgba(255, 0, 0, 0.5)'
    //c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
  }
}

/**
 * A 2D vector to help standardise X and Y coordinates
 */
class Vec2d {
  /**
   * @type {number}
   */
  x;

  /**
   * @type {number}
   */
  y;

  /**
   * @param {[number, number]} coords X and Y coordinates
   */
  constructor(...coords) {
    this.x = coords[0];
    this.y = coords[1];
  }
}

/**
 * Helps define user controls. Only contains keyboard controls at the moment
 */
class Controller {
  /**
   * @type {string}
   */
  left;

  /**
   * @type {string}
   */
  right;

  /**
   * @type {string}
   */
  attack;

  /**
   * @type {string}
   */
  jump;

  constructor() {
    this.left = "ArrowLeft";
    this.right = "ArrowRight";
    this.attack = "ShiftLeft";
    this.jump = "Space";
  }

  /**
   * Control scheme of Key Codes
   * @readonly
   * @returns {{left: string, right: string, attack: string, jump: string}}
   */
  getControls() {
    return {
      left: this.left,
      right: this.right,
      attack: this.attack,
      jump: this.jump,
    };
  }
}
