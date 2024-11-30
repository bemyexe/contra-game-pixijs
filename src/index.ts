import {Application} from "pixi.js";
import Game from "./game";

const app = new Application();

(async () => {
  await setup();
  const game = new Game(app);
  document.addEventListener("keydown", function (key) {
    game.keyboardProcessor.onKeyDown(key);
  });

  document.addEventListener("keyup", function (key) {
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
