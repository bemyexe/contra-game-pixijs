import Entity from "../Entity";

export default class Bullet extends Entity {
  private SPEED = 10;
  public bulletAngle;
  public type: string = "";
  constructor(view: any, bulletAngle: number) {
    super(view);

    this.bulletAngle = bulletAngle * (Math.PI / 180);
  }

  update() {
    this.x += this.SPEED * Math.cos(this.bulletAngle);
    this.y += this.SPEED * Math.sin(this.bulletAngle);
  }
}
