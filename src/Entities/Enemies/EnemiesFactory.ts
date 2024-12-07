import {Container} from "pixi.js";
import Runner from "./Runner/Runner";
import RunnerView from "./Runner/RunnerView";
import Tourelle from "./Tourelle/Tourelle";
import TourelleView from "./Tourelle/TourelleView";
import Hero from "../Hero/Hero";
import BulletFactory from "../Bullets/BulletFactory";

export default class EnemiesFactory {
  private worldContainer;
  private target;
  private bulletFactory;
  private entities;

  constructor(
    worldContainer: Container,
    target: Hero,
    bulletFactory: BulletFactory,
    entities: any
  ) {
    this.worldContainer = worldContainer;
    this.target = target;
    this.bulletFactory = bulletFactory;
    this.entities = entities;
  }
  createRunner(x: number, y: number) {
    const view = new RunnerView();
    this.worldContainer.addChild(view);
    const runner = new Runner(view, this.target);
    runner.x = x;
    runner.y = y;
    this.entities.push(runner);
    return runner;
  }
  createTourelle(x: number, y: number) {
    const view = new TourelleView();
    this.worldContainer.addChild(view);
    const tourelle = new Tourelle(view, this.target, this.bulletFactory);
    tourelle.x = x;
    tourelle.y = y;
    this.entities.push(tourelle);
    return tourelle;
  }
}
