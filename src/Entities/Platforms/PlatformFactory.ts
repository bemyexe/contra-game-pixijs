import { Graphics, Sprite } from 'pixi.js';
import PlatformView from './PlatformView';
import Platform from './Platform';
import BridgePlatform from './BridgePlatform';
import World from '../../World';
import AssetsFactory from '../../AssetsFactory';

export default class PlatformFactory {
  private platformWidth = 128;
  private platformHeight = 24;
  private worldContainer;
  private assets;
  constructor(worldContainer: World, assets: AssetsFactory) {
    this.worldContainer = worldContainer;
    this.assets = assets;
  }
  public createPlatform(x: number, y: number) {
    const skin = this.getGroundPlatform();
    const view = new PlatformView(this.platformWidth, this.platformHeight);
    view.addChild(skin);
    const platform = new Platform(view);
    platform.x = x;
    platform.y = y;
    this.worldContainer.background.addChild(view);
    return platform;
  }
  public createBox(x: number, y: number) {
    const skin = this.getGroundPlatform();
    const view = new PlatformView(this.platformWidth, this.platformHeight);
    view.addChild(skin);
    const platform = new Platform(view);
    platform.x = x;
    platform.y = y;
    platform.type = 'box';
    this.worldContainer.background.addChild(view);
    return platform;
  }
  public createStepBox(x: number, y: number) {
    const box = this.createBox(x, y);
    box.isStep = true;
    return box;
  }
  public createWater(x: number, y: number) {
    const skin = new Graphics();

    skin.rect(0, -this.platformHeight, this.platformWidth, this.platformHeight);
    skin.fill(0x0000ff);

    const view = new PlatformView(this.platformWidth, this.platformHeight);
    view.addChild(skin);
    const platform = new Platform(view);
    platform.x = x;
    platform.y = y;
    platform.type = 'box';
    this.worldContainer.foreground.addChild(view);
    return platform;
  }
  public createBossWall(x: number, y: number) {
    // const skin = new Graphics();
    // skin.stroke(0x0000ff);

    // skin.rect(0, 0, this.platformWidth * 3, 600);
    // skin.fill(0x0b1e0f2);

    const skin = new Sprite(this.assets.getTexture('boss0000'));
    skin.scale.x = 1.5;
    skin.scale.y = 1.5;

    const view = new PlatformView(this.platformWidth * 3, 768);
    view.addChild(skin);

    const platform = new Platform(view);
    platform.x = x - 64;
    platform.y = y - 45;
    platform.type = 'box';
    this.worldContainer.background.addChild(view);

    return platform;
  }
  public createBridge(x: number, y: number) {
    // const skin = new Graphics();
    // skin.stroke(0x111111);

    // skin.rect(0, 0, this.platformWidth, this.platformHeight * 3);
    // skin.fill(0xffffff);

    const skin = new Sprite(this.assets.getTexture('bridge0000'));

    const view = new PlatformView(this.platformWidth, this.platformHeight);
    view.addChild(skin);
    const platform = new BridgePlatform(view);
    platform.x = x;
    platform.y = y;
    this.worldContainer.background.addChild(view);
    return platform;
  }

  private getGroundPlatform() {
    const grass = new Sprite(this.assets.getTexture('platform0000'));
    const ground = new Sprite(this.assets.getTexture('ground0000'));
    ground.y = grass.height - 1;
    const ground2 = new Sprite(this.assets.getTexture('ground0000'));
    ground2.y = grass.height * 2 - 2;
    const ground3 = new Sprite(this.assets.getTexture('ground0000'));
    ground3.y = grass.height * 3 - 4;

    grass.addChild(ground);
    grass.addChild(ground2);
    grass.addChild(ground3);

    return grass;
  }
}
