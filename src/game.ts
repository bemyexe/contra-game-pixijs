import {Application, Container} from "pixi.js";
import Hero from "./Entities/Hero/Hero";
import Platform from "./Entities/Platforms/Platform";
import PlatformFactory from "./Entities/Platforms/PlatformFactory";
import KeyboardProcessor from "./KeyboardProcessor";
import Box from "./Entities/Platforms/Box";
import Camera, {CameraSettings} from "./Camera";
import BulletFactory from "./Entities/Bullets/BulletFactory";
import RunnerFactory from "./Entities/Enemies/Runner/RunnerFactory";
import Runner from "./Entities/Enemies/Runner/Runner";
import HeroFactory from "./Entities/Hero/HeroFactory";
import Physics from "./Physics";
import TourelleFactory from "./Entities/Enemies/Tourelle/TourelleFactory";

export default class Game {
  private app;
  private hero;
  private platforms: Platform[] & Box[] = [];
  private camera;
  private bulletFactory;
  private worldContainer: Container;
  private runnerFactory;
  private entities = [];

  public keyboardProcessor;
  constructor(app: Application) {
    this.app = app;

    this.worldContainer = new Container();
    this.app.stage.addChild(this.worldContainer);

    const heroFactory = new HeroFactory(this.worldContainer);

    this.hero = heroFactory.create(100, 100);

    this.entities.push(this.hero);

    const platformFactory = new PlatformFactory(this.worldContainer);

    this.platforms.push(platformFactory.createPlatform(100, 400));
    // this.platforms.push(platformFactory.createPlatform(300, 400));
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

    this.bulletFactory = new BulletFactory(this.worldContainer, this.entities);

    this.runnerFactory = new RunnerFactory(this.worldContainer);
    this.entities.push(this.runnerFactory.create(800, 150));
    this.entities.push(this.runnerFactory.create(900, 150));
    this.entities.push(this.runnerFactory.create(1200, 150));
    this.entities.push(this.runnerFactory.create(1600, 150));

    const tourelleFactory = new TourelleFactory(
      this.worldContainer,
      this.hero,
      this.bulletFactory
    );
    this.entities.push(tourelleFactory.create(500, 200));
  }

  public update() {
    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      entity.update();

      if (entity.type === "hero" || entity.type === "enemy") {
        this.checkDamage(entity);
        this.checkPlatforms(entity);
      }
      this.checkEntityStatus(entity, i);
    }
    this.camera.update();
  }

  private checkDamage(entity: any) {
    const damagers: any = this.entities.filter(
      (damager: any) =>
        (entity.type === "enemy" && damager.type === "heroBullet") ||
        (entity.type === "hero" &&
          (damager.type === "enemyBullet" || damager.type === "enemy"))
    );

    for (let damager of damagers) {
      if (Physics.isCheckAABB(damager.collisionBox, entity.collisionBox)) {
        entity.damage();
        if (damager.type !== "enemy") {
          damager.dead();
        }
        break;
      }
    }
  }

  private checkPlatforms(character: any) {
    if (character.isDead || !character.gravitable) return;

    for (let platform of this.platforms) {
      if (character.isJumpState() && platform.type !== "box") continue;
      this.checkPlatformCollision(character, platform);
    }
  }

  private checkEntityStatus(entity: any, index: number) {
    if (entity.isDead || this.isScreenOut(entity)) {
      entity.removeFromStage();
      this.entities.splice(index, 1);
    }
  }

  private isScreenOut(entity: any) {
    return (
      entity.x > this.app.screen.width - this.worldContainer.x ||
      entity.x < -this.worldContainer.x ||
      entity.y > this.app.screen.height ||
      entity.y < 0
    );
  }

  checkPlatformCollision(character: Hero | Runner, platform: Platform & Box) {
    const prevPoint = character.getPrevPoint;
    const collisionResult = Physics.getOrientCollisionResult(
      character.collisionBox,
      platform,
      prevPoint
    );

    if (collisionResult.vertical === true) {
      character.y = prevPoint.y;
      character.stay(platform.y);
    }

    if (collisionResult.horizontal === true && platform.type == "box") {
      if (platform.isStep) {
        character.stay(platform.y);
      } else {
        character.x = prevPoint.x;
      }
    }
  }

  setKeys() {
    this.keyboardProcessor.getButton("KeyA").executeDown = () => {
      this.bulletFactory.createBullet(this.hero.bulletContext);
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
