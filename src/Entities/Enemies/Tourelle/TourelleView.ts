import {Container, Graphics} from "pixi.js";

export default class TourelleView extends Container {
  private gunView;

  constructor() {
    super();

    const view = new Graphics();

    view.circle(0, 0, 50);
    view.stroke(0xff0000);

    this.addChild(view);

    this.gunView = new Graphics();

    this.gunView.rect(0, 0, 70, 10);
    this.gunView.stroke(0xff0000);
    this.gunView.pivot.x = 5;
    this.gunView.pivot.y = 5;
    this.gunView.x = 0;
    this.gunView.y = 0;

    this.addChild(this.gunView);
  }

  get gunRotation() {
    return this.gunView.rotation;
  }

  set gunRotation(value) {
    this.gunView.rotation = value;
  }
}
