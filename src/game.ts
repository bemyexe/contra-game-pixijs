import {Application, Container} from "pixi.js";
import Hero from "./Entities/Hero/Hero";
import Platform from "./Entities/Platforms/Platform";
import PlatformFactory from "./Entities/Platforms/PlatformFactory";
import KeyboardProcessor from "./KeyboardProcessor";
import Box from "./Entities/Platforms/Box";
import Camera, {CameraSettings} from "./Camera";
import BulletFactory from "./Entities/Bullets/BulletFactory";
import Bullet from "./Entities/Bullets/Bullet";

export default class Game {
  private app;
  private hero;
  private platforms: Platform[] & Box[] = [];
  private camera;
  private bulletFactory;
  private bullets: Bullet[] = [];
  private worldContainer: Container;

  public keyboardProcessor;
  constructor(app: Application) {
    this.app = app;

    this.worldContainer = new Container();
    this.app.stage.addChild(this.worldContainer);

    this.hero = new Hero(this.worldContainer);
    this.hero.x = 100;
    this.hero.y = 250;

    const platformFactory = new PlatformFactory(this.worldContainer);

    this.platforms.push(platformFactory.createPlatform(100, 400));
    this.platforms.push(platformFactory.createPlatform(300, 400));
    this.platforms.push(platformFactory.createPlatform(500, 400));
    this.platforms.push(platformFactory.createPlatform(700, 400));
    this.platforms.push(platformFactory.createPlatform(1100, 400));

    this.platforms.push(platformFactory.createPlatform(300, 550));

    this.platforms.push(platformFactory.createBox(0, 738));
    this.platforms.push(platformFactory.createBox(200, 738));

    const box = platformFactory.createBox(400, 708);
    box.isStep = true;
    this.platforms.push(box);
    this.keyboardProcessor = new KeyboardProcessor(this);
    this.setKeys();
    const cameraSettings: CameraSettings = {
      target: this.hero,
      world: this.worldContainer,
      screenSize: this.app.screen,
      maxWorldWidth: this.worldContainer.width,
      isBackScrollX: false,
    };
    this.camera = new Camera(cameraSettings);

    this.bulletFactory = new BulletFactory();
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

    this.camera.update();

    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update();
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
    this.keyboardProcessor.getButton("KeyA").executeDown = () => {
      const bullet = this.bulletFactory.createBullet(this.hero.x, this.hero.y);
      this.worldContainer.addChild(bullet);
      this.bullets.push(bullet);
    };

    this.keyboardProcessor.getButton("Space").executeDown = () => {
      if (
        this.keyboardProcessor.isButtonPressed("ArrowDown") &&
        !(
          this.keyboardProcessor.isButtonPressed("ArrowLeft") ||
          this.keyboardProcessor.isButtonPressed("ArrowRight")
        )
      ) {
        this.hero.throwDown();
      } else {
        this.hero.jump();
      }
    };

    const arrowLeft = this.keyboardProcessor.getButton("ArrowLeft");
    arrowLeft.executeDown = () => {
      this.hero.startLeftMove();
      this.hero.setView(this.getArrowButtonContext());
    };
    arrowLeft.executeUp = () => {
      this.hero.stopLeftMove();
      this.hero.setView(this.getArrowButtonContext());
    };

    const arrowRight = this.keyboardProcessor.getButton("ArrowRight");
    arrowRight.executeDown = () => {
      this.hero.startRightMove();
      this.hero.setView(this.getArrowButtonContext());
    };

    arrowRight.executeUp = () => {
      this.hero.stopRightMove();
      this.hero.setView(this.getArrowButtonContext());
    };

    const arrowUp = this.keyboardProcessor.getButton("ArrowUp");
    arrowUp.executeDown = () => {
      this.hero.setView(this.getArrowButtonContext());
    };
    arrowUp.executeUp = () => {
      this.hero.setView(this.getArrowButtonContext());
    };

    const arrowDown = this.keyboardProcessor.getButton("ArrowDown");
    arrowDown.executeDown = () => {
      this.hero.setView(this.getArrowButtonContext());
    };
    arrowDown.executeUp = () => {
      this.hero.setView(this.getArrowButtonContext());
    };
  }

  public getArrowButtonContext() {
    const buttonContext: {[key: string]: boolean} = {};
    buttonContext.arrowLeft =
      this.keyboardProcessor.isButtonPressed("ArrowLeft");
    buttonContext.arrowRight =
      this.keyboardProcessor.isButtonPressed("ArrowRight");
    buttonContext.arrowUp = this.keyboardProcessor.isButtonPressed("ArrowUp");
    buttonContext.arrowDown =
      this.keyboardProcessor.isButtonPressed("ArrowDown");
    buttonContext.shoot = this.keyboardProcessor.isButtonPressed("KeyA");
    return buttonContext;
  }
}
