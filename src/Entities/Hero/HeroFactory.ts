import {Container} from "pixi.js";
import Hero from "./Hero";
import HeroView from "./HeroView";

export default class HeroFactory {
  private worldContainer;

  constructor(worldContainer: Container) {
    this.worldContainer = worldContainer;
  }
  create(x: number, y: number) {
    const heroView = new HeroView();

    this.worldContainer.addChild(heroView);
    const hero = new Hero(heroView);
    hero.x = x;
    hero.y = y;
    return hero;
  }
}
