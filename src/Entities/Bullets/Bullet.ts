import {Container, Graphics} from "pixi.js";

export default class Bullet extends Container {
  private SPEED = 10;
  constructor() {
    super();
    const view = new Graphics();
    view.rect(0, 0, 5, 5);
    view.stroke(0xffff00);
    this.addChild(view);
  }

  update() {
    this.x += this.SPEED;
  }
}
