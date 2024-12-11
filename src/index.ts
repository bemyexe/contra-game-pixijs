import {Application, Assets} from "pixi.js";
import Game from "./game";
import AssetsFactory from "./AssetsFactory";

const app = new Application();
(async () => {
  await setup();

  await Assets.load("assets/atlas.png");
  await Assets.load("assets/atlas.json");

  const assets = new AssetsFactory();

  const game = new Game(app, assets);
  document.addEventListener("keydown", (key) => {
    game.keyboardProcessor.onKeyDown(key);
  });

  document.addEventListener("keyup", (key) => {
    game.keyboardProcessor.onKeyUp(key);
  });

  app.ticker.add(game.update, game);
})();

async function setup() {
  await app.init({
    width: 1024,
    height: 768,
    background: "black",
  });
  document.body.appendChild(app.canvas);
}
