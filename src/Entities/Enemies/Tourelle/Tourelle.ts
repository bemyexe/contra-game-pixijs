import BulletFactory from "../../Bullets/BulletFactory";
import Entity from "../../Entity";
import Hero from "../../Hero/Hero";

export default class Tourelle extends Entity {
  private target;
  private bulletFactory;
  private timeCounter = 0;

  constructor(view: any, target: Hero, bulletFactory: BulletFactory) {
    super(view);

    this.target = target;
    this.bulletFactory = bulletFactory;
  }

  update() {
    if (this.target.isDead) return;
    let angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
    this._view.gunRotation = angle;
    this.fire(angle);
  }

  private fire(angle: number) {
    this.timeCounter++;
    if (this.timeCounter < 100) return;
    const bulletContext: {[key: string]: number & string} = {
      x: this.x,
      y: this.y,
      angle: (angle / Math.PI) * 180,
      type: "enemyBullet",
    };
    this.bulletFactory.createBullet(bulletContext);

    this.timeCounter = 0;
  }
}
