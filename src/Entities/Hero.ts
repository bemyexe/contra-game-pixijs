import { Container, Graphics } from 'pixi.js';

const STATES = { stay: 'stay', jump: 'jump', flyDown: 'flydown' };

export default class Hero extends Container {
  private GRAVITY_FORCE = 0.1;
  private SPEED = 2;
  private velocityX = 0;
  private velocityY = 0;
  private JUMP_FORCE = 6;

  private movement = {
    x: 0,
    y: 0,
  };
  private directionContext = {
    left: 0,
    right: 0,
  };

  private state = STATES.stay;
  constructor() {
    super();
    const view = new Graphics();
    view.rect(0, 0, 20, 60);
    view.stroke(0xff0000);
    this.addChild(view);
  }

  update() {
    this.velocityX = this.movement.x * this.SPEED;
    this.x += this.velocityX;

    if (this.velocityY > 0 && this.isJumpState()) {
      this.state = STATES.flyDown;
    }

    this.velocityY += this.GRAVITY_FORCE;
    this.y += this.velocityY;
  }

  stay() {
    this.velocityY = 0;
    this.state = STATES.stay;
  }

  jump() {
    if (this.state === STATES.jump || this.state === STATES.flyDown) return;
    this.state = STATES.jump;
    this.velocityY -= this.JUMP_FORCE;
  }

  isJumpState() {
    return this.state === STATES.jump;
  }

  startLeftMove() {
    this.directionContext.left = -1;

    if (this.directionContext.right > 0) {
      this.movement.x = 0;
      return;
    }
    this.movement.x = -1;
  }

  startRightMove() {
    this.directionContext.right = 1;

    if (this.directionContext.left < 0) {
      this.movement.x = 0;
      return;
    }
    this.movement.x = 1;
  }
  stopLeftMove() {
    this.directionContext.left = 0;
    this.movement.x = this.directionContext.right;
  }
  stopRightMove() {
    this.directionContext.right = 0;
    this.movement.x = this.directionContext.left;
  }

  private rect = { x: 0, y: 0, width: 0, height: 0 };
  getRect() {
    this.rect.x = this.x;
    this.rect.y = this.y;
    this.rect.width = this.width;
    this.rect.height = this.height;
    return this.rect;
  }
}
