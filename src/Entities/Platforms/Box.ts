import {Container, Graphics} from "pixi.js";

export default class Box extends Container {
  public type = "box";
  public isStep = false;

  constructor() {
    super();
    const view = new Graphics();
    view.rect(0, 0, 200, 30);
    view.lineTo(200, 30);
    view.stroke(0x00ff00);
    this.addChild(view);
  }
}
