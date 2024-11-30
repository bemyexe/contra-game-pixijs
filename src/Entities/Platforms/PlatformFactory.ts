import {Container} from "pixi.js";
import Platform from "./Platform";
import Box from "./Box";

export default class PlatformFactory {
  private worldContainer;

  constructor(worldContainer: Container) {
    this.worldContainer = worldContainer;
  }
  createPlatform(x: number, y: number) {
    const platform = new Platform();
    platform.x = x;
    platform.y = y;
    this.worldContainer.addChild(platform);
    return platform;
  }

  createBox(x: number, y: number) {
    const box = new Box();
    box.x = x;
    box.y = y;
    this.worldContainer.addChild(box);
    return box;
  }
}
