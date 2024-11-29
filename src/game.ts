import {Application} from "pixi.js";
import Hero from "./Entities/Hero/Hero";
import Platform from "./Entities/Platforms/Platform";
import PlatformFactory from "./Entities/Platforms/PlatformFactory";
import KeyboardProcessor from "./KeyboardProcessor";
import Box from "./Entities/Platforms/Box";

export default class Game {
  private app;
  private hero;
  private platforms: Platform[] & Box[] = [];

  public keyboardProcessor;
  constructor(app: Application) {
    this.app = app;

    this.hero = new Hero(this.app.stage);
    this.hero.x = 100;
    this.hero.y = 250;

    const platformFactory = new PlatformFactory(app);

    this.platforms.push(platformFactory.createPlatform(100, 400));
    this.platforms.push(platformFactory.createPlatform(300, 400));
    this.platforms.push(platformFactory.createPlatform(500, 400));
    this.platforms.push(platformFactory.createPlatform(700, 400));
    this.platforms.push(platformFactory.createPlatform(900, 400));
    this.platforms.push(platformFactory.createPlatform(300, 550));
    this.platforms.push(platformFactory.createBox(0, 738));
    this.platforms.push(platformFactory.createBox(200, 738));

    const box = platformFactory.createBox(400, 708);
    box.isStep = true;
    this.platforms.push(box);
    this.keyboardProcessor = new KeyboardProcessor(this);
    this.setKeys();
  }

  update() {
    const prevPoint: Pick<Hero | Platform, "x" | "y"> = {
      x: this.hero.x,
      y: this.hero.y,
    };

    this.hero.update();

    for (let i = 0; i < this.platforms.length; i++) {
      if (this.hero.isJumpState() && this.platforms[i].type !== "box") {
        continue;
      }

      const collisionResult = this.getPlatformCollisionResult(
        this.hero,
        this.platforms[i],
        prevPoint
      );
      if (collisionResult.vertical === true) {
        this.hero.stay(this.platforms[i].y);
      }
    }
  }

  getPlatformCollisionResult(
    character: Hero,
    platform: Platform & Box,
    prevPoint: Pick<Hero | Platform, "x" | "y">
  ) {
    const collisionResult = this.getOrientCollisionResult(
      character.collisionBox,
      platform,
      prevPoint
    );

    if (collisionResult.vertical === true) {
      character.y = prevPoint.y;
    }

    if (collisionResult.horizontal === true && platform.type == "box") {
      if (platform.isStep) {
        character.stay(platform.y);
      }
      character.x = prevPoint.x;
    }
    return collisionResult;
  }

  getOrientCollisionResult(
    aaRect: {x: number; y: number; width: number; height: number},
    bbRect: {x: number; y: number; width: number; height: number},
    aaPrevPoint: {x: number; y: number}
  ) {
    const collisionResult = {
      horizontal: false,
      vertical: false,
    };

    if (!this.isCheckAABB(aaRect, bbRect)) {
      return collisionResult;
    }

    aaRect.y = aaPrevPoint.y;
    if (!this.isCheckAABB(aaRect, bbRect)) {
      collisionResult.vertical = true;
      return collisionResult;
    }

    collisionResult.horizontal = true;
    return collisionResult;
  }

  isCheckAABB(
    entity: {x: number; y: number; width: number; height: number},
    area: {x: number; y: number; width: number; height: number}
  ) {
    return (
      entity.x < area.x + area.width &&
      entity.x + entity.width > area.x &&
      entity.y < area.y + area.height &&
      entity.y + entity.height > area.y
    );
  }

  setKeys() {
    this.keyboardProcessor.getButton("Space").executeDown = () => {
      if (this.keyboardProcessor.isButtonPressed("ArrowDown")) {
        this.hero.throwDown();
      } else {
        this.hero.jump();
      }
    };
    this.keyboardProcessor.getButton("ArrowLeft").executeDown = () => {
      this.hero.startLeftMove();
    };
    this.keyboardProcessor.getButton("ArrowRight").executeDown = () => {
      this.hero.startRightMove();
    };
    this.keyboardProcessor.getButton("ArrowLeft").executeUp = () => {
      this.hero.stopLeftMove();
    };
    this.keyboardProcessor.getButton("ArrowRight").executeUp = () => {
      this.hero.stopRightMove();
    };
  }
}
