import { Application } from 'pixi.js';
import Hero from './Entities/Hero';
import Platform from './Entities/Platforms/Platform';
import PlatformFactory from './Entities/Platforms/PlatformFactory';
import KeyboardProcessor from './KeyboardProcessor';

export default class Game {
  private app;
  private hero;
  private platforms: Platform[] = [];

  public keyboardProcessor;
  constructor(app: Application) {
    this.app = app;

    this.hero = new Hero();
    this.hero.x = 100;
    this.hero.y = 250;
    this.app.stage.addChild(this.hero);

    const platformFactory = new PlatformFactory(app);

    const platform1 = platformFactory.createPlatform(50, 400);
    const platform2 = platformFactory.createPlatform(200, 450);
    const platform3 = platformFactory.createPlatform(350, 400);

    this.platforms.push(platform1);
    this.platforms.push(platform2);
    this.platforms.push(platform3);

    this.keyboardProcessor = new KeyboardProcessor(this);
    this.keyboardProcessor.getButton('ArrowLeft').executeDown = () => {
      this.hero.startLeftMove();
    };
    this.keyboardProcessor.getButton('ArrowRight').executeDown = () => {
      this.hero.startRightMove();
    };
    this.keyboardProcessor.getButton('ArrowUp').executeDown = () => {
      this.hero.jump();
    };
    this.keyboardProcessor.getButton('ArrowLeft').executeUp = () => {
      this.hero.stopLeftMove();
    };
    this.keyboardProcessor.getButton('ArrowRight').executeUp = () => {
      this.hero.stopRightMove();
    };
  }

  update() {
    const prevPoint = {
      x: this.hero.x,
      y: this.hero.y,
    };

    this.hero.update();

    for (let i = 0; i < this.platforms.length; i++) {
      if (!this.isCheckAABB(this.hero, this.platforms[i])) {
        continue;
      }

      const currY = this.hero.y;
      this.hero.y = prevPoint.y;

      if (!this.isCheckAABB(this.hero, this.platforms[i])) {
        this.hero.stay();
        continue;
      }
      this.hero.y = currY;
      this.hero.x = prevPoint.x;
    }
  }

  isCheckAABB(entity: Hero, area: Platform) {
    return (
      entity.x < area.x + area.width &&
      entity.x + entity.width > area.x &&
      entity.y < area.y + area.height &&
      entity.y + entity.height > area.y
    );
  }
}
