import {Container} from "pixi.js";

export default class World extends Container {
  private backgroundField;
  private gameField;
  private foregroundField;
  constructor() {
    super();

    this.backgroundField = new Container();
    this.addChild(this.backgroundField);
    this.gameField = new Container();
    this.addChild(this.gameField);
    this.foregroundField = new Container();
    this.addChild(this.foregroundField);
  }
  get background() {
    return this.backgroundField;
  }
  get game() {
    return this.gameField;
  }
  get foreground() {
    return this.foregroundField;
  }
}
