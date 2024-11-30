import Bullet from "./Bullet";

export default class BulletFactory {
  constructor() {}

  public createBullet(bulletContext: {[key: string]: number}) {
    const bullet = new Bullet(bulletContext.angle);
    bullet.x = bulletContext.x;
    bullet.y = bulletContext.y;
    return bullet;
  }
}
