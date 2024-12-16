import Game from './game';

export default class KeyboardProcessor {
  private keyMap: {
    [key: string]: {
      isDown: boolean;
      executeDown?: () => void;
      executeUp?: () => void;
    };
  } = {
    KeyA: {
      isDown: false,
    },
    Space: {
      isDown: false,
    },
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

  public getButton(keyName: string) {
    return this.keyMap[keyName];
  }

  public onKeyDown(key: KeyboardEvent) {
    const button = this.keyMap[key.code];
    if (button != undefined) {
      button.isDown = true;
      button.executeDown?.call(this.gameContext);
    }
  }

  public onKeyUp(key: KeyboardEvent) {
    const button = this.keyMap[key.code];
    if (button != undefined) {
      button.isDown = false;
      button.executeUp?.call(this.gameContext);
    }
  }

  public isButtonPressed(keyName: string) {
    return this.keyMap[keyName]?.isDown;
  }
}
