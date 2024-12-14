import {AnimatedSprite, Container, Graphics, Sprite} from 'pixi.js';
import AssetsFactory from '../../AssetsFactory';

export default class HeroView extends Container {
  private bounds = {
    width: 0,
    height: 0,
  };

  private collision = {x: 0, y: 0, width: 0, height: 0};

  private hitBoxx = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    shiftX: 0,
    shiftY: 0,
  };

  private stm = {
    currentState: 'default',
    states: {} as {[key: string]: Sprite | Container},
  };

  private bulletPointsShiftField = {x: 0, y: 0};

  private rootNode!: Container;
  private assets;
  constructor(assets: AssetsFactory) {
    super();

    this.assets = assets;

    this.createNodeStructure();
    this.rootNode.pivot.x = 10;
    this.rootNode.x = 10;
    this.bounds.width = 20;
    this.bounds.height = 90;
    this.collision.width = this.bounds.width;
    this.collision.height = this.bounds.height;

    this.stm.states.stay = this.getStayImage();
    this.stm.states.stayUp = this.getStayUpImage();
    this.stm.states.run = this.getRunImage();
    this.stm.states.runShoot = this.getRunShootImage();
    this.stm.states.runUp = this.getRunUpImage();
    this.stm.states.runDown = this.getRunDownImage();
    this.stm.states.lay = this.getLayImage();
    this.stm.states.jump = this.getJumpImage();
    this.stm.states.fall = this.getFallImage();

    for (let key in this.stm.states) {
      this.rootNode.addChild(this.stm.states[key]);
    }
  }

  private toState(key: string) {
    if (this.stm.currentState === key) return;

    for (let key in this.stm.states) {
      this.stm.states[key].visible = false;
    }

    this.stm.states[key].visible = true;

    this.stm.currentState = key;
  }

  get hitBox() {
    this.hitBoxx.x = this.x + this.hitBoxx.shiftX;
    this.hitBoxx.y = this.y + this.hitBoxx.shiftY;
    return this.hitBoxx;
  }

  get collisionBox() {
    this.collision.x = this.x;
    this.collision.y = this.y;
    return this.collision;
  }

  get isFliped() {
    return this.rootNode.scale.x < 0;
  }

  get bulletPointsShift() {
    return this.bulletPointsShiftField;
  }

  public reset() {
    this.rootNode.visible = true;
    this.collision.width = this.bounds.width;
    this.collision.height = this.bounds.height;
  }

  public showAndGetDeadAnimation() {
    this.rootNode.visible = false;
    this.collision.width = 0;
    this.collision.height = 0;

    const explosion = new AnimatedSprite(
      this.assets.getAnimationTextures('explosion')
    );
    explosion.animationSpeed = 0.2;
    explosion.x = -explosion.width / 2;
    explosion.loop = false;
    explosion.play();
    this.addChild(explosion);
    return explosion;
  }

  private setBulletPointsShift(x: number, y: number) {
    this.bulletPointsShiftField.x =
      (x + this.rootNode.pivot.x * this.rootNode.scale.x) *
      this.rootNode.scale.x;
    this.bulletPointsShiftField.y = y;
  }
  public showStay() {
    this.toState('stay');
    this.setBulletPointsShift(50, 29);

    this.hitBox.width = 20;
    this.hitBox.height = 90;
    this.hitBox.shiftX = 0;
    this.hitBox.shiftY = 0;
  }

  public showRun() {
    this.toState('run');
    this.setBulletPointsShift(65, 30);

    this.hitBox.width = 20;
    this.hitBox.height = 90;
    this.hitBox.shiftX = 0;
    this.hitBox.shiftY = 0;
  }

  public showRunShoot() {
    this.toState('runShoot');
    this.setBulletPointsShift(50, 29);

    this.hitBox.width = 20;
    this.hitBox.height = 90;
    this.hitBox.shiftX = 0;
    this.hitBox.shiftY = 0;
  }

  public showJump() {
    this.toState('jump');
    this.setBulletPointsShift(-2, 40);

    this.hitBox.width = 40;
    this.hitBox.height = 40;
    this.hitBox.shiftX = -10;
    this.hitBox.shiftY = 25;
  }

  public showFall() {
    this.toState('fall');

    this.hitBox.width = 20;
    this.hitBox.height = 90;
    this.hitBox.shiftX = 0;
    this.hitBox.shiftY = 0;
  }

  public showLay() {
    this.toState('lay');
    this.setBulletPointsShift(50, 70);

    this.hitBox.width = 90;
    this.hitBox.height = 20;
    this.hitBox.shiftX = -45;
    this.hitBox.shiftY = 70;
  }

  public showStayUp() {
    this.toState('stayUp');
    this.setBulletPointsShift(18, -30);

    this.hitBox.width = 20;
    this.hitBox.height = 90;
    this.hitBox.shiftX = 0;
    this.hitBox.shiftY = 0;
  }

  public showRunUp() {
    this.toState('runUp');
    this.setBulletPointsShift(40, 0);

    this.hitBox.width = 20;
    this.hitBox.height = 90;
    this.hitBox.shiftX = 0;
    this.hitBox.shiftY = 0;
  }

  public showRunDown() {
    this.toState('runDown');
    this.setBulletPointsShift(47, 50);

    this.hitBox.width = 20;
    this.hitBox.height = 90;
    this.hitBox.shiftX = 0;
    this.hitBox.shiftY = 0;
  }

  public flip(direction: number) {
    switch (direction) {
      case 1:
      case -1:
        this.rootNode.scale.x = direction;
    }
  }

  private createNodeStructure() {
    const rootNode = new Container();
    this.addChild(rootNode);
    this.rootNode = rootNode;
  }

  private getStayImage() {
    // const view = new Graphics();
    // view.rect(0, 0, 20, 90);
    // view.rect(0, 30, 60, 10);
    // view.stroke(0xffff00);

    const view = new Sprite(this.assets.getTexture('stay0000'));

    return view;
  }

  private getStayUpImage() {
    // const view = new Graphics();
    // view.rect(0, 0, 20, 90);
    // view.rect(8, -40, 5, 40);
    // view.stroke(0xffff00);

    const view = new Sprite(this.assets.getTexture('stayup0000'));
    view.x += 2;
    view.y -= 31;

    return view;
  }

  private getRunImage() {
    // const view = new Graphics();
    // view.rect(0, 0, 20, 90);
    // view.rect(0, 30, 70, 5);
    // view.stroke(0xffff00);
    // view.skew.x = -0.1;

    const view = new AnimatedSprite(this.assets.getAnimationTextures('run'));
    view.animationSpeed = 0.1;
    view.play();
    view.y -= 3;

    return view;
  }

  private getRunShootImage() {
    const container = new Container();

    const upperPart = new Sprite(this.assets.getTexture('stay0000'));
    upperPart.x = 8;
    upperPart.y = 2;

    const upperPartMask = new Graphics();
    upperPartMask.rect(0, 0, 100, 45);
    upperPartMask.fill(0xffffff);

    upperPart.mask = upperPartMask;

    const bottomPart = new AnimatedSprite(
      this.assets.getAnimationTextures('run')
    );
    bottomPart.animationSpeed = 0.1;
    bottomPart.play();
    bottomPart.y -= 3;

    const bottomPartMask = new Graphics();
    bottomPartMask.rect(0, 45, 100, 45);
    bottomPartMask.fill(0xffffff);

    bottomPart.mask = bottomPartMask;

    container.addChild(upperPart);
    container.addChild(bottomPart);
    container.addChild(upperPartMask);
    container.addChild(bottomPartMask);

    return container;
  }

  private getRunUpImage() {
    // const view = new Graphics();
    // view.rect(0, 0, 20, 90);
    // view.lineTo(0, 30);
    // view.lineTo(40, -20);
    // view.lineTo(45, -15);
    // view.lineTo(0, 40);
    // view.stroke(0xffff00);
    // view.skew.x = -0.1;

    const view = new AnimatedSprite(this.assets.getAnimationTextures('runup'));
    view.animationSpeed = 0.1;
    view.play();
    view.y -= 3;

    return view;
  }

  private getRunDownImage() {
    // const view = new Graphics();
    // view.rect(0, 0, 20, 90);
    // view.lineTo(0, 20);
    // view.lineTo(40, 60);
    // view.lineTo(35, 65);
    // view.lineTo(0, 30);
    // view.stroke(0xffff00);
    // view.skew.x = -0.1;

    const view = new AnimatedSprite(
      this.assets.getAnimationTextures('rundown')
    );
    view.animationSpeed = 0.1;
    view.play();
    view.y -= 3;

    return view;
  }

  private getLayImage() {
    // const view = new Graphics();
    // view.rect(0, 0, 90, 20);
    // view.rect(90, 0, 40, 5);
    // view.stroke(0xffff00);
    // view.x -= 45;
    // view.y += 70;

    const view = new Sprite(this.assets.getTexture('lay0000'));
    view.x -= 25;
    view.y += 50;

    return view;
  }

  private getJumpImage() {
    // const view = new Graphics();
    // view.rect(0, 0, 40, 40);
    // view.stroke(0xffff00);
    // view.x -= 10;
    // view.y += 25;

    const view = new AnimatedSprite(this.assets.getAnimationTextures('jump'));
    view.animationSpeed = 0.1;
    view.play();
    view.y -= 3;
    view.x -= 10;

    return view;
  }

  private getFallImage() {
    // const view = new Graphics();
    // view.rect(0, 0, 20, 90);
    // view.rect(10, 20, 5, 60);
    // view.stroke(0xffff00);
    // view.skew.x = -0.1;

    const view = new Sprite(this.assets.getTexture('run0003'));

    return view;
  }
}
