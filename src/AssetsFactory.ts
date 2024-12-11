import {Assets, Spritesheet, Texture} from "pixi.js";

export default class AssetsFactory {
  private spritesheet;
  constructor() {
    this.spritesheet = new Spritesheet(
      Texture.from("assets/atlas.png"),
      Assets.cache.get("assets/atlas.json").data
    );
    this.spritesheet.parse();
  }
  public getTexture(textureName: string) {
    return this.spritesheet.textures[textureName];
  }
  public getAnimationTextures(animationName: string) {
    return this.spritesheet.animations[animationName];
  }
}
