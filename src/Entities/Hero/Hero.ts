import HeroWeaponUnit from "./HeroWeaponUnit";
import Entity from "../Entity";

const STATES = {stay: "stay", jump: "jump", flyDown: "flydown"};

export default class Hero extends Entity {
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
  private directionContext = {
    left: 0,
    right: 0,
  };

  private state = STATES.stay;

  private isLay = false;
  private isStayUp = false;
  public isFall = false;

  private heroWeaponUnit;

  public type = "hero";

  constructor(view: any) {
    super(view);

    this.heroWeaponUnit = new HeroWeaponUnit(this._view);

    this.state = STATES.jump;
    this._view.showJump();

    this.gravitable = true;
  }

  get bulletContext() {
    return this.heroWeaponUnit.bulletContext;
  }

  get prevPoint() {
    return this.prevPointField;
  }

  public update() {
    this.prevPointField.x = this.x;
    this.prevPointField.y = this.y;

    this.velocityX = this.movement.x * this.SPEED;
    this.x += this.velocityX;

    if (this.velocityY > 0) {
      if (!(this.state === STATES.jump || this.state === STATES.flyDown)) {
        this._view.showFall();
        this.isFall = true;
      }
      this.state = STATES.flyDown;
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
      fakeButtonContext.arrowDown = this.isLay;
      fakeButtonContext.arrowUp = this.isStayUp;
      this.state = STATES.stay;
      this.setView(fakeButtonContext);
      this.isFall = false;
    }
    this.velocityY = 0;
    this.state = STATES.stay;

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

  public throwDown() {
    this.state = STATES.jump;
    this._view.showFall();
    this.isFall = true;
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
    this._view.flip(this.movement.x);

    this.heroWeaponUnit.setBulletAngle(buttonContext, this.isJumpState());

    if (this.isJumpState() || this.state === STATES.flyDown) return;

    if (buttonContext.arrowLeft || buttonContext.arrowRight) {
      if (buttonContext.arrowUp) {
        this._view.showRunUp();
      } else if (buttonContext.arrowDown) {
        this._view.showRunDown();
      } else {
        this._view.showRun();
      }
    } else {
      if (buttonContext.arrowUp) {
        this._view.showStayUp();
      } else if (buttonContext.arrowDown) {
        this._view.showLay();
      } else {
        this._view.showStay();
      }
    }
  }
}
