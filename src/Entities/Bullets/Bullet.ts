import {Container, Graphics} from "pixi.js";

export default class Bullet extends Container {
  private SPEED = 10;
  bulletAngle;
  constructor(bulletAngle: number) {
    super();

    this.bulletAngle = bulletAngle * (Math.PI / 180);

    const view = new Graphics();
    view.rect(0, 0, 5, 5);
    view.stroke(0xffff00);
    this.addChild(view);
  }

  update() {
    this.x += this.SPEED * Math.cos(this.bulletAngle);
    this.y += this.SPEED * Math.sin(this.bulletAngle);
  }
}
