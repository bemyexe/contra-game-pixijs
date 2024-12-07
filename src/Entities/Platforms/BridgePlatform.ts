import Hero from "../Hero/Hero";
import Platform from "./Platform";
import PlatformView from "./PlatformView";

export default class BridgePlatform extends Platform {
  private target!: Hero;
  constructor(view: PlatformView) {
    super(view);
  }
  setTarget(target: Hero) {
    this.target = target;
  }
  update() {
    if (this.target != null) {
      if (this.x - this.target.x < -50) {
        this.isActive = false;
        this.dead();
      }
      return;
    }
  }
}
