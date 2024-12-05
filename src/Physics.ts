export default class Physics {
  static getOrientCollisionResult(
    aaRect: {x: number; y: number; width: number; height: number},
    bbRect: {x: number; y: number; width: number; height: number},
    aaPrevPoint: {x: number; y: number}
  ) {
    const collisionResult = {
      horizontal: false,
      vertical: false,
    };

    if (!this.isCheckAABB(aaRect, bbRect)) {
      return collisionResult;
    }

    aaRect.y = aaPrevPoint.y;
    if (!this.isCheckAABB(aaRect, bbRect)) {
      collisionResult.vertical = true;
      return collisionResult;
    }

    collisionResult.horizontal = true;
    return collisionResult;
  }

  static isCheckAABB(
    entity: {x: number; y: number; width: number; height: number},
    area: {x: number; y: number; width: number; height: number}
  ) {
    return (
      entity.x < area.x + area.width &&
      entity.x + entity.width > area.x &&
      entity.y < area.y + area.height &&
      entity.y + entity.height > area.y
    );
  }
}
