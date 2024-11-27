import { Application } from 'pixi.js';
import Game from './game';

const app = new Application();
const game = new Game(app);
(async () => {
  await setup();
  app.ticker.add(game.update, game);
})();

async function setup() {
  await app.init({
    width: 1024,
    height: 768,
    background: 'black',
  });
  document.body.appendChild(app.canvas);
}
