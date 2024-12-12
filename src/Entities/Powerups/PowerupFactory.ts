import {Container} from 'pixi.js';
import AssetsFactory from '../../AssetsFactory';
import PowerupView from './PowerupView';
import Powerup from './Powerup';
import SpreadGunPowerupView from './SpreadGunPowerupView';
import SpreadGunPowerup from './SpreadGunPowerup';
import Hero from '../Hero/Hero';

export default class PowerupFactory {
  private entities;
  private assets;
  private worldContainer;
  private target;

  constructor(
    worldContainer: Container,
    entities: any[],
    assets: AssetsFactory,
    target: Hero
  ) {
    this.worldContainer = worldContainer;
    this.entities = entities;
    this.assets = assets;
    this.target = target;
  }

  public createPowerup(x: number, y: number) {
    const view = new PowerupView(this.assets);

    const powerup = new Powerup(this, view, y, this.target);
    view.x = x;
    this.worldContainer.addChild(view);
    this.entities.push(powerup);
  }

  public createSpreadGunPowerup(x: number, y: number) {
    const view = new SpreadGunPowerupView(this.assets);
    const powerup = new SpreadGunPowerup(view);

    powerup.x = x;
    powerup.y = y;

    this.worldContainer.addChild(view);
    this.entities.push(powerup);
  }
}
