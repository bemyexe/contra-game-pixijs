import BulletFactory from '../../Bullets/BulletFactory';
import Entity from '../../Entity';
import Hero from '../../Hero/Hero';

export default class Tourelle extends Entity {
  private target;
  private bulletFactory;
  private timeCounter = 0;
  private health = 5;
  public type = 'enemy';

  constructor(view: any, target: Hero, bulletFactory: BulletFactory) {
    super(view);

    this.target = target;
    this.bulletFactory = bulletFactory;
    this.isActive = false;
  }

  update() {
    if (this.target.isDead) return;

    if (!this.isActive) {
      if (this.x - this.target.x < 512 + this.collisionBox.width * 2) {
        this.isActive = true;
      }
      return;
    }

    let angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
    this._view.gunRotation = angle;
    this.fire(angle);
  }

  public damage() {
    this.health--;

    if (this.health < 1) {
      this.timeCounter = 0;
      const deadAnimation = this._view.showAndGetDeadAnimation();

      deadAnimation.onComplete = () => {
        this.dead();
      };
    }
  }

  private fire(angle: number) {
    this.timeCounter++;
    if (this.timeCounter < 100) return;
    const bulletContext: {[key: string]: any} = {};
    bulletContext.x = this.x;
    bulletContext.y = this.y;
    bulletContext.angle = (angle / Math.PI) * 180;
    bulletContext.type = 'enemyBullet';

    this.bulletFactory.createBullet(bulletContext);

    this.timeCounter = 0;
  }
}
