import {Container, Rectangle} from 'pixi.js';
import Hero from './Entities/Hero/Hero';

export interface CameraSettings {
  target: Hero;
  world: Container;
  screenSize: Rectangle;
  isBackScrollX: boolean;
  maxWorldWidth: number;
}

export default class Camera {
  private target: Hero;
  private world;
  private isBackScrollX;
  private centerScreenPointX;
  private rightBorderWorldPointX;
  private lastTargetX = 0;

  constructor(cameraSettings: CameraSettings) {
    this.target = cameraSettings.target;
    this.world = cameraSettings.world;
    this.isBackScrollX = cameraSettings.isBackScrollX;

    this.centerScreenPointX = cameraSettings.screenSize.width / 2;
    this.rightBorderWorldPointX = this.world.width - this.centerScreenPointX;
  }
  public update() {
    if (
      this.target.x > this.centerScreenPointX &&
      this.target.x < this.rightBorderWorldPointX &&
      (this.isBackScrollX || this.target.x > this.lastTargetX)
    ) {
      this.world.x = this.centerScreenPointX - this.target.x;
      this.lastTargetX = this.target.x;
    }
  }
}
