import { Container, Graphics } from 'pixi.js';

export default class Hero extends Container {
  private GRAVITY_FORCE = 0.1;
  private velocityX = 0;
  private velocityY = 0;
  constructor() {
    super();
    const view = new Graphics();
    view.rect(0, 0, 20, 60);
    view.stroke(0xff0000);
    this.addChild(view);
  }

  update() {
    this.velocityY += this.GRAVITY_FORCE;

    this.y += this.velocityY;
  }

  stay() {
    this.velocityY = 0;
  }
}
