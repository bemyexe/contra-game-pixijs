import BulletFactory from "./Entities/Bullets/BulletFactory";

export default class Weapon {
  private currentGunStrategy;
  private bulletFactory;

  constructor(bulletFactory: BulletFactory) {
    this.bulletFactory = bulletFactory;

    this.currentGunStrategy = this.defaultGunStrategy;
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

  fire(bulletContext: any) {
    this.currentGunStrategy(bulletContext);
  }

  defaultGunStrategy(bulletContext: any) {
    this.bulletFactory.createBullet(bulletContext);
  }

  spreadGunStrategy(bulletContext: any) {
    let angleShift = -20;
    for (let i = 0; i < 5; i++) {
      const localBulletContext = {
        x: bulletContext.x,
        y: bulletContext.y,
        angle: bulletContext.angle + angleShift,
        type: bulletContext.type,
      };
      this.bulletFactory.createBullet(localBulletContext);
      angleShift += 10;
    }
  }
}
