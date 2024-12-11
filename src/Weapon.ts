import BulletFactory from "./Entities/Bullets/BulletFactory";

export default class Weapon {
  private currentGunStrategy;
  private bulletFactory;

  private count = 0;
  private limit = 6;
  private isFire = false;
  private bulletContext: any;

  constructor(bulletFactory: BulletFactory) {
    this.bulletFactory = bulletFactory;

    this.currentGunStrategy = this.defaultGunStrategy;
  }

  public update(bulletContext: any) {
    if (!this.isFire) {
      return;
    }
    if (this.count % this.limit === 0) {
      this.currentGunStrategy(bulletContext);
    }
    this.count++;
  }

  public setWeapon(type: number) {
    switch (type) {
      case 1:
        this.currentGunStrategy = this.defaultGunStrategy;
        break;
      case 2:
        this.currentGunStrategy = this.spreadGunStrategy;
        break;
    }
  }

  public startFire() {
    this.isFire = true;
  }

  public stopFire() {
    this.isFire = false;
    this.count = 0;
  }

  public defaultGunStrategy(bulletContext: any) {
    this.bulletFactory.createBullet(bulletContext);
  }

  public spreadGunStrategy(bulletContext: any) {
    let angleShift = -20;
    for (let i = 0; i < 5; i++) {
      const localBulletContext = {
        x: bulletContext.x,
        y: bulletContext.y,
        angle: bulletContext.angle + angleShift,
        type: bulletContext.type,
      };
      this.bulletFactory.createSpreadGunBullet(localBulletContext);
      angleShift += 10;
    }
  }
}
