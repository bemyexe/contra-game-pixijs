import {Container} from "pixi.js";
import Runner from "./Runner";
import RunnerView from "./RunnerView";

export default class RunnerFactory {
  private worldContainer;

  constructor(worldContainer: Container) {
    this.worldContainer = worldContainer;
  }
  create(x: number, y: number) {
    const view = new RunnerView();
    this.worldContainer.addChild(view);

    const runner = new Runner(view);
    runner.x = x;
    runner.y = y;
    return runner;
  }
}
