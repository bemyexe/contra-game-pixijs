import Entity from "../Entity";
import PlatformView from "./PlatformView";

export default class Platform extends Entity {
  type: string = "";
  isStep: boolean = false;
  constructor(view: PlatformView) {
    super(view);
    this.isActive = true;
  }
}
