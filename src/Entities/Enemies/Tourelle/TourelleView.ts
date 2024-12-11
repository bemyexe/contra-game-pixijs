import { Container, Graphics, Sprite } from 'pixi.js';
import AssetsFactory from '../../../AssetsFactory';

export default class TourelleView extends Container {
  private gunView;

  private collisionBox = { x: 0, y: 0, width: 0, height: 0 };
  private assets;

  constructor(assets: AssetsFactory) {
    super();
    this.assets = assets;
    // const view = new Graphics();

    // view.circle(0, 0, 50);
    // view.stroke(0xff0000);

    const view = new Sprite(this.assets.getTexture('tourelle0000'));
    view.scale.x = 1.4;
    view.scale.y = 1.4;
    view.x -= view.width / 2;
    view.y -= view.height / 2;

    this.addChild(view);

    // this.gunView = new Graphics();

    // this.gunView.rect(0, 0, 70, 10);
    // this.gunView.stroke(0xff0000);

    this.gunView = new Sprite(this.assets.getTexture('tourellegun0000'));

    this.gunView.pivot.x = 22;
    this.gunView.pivot.y = 19;
    this.gunView.x = view.width / 2 - 17;
    this.gunView.y = view.height / 2 - 15;

    this.collisionBox.width = 128;
    this.collisionBox.height = 128;

    view.addChild(this.gunView);
  }

  get gunRotation() {
    return this.gunView.rotation;
  }

  set gunRotation(value) {
    this.gunView.rotation = value;
  }

  get getCollisionBox() {
    this.collisionBox.x = this.x - this.collisionBox.width / 2;
    this.collisionBox.y = this.y - this.collisionBox.height / 2;
    return this.collisionBox;
  }

  get hitBox() {
    return this.getCollisionBox;
  }
}
