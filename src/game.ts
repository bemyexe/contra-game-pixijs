import {Application} from "pixi.js";
import Hero from "./Entities/Hero/Hero";
import Platform from "./Entities/Platforms/Platform";
import PlatformFactory from "./Entities/Platforms/PlatformFactory";
import KeyboardProcessor from "./KeyboardProcessor";
import Camera, {CameraSettings} from "./Camera";
import BulletFactory from "./Entities/Bullets/BulletFactory";
import Runner from "./Entities/Enemies/Runner/Runner";
import HeroFactory from "./Entities/Hero/HeroFactory";
import Physics from "./Physics";
import Weapon from "./Weapon";
import World from "./World";
import EnemiesFactory from "./Entities/Enemies/EnemiesFactory";
import SceneFactory from "./SceneFactory";
import AssetsFactory from "./AssetsFactory";

export default class Game {
  private app;
  private hero;
  private platforms: Platform[] = [];
  private entities: any = [];
  private camera;
  private bulletFactory;
  private worldContainer: World;
  private weapon;

  public keyboardProcessor;

  constructor(app: Application, assets: AssetsFactory) {
    this.app = app;

    this.worldContainer = new World();
    this.app.stage.addChild(this.worldContainer);

    this.bulletFactory = new BulletFactory(
      this.worldContainer.game,
      this.entities
    );

    const heroFactory = new HeroFactory(this.worldContainer.game, assets);
    this.hero = heroFactory.create(160, 100);

    this.entities.push(this.hero);

    const enemyFactory = new EnemiesFactory(
      this.worldContainer.game,
      this.hero,
      this.bulletFactory,
      this.entities
    );

    const platformFactory = new PlatformFactory(this.worldContainer);

    const sceneFactory = new SceneFactory(
      this.platforms,
      this.entities,
      platformFactory,
      enemyFactory,
      this.hero
    );
    sceneFactory.createScene();

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

    this.weapon = new Weapon(this.bulletFactory);
    this.weapon.setWeapon(2);
  }

  public update() {
    for (let i = 0; i < this.entities.length; i++) {
      const entity: any = this.entities[i];
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
      if (Physics.isCheckAABB(damager.hitBox, entity.hitBox)) {
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
      if (
        (character.isJumpState() && platform.type !== "box") ||
        !platform.isActive
      )
        continue;
      this.checkPlatformCollision(character, platform);
    }

    if (character.type === "hero" && character.x < -this.worldContainer.x) {
      character.x = character.prevPoint.x;
    }
  }

  public checkPlatformCollision(character: Hero | Runner, platform: Platform) {
    const prevPoint = character.prevPoint;
    const collisionResult = Physics.getOrientCollisionResult(
      character.collisionBox,
      platform.collisionBox,
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

  public setKeys() {
    this.keyboardProcessor.getButton("KeyA").executeDown = () => {
      if (!this.hero.isDead && !this.hero.isFall) {
        this.weapon.fire(this.hero.bulletContext);
        this.hero.setView(this.getArrowButtonContext());
      }
    };
    this.keyboardProcessor.getButton("KeyA").executeUp = () => {
      if (!this.hero.isDead && !this.hero.isFall) {
        this.hero.setView(this.getArrowButtonContext());
      }
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

  private checkEntityStatus(entity: any, index: number) {
    if (entity.isDead || this.isScreenOut(entity)) {
      entity.removeFromStage();
      this.entities.splice(index, 1);
    }
  }

  private isScreenOut(entity: any) {
    if (entity.type === "heroBullet" || entity.type === "enemyBullet") {
      return (
        entity.x > this.app.screen.width - this.worldContainer.x ||
        entity.x < -this.worldContainer.x ||
        entity.y > this.app.screen.height ||
        entity.y < 0
      );
    } else if (entity.type === "enemy" || entity.type === "hero") {
      return (
        entity.x < -this.worldContainer.x || entity.y > this.app.screen.height
      );
    }
  }
}
