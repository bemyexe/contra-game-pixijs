import {Container} from "pixi.js";
import Bullet from "./Bullet";
import BulletView from "./BulletView";

export default class BulletFactory {
  private worldContainer;
  private entities: any[] = [];
  constructor(worldContainer: Container, entities: any[]) {
    this.worldContainer = worldContainer;
    this.entities = entities;
  }

  public createBullet(bulletContext: {[key: string]: any}) {
    const view = new BulletView();
    this.worldContainer.addChild(view);

    const bullet = new Bullet(view, bulletContext.angle);
    bullet.x = bulletContext.x;
    bullet.y = bulletContext.y;
    bullet.type = bulletContext.type;

    this.entities.push(bullet);
  }
}
