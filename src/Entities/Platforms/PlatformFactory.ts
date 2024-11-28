import { Application } from 'pixi.js';
import Platform from './Platform';

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
}
