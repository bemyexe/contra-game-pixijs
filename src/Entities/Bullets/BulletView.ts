import {Container, Graphics} from "pixi.js";

export default class BulletView extends Container {
  private collisionBox = {x: 0, y: 0, width: 0, height: 0};

  constructor() {
    super();

    this.collisionBox.width = 5;
    this.collisionBox.height = 5;

    const view = new Graphics();
    view.rect(0, 0, 5, 5);
    view.stroke(0xffff00);
    this.addChild(view);
  }

  get getCollisionBox() {
    this.collisionBox.x = this.x;
    this.collisionBox.y = this.y;
    return this.collisionBox;
  }

  get hitBox() {
    return this.collisionBox;
  }
}
