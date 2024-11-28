import Game from './game';

export default class KeyboardProcessor {
  private keyMap: {
    [key: string]: {
      isDown: boolean;
      executeDown?: () => void;
      executeUp?: () => void;
    };
  } = {
    ArrowLeft: {
      isDown: false,
    },
    ArrowRight: {
      isDown: false,
    },
    ArrowUp: {
      isDown: false,
    },
    ArrowDown: {
      isDown: false,
    },
  };

  private gameContext;
  constructor(gameContext: Game) {
    this.gameContext = gameContext;
  }

  getButton(keyName: string) {
    return this.keyMap[keyName];
  }

  onKeyDown(key: KeyboardEvent) {
    const button = this.keyMap[key.code];
    if (button != undefined) {
      button.isDown = true;
      button.executeDown?.call(this.gameContext);
    }
  }

  onKeyUp(key: KeyboardEvent) {
    const button = this.keyMap[key.code];
    if (button != undefined) {
      button.isDown = false;
      button.executeUp?.call(this.gameContext);
    }
  }

  isButtonPressed(keyName: string) {
    return this.keyMap[keyName]?.isDown;
  }
}
