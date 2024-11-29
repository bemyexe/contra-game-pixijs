import {Application} from "pixi.js";
import Platform from "./Platform";
import Box from "./Box";

export default class PlatformFactory {
  private app;

  constructor(app: Application) {
    this.app = app;
  }
  createPlatform(x: number, y: number) {
    const platform = new Platform();
    platform.x = x;
    platform.y = y;
    this.app.stage.addChild(platform);
    return platform;
  }

  createBox(x: number, y: number) {
    const box = new Box();
    box.x = x;
    box.y = y;
    this.app.stage.addChild(box);
    return box;
  }
}
