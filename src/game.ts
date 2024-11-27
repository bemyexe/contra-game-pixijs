import { Application } from 'pixi.js';
import Hero from './Entities/Hero';
import Platform from './Entities/Platform';

export default class Game {
  private app;
  private hero;
  private platforms: Platform[] = [];
  constructor(app: Application) {
    this.app = app;

    this.hero = new Hero();
    this.hero.x = 100;
    this.hero.y = 250;
    this.app.stage.addChild(this.hero);

    const platform1 = new Platform();
    platform1.x = 50;
    platform1.y = 400;
    this.app.stage.addChild(platform1);

    const platform2 = new Platform();
    platform2.x = 200;
    platform2.y = 450;
    this.app.stage.addChild(platform2);

    const platform3 = new Platform();
    platform3.x = 350;
    platform3.y = 400;
    this.app.stage.addChild(platform3);

    this.platforms.push(platform1);
    this.platforms.push(platform2);
    this.platforms.push(platform3);
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

  onKeyDown(key: KeyboardEvent) {
    if (key.key === 'ArrowLeft') {
      this.hero.startLeftMove();
    }
    if (key.key === 'ArrowRight') {
      this.hero.startRightMove();
    }
  }

  onKeyUp(key: KeyboardEvent) {
    if (key.key === 'ArrowLeft') {
      this.hero.stopLeftMove();
    }
    if (key.key === 'ArrowRight') {
      this.hero.stopRightMove();
    }
  }
}
