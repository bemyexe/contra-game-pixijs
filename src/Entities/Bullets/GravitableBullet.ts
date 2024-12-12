import Entity from '../Entity';

export default class GravitableBullet extends Entity {
  public isForbiddenHorizontalCollision;

  private prevPointField = {
    x: 0,
    y: 0,
  };

  private velocityY = 0;
  private GRAVITY_FORCE = 0.2;
  public speed = 0;

  public type = 'enemyBullet';

  constructor(view: any) {
    super(view);

    this.gravitable = true;
    this.isForbiddenHorizontalCollision = true;
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
    this.prevPointField.x = this.x;
    this.prevPointField.y = this.y;

    this.x += this.speed;

    this.velocityY += this.GRAVITY_FORCE;
    this.y += this.velocityY;
  }

  public stay() {
    this.dead();
  }

  public isJumpState() {
    return false;
  }
}
