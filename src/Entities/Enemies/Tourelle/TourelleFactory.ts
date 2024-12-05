import {Container} from "pixi.js";
import TourelleView from "./TourelleView";
import Tourelle from "./Tourelle";
import Hero from "../../Hero/Hero";
import BulletFactory from "../../Bullets/BulletFactory";

export default class TourelleFactory {
  private worldContainer;
  private target;
  private bulletFactory;

  constructor(
    worldContainer: Container,
    target: Hero,
    bulletFactory: BulletFactory
  ) {
    this.worldContainer = worldContainer;
    this.target = target;
    this.bulletFactory = bulletFactory;
  }

  create(x: number, y: number) {
    const view = new TourelleView();
    this.worldContainer.addChild(view);

    const tourelle = new Tourelle(view, this.target, this.bulletFactory);
    tourelle.x = x;
    tourelle.y = y;

    return tourelle;
  }
}
