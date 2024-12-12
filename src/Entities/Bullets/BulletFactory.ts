import {Container, Graphics} from 'pixi.js';
import Bullet from './Bullet';
import BulletView from './BulletView';
import GravitableBullet from './GravitableBullet';

export default class BulletFactory {
  private worldContainer;
  private entities: any[] = [];
  constructor(worldContainer: Container, entities: any[]) {
    this.worldContainer = worldContainer;
    this.entities = entities;
  }

  public createBullet(bulletContext: {[key: string]: any}) {
    const skin = new Graphics();
    skin.rect(0, 0, 5, 5);
    skin.fill(0xffffff);

    const view = new BulletView();
    view.addChild(skin);
    this.worldContainer.addChild(view);

    const bullet = new Bullet(view, bulletContext.angle);
    bullet.x = bulletContext.x;
    bullet.y = bulletContext.y;
    bullet.type = bulletContext.type;

    this.entities.push(bullet);
  }

  public createSpreadGunBullet(bulletContext: {[key: string]: any}) {
    const skin = new Graphics();
    skin.circle(0, 0, 6);
    skin.fill(0xff2222);
    skin.circle(-3, -3, 3);
    skin.fill(0xdddddd);

    const view = new BulletView();
    view.addChild(skin);
    this.worldContainer.addChild(view);

    const bullet = new Bullet(view, bulletContext.angle);
    bullet.x = bulletContext.x;
    bullet.y = bulletContext.y;
    bullet.type = bulletContext.type;
    bullet.speed = 7;

    this.entities.push(bullet);
  }

  public createBossBullet(bulletContext: {[key: string]: any}) {
    const skin = new Graphics();
    skin.circle(0, 0, 6);
    skin.fill(0xff2222);
    skin.circle(-3, -3, 3);
    skin.fill(0xdddddd);

    const view = new BulletView();
    view.addChild(skin);
    this.worldContainer.addChild(view);

    const bullet = new GravitableBullet(view);
    bullet.x = bulletContext.x;
    bullet.y = bulletContext.y;
    bullet.type = bulletContext.type;
    bullet.speed = Math.random() * -6 - 2;

    this.entities.push(bullet);
  }
}
