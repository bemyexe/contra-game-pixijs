import Entity from "../../Entity";
import Hero from "../../Hero/Hero";

const STATES = {stay: "stay", jump: "jump", flyDown: "flydown"};

export default class Runner extends Entity {
  private GRAVITY_FORCE = 0.2;
  private SPEED = 3;
  private JUMP_FORCE = 9;

  private velocityX = 0;
  private velocityY = 0;

  private prevPointField = {
    x: 0,
    y: 0,
  };

  private movement = {
    x: 0,
    y: 0,
  };
  private target;
  private state = STATES.stay;

  public jumpBehaviorKoef = 0.4;

  public type = "enemy";

  constructor(view: any, target: Hero) {
    super(view);

    this.target = target;

    this.state = STATES.jump;
    this._view.showJump();

    this.movement.x = -1;

    this.gravitable = true;
    this.isActive = false;
  }

  get collisionBox() {
    return this._view.collisionBox;
  }

  get x() {
    return this._view.x;
  }

  set x(x: number) {
    this._view.x = x;
  }

  get y() {
    return this._view.y;
  }

  set y(y: number) {
    this._view.y = y;
  }

  get prevPoint() {
    return this.prevPointField;
  }

  public update() {
    if (!this.isActive) {
      if (this.x - this.target.x < 512 + this.collisionBox.width * 2) {
        this.isActive = true;
      }
      return;
    }

    this.prevPointField.x = this.x;
    this.prevPointField.y = this.y;

    this.velocityX = this.movement.x * this.SPEED;
    this.x += this.velocityX;

    if (this.velocityY > 0) {
      if (!(this.state === STATES.jump || this.state === STATES.flyDown)) {
        if (Math.random() > this.jumpBehaviorKoef) {
          this._view.showFall();
        } else {
          this.jump();
        }
      }
      if (this.velocityY > 0) {
        this.state = STATES.flyDown;
      }
    }

    this.velocityY += this.GRAVITY_FORCE;
    this.y += this.velocityY;
  }

  public damage() {
    this.dead();
  }

  public stay(platformY: number) {
    if (this.state === STATES.jump || this.state === STATES.flyDown) {
      const fakeButtonContext: {[key: string]: boolean} = {};
      fakeButtonContext.arrowLeft = this.movement.x == -1;
      fakeButtonContext.arrowRight = this.movement.x == 1;
      this.state = STATES.stay;
      this.setView(fakeButtonContext);
    }
    this.state = STATES.stay;
    this.velocityY = 0;

    this.y = platformY - this._view.collisionBox.height;
  }

  public jump() {
    if (this.state === STATES.jump || this.state === STATES.flyDown) return;
    this.state = STATES.jump;
    this.velocityY -= this.JUMP_FORCE;
    this._view.showJump();
  }

  public isJumpState() {
    return this.state === STATES.jump;
  }

  public setView(buttonContext: {[key: string]: boolean}) {
    this._view.flip(this.movement.x);

    if (this.isJumpState() || this.state === STATES.flyDown) return;

    if (buttonContext.arrowLeft || buttonContext.arrowRight) {
      this._view.showRun();
    }
  }

  public removeFromParent() {
    if (this._view.parent !== null) {
      this._view.removeFromParent();
    }
  }
}
