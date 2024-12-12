import {Container} from 'pixi.js';
import Runner from './Runner/Runner';
import RunnerView from './Runner/RunnerView';
import Tourelle from './Tourelle/Tourelle';
import TourelleView from './Tourelle/TourelleView';
import Hero from '../Hero/Hero';
import BulletFactory from '../Bullets/BulletFactory';
import AssetsFactory from '../../AssetsFactory';
import BossView from './Boss/BossView';
import Boss from './Boss/Boss';

export default class EnemiesFactory {
  private worldContainer;
  private target;
  private bulletFactory;
  private entities;
  private assets;

  constructor(
    worldContainer: Container,
    target: Hero,
    bulletFactory: BulletFactory,
    entities: any,
    assets: AssetsFactory
  ) {
    this.worldContainer = worldContainer;
    this.target = target;
    this.bulletFactory = bulletFactory;
    this.entities = entities;
    this.assets = assets;
  }
  public createRunner(x: number, y: number) {
    const view = new RunnerView(this.assets);
    this.worldContainer.addChild(view);
    const runner = new Runner(view, this.target);
    runner.x = x;
    runner.y = y;
    this.entities.push(runner);
    return runner;
  }
  public createTourelle(x: number, y: number) {
    const view = new TourelleView(this.assets);
    this.worldContainer.addChild(view);
    const tourelle = new Tourelle(view, this.target, this.bulletFactory);
    tourelle.x = x;
    tourelle.y = y;
    this.entities.push(tourelle);
    return tourelle;
  }

  public createBoss(x: number, y: number) {
    const view = new BossView(this.assets);
    this.worldContainer.addChild(view);

    const boss = new Boss(view);
    boss.x = x - 35;
    boss.y = y + 95;

    this.entities.push(boss);

    return boss;
  }
}
