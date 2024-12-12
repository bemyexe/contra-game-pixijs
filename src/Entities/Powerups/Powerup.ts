import Entity from '../Entity';
import Hero from '../Hero/Hero';
import PowerupFactory from './PowerupFactory';

export default class Powerup extends Entity {
  private powerupFactory;
  private flyY;
  private target;
  private velocityX = 4;
  private velocityY = 50;

  public type = 'powerupBox';

  constructor(
    powerupFactory: PowerupFactory,
    view: any,
    flyY: number,
    target: Hero
  ) {
    super(view);

    this.powerupFactory = powerupFactory;
    this.flyY = flyY;
    this.target = target;
    this.isActive = false;
    this._view.visible = false;
  }

  get collisionBox() {
    return this._view.collisionBox;
  }

  get x() {
    return this._view.x;
  }

  set x(value: number) {
    this._view.x = value;
  }

  get y() {
    return this._view.y;
  }

  set y(value: number) {
    this._view.y = value;
  }

  public update() {
    if (!this.isActive) {
      if (this.x - this.target.x < -512 - this.collisionBox.width) {
        this.isActive = true;
        this._view.visible = true;
      }
      return;
    }

    this.x += this.velocityX;
    this.y = this.flyY + Math.sin(this.x * 0.02) * this.velocityY;
  }

  public damage() {
    if (this.isActive === false) {
      return;
    }

    this.powerupFactory.createSpreadGunPowerup(this.x, this.y);

    this.velocityX = 0;
    this.velocityY = 0;

    const deadAnimation = this._view.showAndGetDeadAnimation();

    deadAnimation.onComplete = () => {
      this.dead();
    };
  }
}
