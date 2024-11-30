import HeroView from "./HeroView";

export default class HeroWeaponUnit {
  private bulletAngle: number = 0;
  private bulletContextField: {[key: string]: number} = {x: 0, y: 0, angle: 0};

  private heroView;

  constructor(heroView: HeroView) {
    this.heroView = heroView;
  }

  get bulletContext() {
    this.bulletContextField.x =
      this.heroView.x + this.heroView.bulletPointsShift.x;
    this.bulletContextField.y =
      this.heroView.y + this.heroView.bulletPointsShift.y;
    this.bulletContextField.angle = this.heroView.isFliped
      ? this.bulletAngle * -1 + 180
      : this.bulletAngle;
    return this.bulletContextField;
  }

  public setBulletAngle(
    buttonContext: {[key: string]: boolean},
    isJump: boolean
  ) {
    if (buttonContext.arrowLeft || buttonContext.arrowRight) {
      if (buttonContext.arrowUp) {
        this.bulletAngle = -45;
      } else if (buttonContext.arrowDown) {
        this.bulletAngle = 45;
      } else {
        this.bulletAngle = 0;
      }
    } else {
      if (buttonContext.arrowUp) {
        this.bulletAngle = -90;
      } else if (buttonContext.arrowDown && isJump) {
        this.bulletAngle = 90;
      } else {
        this.bulletAngle = 0;
      }
    }
  }
}
