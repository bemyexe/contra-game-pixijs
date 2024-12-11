import {Container} from "pixi.js";
import Hero from "./Hero";
import HeroView from "./HeroView";
import AssetsFactory from "../../AssetsFactory";

export default class HeroFactory {
  private worldContainer;
  private assets;

  constructor(worldContainer: Container, assets: AssetsFactory) {
    this.worldContainer = worldContainer;
    this.assets = assets;
  }
  create(x: number, y: number) {
    const heroView = new HeroView(this.assets);

    this.worldContainer.addChild(heroView);
    const hero = new Hero(heroView);
    hero.x = x;
    hero.y = y;
    return hero;
  }
}
