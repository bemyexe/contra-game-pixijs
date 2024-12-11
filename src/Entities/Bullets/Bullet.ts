import Entity from "../Entity";

export default class Bullet extends Entity {
  public speed = 10;
  public bulletAngle;
  public type: string = "";
  constructor(view: any, bulletAngle: number) {
    super(view);

    this.bulletAngle = bulletAngle * (Math.PI / 180);
  }

  update() {
    this.x += this.speed * Math.cos(this.bulletAngle);
    this.y += this.speed * Math.sin(this.bulletAngle);
  }
}
