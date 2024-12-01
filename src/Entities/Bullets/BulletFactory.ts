import {Container} from "pixi.js";
import Bullet from "./Bullet";
import BulletView from "./BulletView";

export default class BulletFactory {
  private worldContainer;
  constructor(worldContainer: Container) {
    this.worldContainer = worldContainer;
  }

  public createBullet(bulletContext: {[key: string]: number}) {
    const view = new BulletView();
    this.worldContainer.addChild(view);

    const bullet = new Bullet(view, bulletContext.angle);
    bullet.x = bulletContext.x;
    bullet.y = bulletContext.y;
    return bullet;
  }
}
