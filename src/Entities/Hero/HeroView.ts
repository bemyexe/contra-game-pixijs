import {Container, Graphics} from "pixi.js";

export default class HeroView extends Container {
  private bounds = {
    width: 20,
    height: 90,
  };

  private collision = {x: 0, y: 0, width: 0, height: 0};
  constructor() {
    super();
    this.bounds.width = 20;
    this.bounds.height = 90;
    this.collision.width = this.bounds.width;
    this.collision.height = this.bounds.height;

    const view = new Graphics();
    view.rect(0, 0, 20, 90);
    view.rect(0, 30, 60, 10);
    view.stroke(0xffff00);
    this.addChild(view);

    view.pivot.x = 10;
    view.x = 10;
  }

  get collisionBox() {
    this.collision.x = this.x;
    this.collision.y = this.y;
    return this.collision;
  }

  getStayImage() {
    const view = new Graphics();
    view.rect(0, 0, 20, 90);
    view.rect(0, 30, 60, 10);
    view.stroke(0xffff00);
    return view;
  }
}
