import {Container, Graphics, Sprite} from 'pixi.js';
import AssetsFactory from './AssetsFactory';

export default class StaticBackground extends Container {
  constructor(
    screenSize: {width: number; height: number},
    assets: AssetsFactory
  ) {
    super();

    this.createMounts(assets, 600, 250, 1.3);
    this.createMounts(assets, 820, 230, 1.6);

    for (let i = 0; i < 300; i++) {
      const star = this.createStar();
      star.x = Math.random() * screenSize.width;
      star.y = Math.random() * screenSize.height;
    }

    const water = new Graphics();

    water.rect(
      0,
      screenSize.height / 2 + 130,
      screenSize.width,
      screenSize.height
    );
    water.fill(0x0072ec);
    this.addChild(water);
  }

  createStar() {
    const star = new Graphics();
    star.fill(0xdddddd);
    star.rect(0, 0, 2, 2);
    this.addChild(star);

    return star;
  }

  createMounts(assets: AssetsFactory, x: number, y: number, scale: number) {
    const mounts = new Sprite(assets.getTexture('mounts0000'));
    mounts.scale.x = scale;
    mounts.scale.y = scale;
    mounts.x = x;
    mounts.y = y;
    this.addChild(mounts);
  }
}
