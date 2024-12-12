import {AnimatedSprite, Container} from 'pixi.js';
import AssetsFactory from '../../../AssetsFactory';

export default class BossView extends Container {
  private collision = {x: 0, y: 0, width: 0, height: 0};
  private view;
  private assets;

  constructor(assets: AssetsFactory) {
    super();
    this.assets = assets;
    const view = new AnimatedSprite(
      this.assets.getAnimationTextures('bossdoor')
    );
    view.animationSpeed = 0.1;
    view.scale.x = 1.4;
    view.scale.y = 1.4;
    view.play();

    this.addChild(view);
    this.view = view;

    this.collision.width = 64;
    this.collision.height = 82;
  }

  get collisionBox() {
    this.collision.x = this.x;
    this.collision.y = this.y;
    return this.collision;
  }

  get hitBox() {
    return this.collisionBox;
  }

  public showAndGetDeadAnimation() {
    this.view.visible = false;
    this.collisionBox.width = 0;
    this.collisionBox.height = 0;

    const explosion = this.createExplosion();
    const explosion2 = this.createExplosion();
    explosion2.y = -explosion.height;
    return explosion;
  }

  public showAdditionalExplosions() {
    const explosion = this.createExplosion();
    const explosion2 = this.createExplosion();
    const explosion3 = this.createExplosion();
    const explosion4 = this.createExplosion();

    explosion.x = 30;

    explosion2.x = 120;
    explosion2.y = 60;

    explosion3.x = 200;

    explosion4.x = -40;
    explosion4.y = 40;
  }

  private createExplosion() {
    const explosion = new AnimatedSprite(
      this.assets.getAnimationTextures('explosion')
    );
    explosion.animationSpeed = 0.2;

    explosion.scale.x = 2;
    explosion.scale.y = 2;
    explosion.loop = false;
    explosion.play();
    this.addChild(explosion);

    explosion.onComplete = () => {
      explosion.removeFromParent();
    };

    return explosion;
  }
}
