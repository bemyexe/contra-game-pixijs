import Entity from '../Entity';

export default class SpreadGunPowerup extends Entity {
  private GRAVITY_FORCE = 0.2;
  private velocityX = 4;
  private velocityY = -5;

  public type = 'spreadgunpowerup';
  public powerupType = 2;

  private prevPointField = {
    x: 0,
    y: 0,
  };

  constructor(view: any) {
    super(view);
    this.gravitable = true;
  }

  get prevPoint() {
    return this.prevPointField;
  }

  public update() {
    this.prevPointField.x = this.x;
    this.prevPointField.y = this.y;

    this.velocityX -= 0.05;
    if (this.velocityX < 0) {
      this.velocityX = 0;
    }
    this.x += this.velocityX;

    this.velocityY += this.GRAVITY_FORCE;
    this.y += this.velocityY;
  }

  public stay(platformY: number) {
    this.velocityX = 0;
    this.velocityY = 0;

    this.y = platformY - this._view.collisionBox.height;
  }

  public isJumpState() {
    return false;
  }

  public damage() {
    this.dead();
  }
}
