import {Graphics} from "pixi.js";
import PlatformView from "./PlatformView";
import Platform from "./Platform";
import BridgePlatform from "./BridgePlatform";
import World from "../../World";

export default class PlatformFactory {
  private platformWidth = 128;
  private platformHeight = 24;
  private worldContainer;
  constructor(worldContainer: World) {
    this.worldContainer = worldContainer;
  }
  createPlatform(x: number, y: number) {
    const skin = new Graphics();
    skin.rect(0, 0, this.platformWidth, this.platformHeight);
    skin.fill(0x00ff00);
    skin.rect(
      0,
      this.platformHeight,
      this.platformWidth,
      this.platformHeight * 20
    );
    skin.fill(0x694216);
    skin.stroke(0x004220);
    const view = new PlatformView(this.platformWidth, this.platformHeight);
    view.addChild(skin);
    const platform = new Platform(view);
    platform.x = x;
    platform.y = y;
    this.worldContainer.background.addChild(view);
    return platform;
  }
  createBox(x: number, y: number) {
    const skin = new Graphics();

    skin.rect(0, 0, this.platformWidth, this.platformHeight);
    skin.fill(0x00ff00);

    skin.rect(
      0,
      this.platformHeight,
      this.platformWidth,
      this.platformHeight * 20
    );
    skin.fill(0x694216);
    skin.stroke(0x004220);
    const view = new PlatformView(this.platformWidth, this.platformHeight);
    view.addChild(skin);
    const platform = new Platform(view);
    platform.x = x;
    platform.y = y;
    platform.type = "box";
    this.worldContainer.background.addChild(view);
    return platform;
  }
  createStepBox(x: number, y: number) {
    const box = this.createBox(x, y);
    box.isStep = true;
    return box;
  }
  createWater(x: number, y: number) {
    const skin = new Graphics();

    skin.rect(0, -this.platformHeight, this.platformWidth, this.platformHeight);
    skin.fill(0x0000ff);
    const view = new PlatformView(this.platformWidth, this.platformHeight);
    view.addChild(skin);
    const platform = new Platform(view);
    platform.x = x;
    platform.y = y;
    platform.type = "box";
    this.worldContainer.foreground.addChild(view);
    return platform;
  }
  createBossWall(x: number, y: number) {
    const skin = new Graphics();
    skin.stroke(0x0000ff);

    skin.rect(0, 0, this.platformWidth * 3, 600);
    skin.fill(0x0b1e0f2);

    const view = new PlatformView(this.platformWidth * 3, 768);
    view.addChild(skin);
    const platform = new Platform(view);
    platform.x = x;
    platform.y = y;
    platform.type = "box";
    this.worldContainer.background.addChild(view);
    return platform;
  }
  createBridge(x: number, y: number) {
    const skin = new Graphics();
    skin.stroke(0x111111);

    skin.rect(0, 0, this.platformWidth, this.platformHeight * 3);
    skin.fill(0xffffff);
    const view = new PlatformView(this.platformWidth, this.platformHeight);
    view.addChild(skin);
    const platform = new BridgePlatform(view);
    platform.x = x;
    platform.y = y;
    this.worldContainer.background.addChild(view);
    return platform;
  }
}
