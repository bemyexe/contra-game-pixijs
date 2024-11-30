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

  private isLay = false;
  private isStayUp = false;
  public isFall = false;

  private bulletContextField: {[key: string]: number} = {x: 0, y: 0, angle: 0};
  private bulletAngle: number = 0;
  constructor(stage: Container) {
    this.view = new HeroView();
    stage.addChild(this.view);

    this.state = STATES.jump;
    this.view.showJump();
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

  get bulletContext() {
    this.bulletContextField.x = this.x + this.view.bulletPointsShift.x;
    this.bulletContextField.y = this.y + this.view.bulletPointsShift.y;
    this.bulletContextField.angle = this.view.isFliped
      ? this.bulletAngle * -1 + 180
      : this.bulletAngle;
    return this.bulletContextField;
  }

  public update() {
    this.velocityX = this.movement.x * this.SPEED;
    this.x += this.velocityX;

    if (this.velocityY > 0) {
      if (!(this.state === STATES.jump || this.state === STATES.flyDown)) {
        this.view.showFall();
      }
      this.state = STATES.flyDown;
    }

    this.velocityY += this.GRAVITY_FORCE;
    this.y += this.velocityY;
  }

  public stay(platformY: number) {
    if (this.state === STATES.jump || this.state === STATES.flyDown) {
      const fakeButtonContext: {[key: string]: boolean} = {};
      fakeButtonContext.arrowLeft = this.movement.x == -1;
      fakeButtonContext.arrowRight = this.movement.x == 1;
      fakeButtonContext.arrowDown = this.isLay;
      fakeButtonContext.arrowUp = this.isStayUp;
      this.state = STATES.stay;
      this.setView(fakeButtonContext);
      this.isFall = false;
    }
    this.velocityY = 0;
    this.state = STATES.stay;

    this.y = platformY - this.view.collisionBox.height;
  }

  public jump() {
    if (this.state === STATES.jump || this.state === STATES.flyDown) return;
    this.state = STATES.jump;
    this.velocityY -= this.JUMP_FORCE;
    this.view.showJump();
  }

  public isJumpState() {
    return this.state === STATES.jump;
  }

  public throwDown() {
    this.state = STATES.jump;
    this.view.showFall();
  }

  public startLeftMove() {
    this.directionContext.left = -1;

    if (this.directionContext.right > 0) {
      this.movement.x = 0;
      return;
    }
    this.movement.x = -1;
  }

  public startRightMove() {
    this.directionContext.right = 1;

    if (this.directionContext.left < 0) {
      this.movement.x = 0;
      return;
    }
    this.movement.x = 1;
  }
  public stopLeftMove() {
    this.directionContext.left = 0;
    this.movement.x = this.directionContext.right;
  }
  public stopRightMove() {
    this.directionContext.right = 0;
    this.movement.x = this.directionContext.left;
  }

  public setView(buttonContext: {[key: string]: boolean}) {
    this.view.flip(this.movement.x);

    this.setBulletAngle(buttonContext);

    if (this.state === STATES.jump || this.state === STATES.flyDown) return;

    if (buttonContext.arrowLeft || buttonContext.arrowRight) {
      if (buttonContext.arrowUp) {
        this.view.showRunUp();
      } else if (buttonContext.arrowDown) {
        this.view.showRunDown();
      } else {
        this.view.showRun();
      }
    } else {
      if (buttonContext.arrowUp) {
        this.view.showStayUp();
      } else if (buttonContext.arrowDown) {
        this.view.showLay();
      } else {
        this.view.showStay();
      }
    }
  }

  private setBulletAngle(buttonContext: {[key: string]: boolean}) {
    if (buttonContext.arrowLeft || buttonContext.arrowRight) {
      if (buttonContext.arrowUp) {
        this.bulletAngle = -45;
      } else if (buttonContext.arrowDown) {
        this.bulletAngle = 45;
      } else {
        this.bulletAngle = 0;
      }
    } else {
      if (buttonContext.arrowUp) {
        this.bulletAngle = -90;
      } else if (buttonContext.arrowDown && this.state === STATES.jump) {
        this.bulletAngle = 90;
      } else {
        this.bulletAngle = 0;
      }
    }
  }
}
