import {Container, Sprite} from 'pixi.js';
import AssetsFactory from '../../AssetsFactory';

export default class SpreadGunPowerupView extends Container {
  private collision = {x: 0, y: 0, width: 0, height: 0};

  constructor(assets: AssetsFactory) {
    super();

    const view = new Sprite(assets.getTexture('spreadgun0000'));
    this.addChild(view);

    this.collision.width = 50;
    this.collision.height = 20;
  }

  get collisionBox() {
    this.collision.x = this.x;
    this.collision.y = this.y;
    return this.collision;
  }

  get hitBox() {
    return this.collisionBox;
  }
}
