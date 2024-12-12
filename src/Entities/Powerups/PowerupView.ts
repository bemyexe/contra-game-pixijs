import {AnimatedSprite, Container, Sprite} from 'pixi.js';
import AssetsFactory from '../../AssetsFactory';

export default class PowerupView extends Container {
  private collision = {x: 0, y: 0, width: 0, height: 0};
  private view;
  private assets;

  constructor(assets: AssetsFactory) {
    super();
    this.assets = assets;
    this.view = new Sprite(this.assets.getTexture('powerup0000'));
    this.addChild(this.view);

    this.collision.width = 50;
    this.collision.height = 20;
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

    const explosion = new AnimatedSprite(
      this.assets.getAnimationTextures('explosion')
    );
    explosion.animationSpeed = 0.2;

    explosion.y = -explosion.height / 2;
    explosion.loop = false;
    explosion.play();
    this.addChild(explosion);
    return explosion;
  }
}
