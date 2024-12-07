import Entity from "../Entity";

export default class Platform extends Entity {
  type: string = "";
  isStep: boolean = false;
  constructor(view) {
    super(view);
    this.isActive = true;
  }
}
