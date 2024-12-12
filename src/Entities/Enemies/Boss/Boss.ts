import Entity from '../../Entity';

export default class Boss extends Entity {
  private health: number = 5;

  public type = 'enemy';

  constructor(view: any) {
    super(view);

    this.isActive = true;
  }

  update() {}

  damage() {
    this.health--;

    if (this.health < 1) {
      this.isActive = false;

      const deadAnimation = this._view.showAndGetDeadAnimation();

      deadAnimation.onComplete = () => {
        this._view.showAdditionalExplosions();
        deadAnimation.removeFromParent();
      };
    }
  }
}
