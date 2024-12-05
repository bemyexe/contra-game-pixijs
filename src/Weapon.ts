import BulletFactory from "./Entities/Bullets/BulletFactory";

export default class Weapon {
  private currentGunStrategy;
  private bulletFactory;

  private count = 0;
  private limit = 6;

  private isFire = false;

  constructor(bulletFactory: BulletFactory) {
    this.bulletFactory = bulletFactory;

    this.currentGunStrategy = this.defaultGunStrategy;
  }

  update(bulletContext: any) {
    if (this.isFire == false) {
      return;
    }

    if (this.count % this.limit == 0) {
      this.currentGunStrategy(bulletContext);
    }
    this.count++;
  }

  setWeapon(type: number) {
    switch (type) {
      case 1:
        this.currentGunStrategy = this.defaultGunStrategy;
        break;
      case 2:
        this.currentGunStrategy = this.spreadGunStrategy;
        break;
    }
  }

  startFire() {
    this.isFire = true;
  }

  stopFire() {
    this.isFire = false;
    this.count = 0;
  }

  defaultGunStrategy(bulletContext: any) {
    this.limit = 10;
    this.bulletFactory.createBullet(bulletContext);
  }

  spreadGunStrategy(bulletContext: any) {
    this.limit = 40;
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
