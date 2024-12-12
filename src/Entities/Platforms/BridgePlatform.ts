import {AnimatedSprite} from 'pixi.js';
import Hero from '../Hero/Hero';
import Platform from './Platform';
import PlatformView from './PlatformView';
import AssetsFactory from '../../AssetsFactory';

export default class BridgePlatform extends Platform {
  private target!: Hero;
  private assets;
  constructor(view: PlatformView, assets: AssetsFactory) {
    super(view);
    this.assets = assets;
  }
  setTarget(target: Hero) {
    this.target = target;
  }
  update() {
    if (this.target != null) {
      if (this.x - this.target.x < -50 && this.isActive) {
        this.isActive = false;
        const deadAnimation = this.showAndGetDeadAnimation();

        deadAnimation.onComplete = () => {
          this.dead();
        };
      }
      return;
    }
  }

  private showAndGetDeadAnimation() {
    const explosion = new AnimatedSprite(
      this.assets.getAnimationTextures('explosion')
    );
    explosion.animationSpeed = 0.2;
    explosion.scale.x = 1.5;
    explosion.scale.y = 1.5;
    explosion.x = -10;
    explosion.loop = false;
    explosion.play();
    this._view.addChild(explosion);
    return explosion;
  }
}
