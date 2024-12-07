import {Container, Graphics} from "pixi.js";

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
    currentState: "default",
    states: {} as {[key: string]: Graphics},
  };

  private bulletPointsShiftField = {x: 0, y: 0};

  private rootNode!: Container;
  constructor() {
    super();

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
  private setBulletPointsShift(x: number, y: number) {
    this.bulletPointsShiftField.x =
      (x + this.rootNode.pivot.x * this.rootNode.scale.x) *
      this.rootNode.scale.x;
    this.bulletPointsShiftField.y = y;
  }
  public showStay() {
    this.toState("stay");
    this.setBulletPointsShift(60, 30);

    this.hitBox.width = 20;
    this.hitBox.height = 90;
    this.hitBox.shiftX = 0;
    this.hitBox.shiftY = 0;
  }

  public showRun() {
    this.toState("run");
    this.setBulletPointsShift(65, 30);

    this.hitBox.width = 20;
    this.hitBox.height = 90;
    this.hitBox.shiftX = 0;
    this.hitBox.shiftY = 0;
  }

  public showJump() {
    this.toState("jump");
    this.setBulletPointsShift(-2, 40);

    this.hitBox.width = 40;
    this.hitBox.height = 40;
    this.hitBox.shiftX = -10;
    this.hitBox.shiftY = 25;
  }

  public showFall() {
    this.toState("fall");

    this.hitBox.width = 20;
    this.hitBox.height = 90;
    this.hitBox.shiftX = 0;
    this.hitBox.shiftY = 0;
  }

  public showLay() {
    this.toState("lay");
    this.setBulletPointsShift(65, 70);

    this.hitBox.width = 90;
    this.hitBox.height = 20;
    this.hitBox.shiftX = -45;
    this.hitBox.shiftY = 70;
  }

  public showStayUp() {
    this.toState("stayUp");
    this.setBulletPointsShift(-2, -40);

    this.hitBox.width = 20;
    this.hitBox.height = 90;
    this.hitBox.shiftX = 0;
    this.hitBox.shiftY = 0;
  }

  public showRunUp() {
    this.toState("runUp");
    this.setBulletPointsShift(40, -20);

    this.hitBox.width = 20;
    this.hitBox.height = 90;
    this.hitBox.shiftX = 0;
    this.hitBox.shiftY = 0;
  }

  public showRunDown() {
    this.toState("runDown");
    this.setBulletPointsShift(20, 55);

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
    const view = new Graphics();
    view.rect(0, 0, 20, 90);
    view.rect(0, 30, 60, 10);
    view.stroke(0xffff00);
    return view;
  }

  private getStayUpImage() {
    const view = new Graphics();
    view.rect(0, 0, 20, 90);
    view.rect(8, -40, 5, 40);
    view.stroke(0xffff00);
    return view;
  }

  private getRunImage() {
    const view = new Graphics();
    view.rect(0, 0, 20, 90);
    view.rect(0, 30, 70, 5);
    view.stroke(0xffff00);
    view.skew.x = -0.1;
    return view;
  }

  private getRunUpImage() {
    const view = new Graphics();
    view.rect(0, 0, 20, 90);
    view.lineTo(0, 30);
    view.lineTo(40, -20);
    view.lineTo(45, -15);
    view.lineTo(0, 40);
    view.stroke(0xffff00);
    view.skew.x = -0.1;
    return view;
  }

  private getRunDownImage() {
    const view = new Graphics();
    view.rect(0, 0, 20, 90);
    view.lineTo(0, 20);
    view.lineTo(40, 60);
    view.lineTo(35, 65);
    view.lineTo(0, 30);
    view.stroke(0xffff00);
    view.skew.x = -0.1;
    return view;
  }

  private getLayImage() {
    const view = new Graphics();
    view.rect(0, 0, 90, 20);
    view.rect(90, 0, 40, 5);
    view.stroke(0xffff00);
    view.x -= 45;
    view.y += 70;
    return view;
  }

  private getJumpImage() {
    const view = new Graphics();
    view.rect(0, 0, 40, 40);
    view.stroke(0xffff00);
    view.x -= 10;
    view.y += 25;
    return view;
  }

  private getFallImage() {
    const view = new Graphics();
    view.rect(0, 0, 20, 90);
    view.rect(10, 20, 5, 60);
    view.stroke(0xffff00);
    view.skew.x = -0.1;
    return view;
  }
}
