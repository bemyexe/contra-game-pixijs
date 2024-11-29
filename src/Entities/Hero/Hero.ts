import {Container} from "pixi.js";
import HeroView from "./HeroView";

const STATES = {stay: "stay", jump: "jump", flyDown: "flydown"};

export default class Hero {
  private GRAVITY_FORCE = 0.2;
  private SPEED = 3;
  private JUMP_FORCE = 9;

  private velocityX = 0;
  private velocityY = 0;

  private view;

  private movement = {
    x: 0,
    y: 0,
  };
  private directionContext = {
    left: 0,
    right: 0,
  };

  private state = STATES.stay;
  constructor(stage: Container) {
    this.view = new HeroView();
    stage.addChild(this.view);
  }

  get collisionBox() {
    return this.view.collisionBox;
  }

  get x() {
    return this.view.x;
  }

  set x(x: number) {
    this.view.x = x;
  }

  get y() {
    return this.view.y;
  }

  set y(y: number) {
    this.view.y = y;
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

  stay(platformY: number) {
    this.velocityY = 0;
    this.state = STATES.stay;

    this.y = platformY - this.view.collisionBox.height;
  }

  jump() {
    if (this.state === STATES.jump || this.state === STATES.flyDown) return;
    this.state = STATES.jump;
    this.velocityY -= this.JUMP_FORCE;
  }

  isJumpState() {
    return this.state === STATES.jump;
  }

  throwDown() {
    this.state = STATES.jump;
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
}
