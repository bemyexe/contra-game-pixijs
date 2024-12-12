import BulletFactory from '../../Bullets/BulletFactory';
import Entity from '../../Entity';
import Hero from '../../Hero/Hero';

export default class BossGun extends Entity {
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

    this.fire();
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

  private fire() {
    this.timeCounter++;
    if (this.timeCounter < 100 && Math.random() > 0.01) return;
    const bulletContext: {[key: string]: any} = {};
    bulletContext.x = this.x;
    bulletContext.y = this.y;
    bulletContext.angle = 180;
    bulletContext.type = 'enemyBullet';

    this.bulletFactory.createBossBullet(bulletContext);

    this.timeCounter = 0;
  }
}
