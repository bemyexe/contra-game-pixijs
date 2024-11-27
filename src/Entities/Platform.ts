import { Container, Graphics } from 'pixi.js';

export default class Platform extends Container {
  constructor() {
    super();
    const view = new Graphics();
    view.rect(0, 0, 200, 30);
    view.stroke(0x00ff00);
    this.addChild(view);
  }
}
