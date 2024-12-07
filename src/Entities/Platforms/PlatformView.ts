import {Container} from "pixi.js";

export default class PlatformView extends Container {
  private collisionBoxField = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  constructor(width: number, height: number) {
    super();
    this.collisionBoxField.width = width;
    this.collisionBoxField.height = height;
  }
  get collisionBox() {
    this.collisionBoxField.x = this.x;
    this.collisionBoxField.y = this.y;
    return this.collisionBoxField;
  }
}
