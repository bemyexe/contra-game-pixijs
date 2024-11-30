import Bullet from "./Bullet";

export default class BulletFactory {
  constructor() {}

  public createBullet(x: number, y: number) {
    const bullet = new Bullet();
    bullet.x = x;
    bullet.y = y;
    return bullet;
  }
}
