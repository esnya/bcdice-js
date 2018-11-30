/* eslint no-underscore-dangle: off */

import '../lib/bcdice.ruby.js';
import Opal from './opal';
import DiceBot from './DiceBot';
import DiceBotLoader from './DiceBotLoader';
import DiceBotLoaderList from './DiceBotLoaderList';
import DiceBotResolver from './DiceBotResolver';
import { proxy } from './utilities';

export default class BCDice {
  constructor() {
    const factory = Opal.BCDiceMaker.$new();
    this._bcdice = factory.$newBcDice();

    return proxy(this._bcdice)(this);
  }

  setDiceBot(diceBot) {
    if (!diceBot) return;

    if (!(diceBot instanceof DiceBot)) throw new Error('Invalit argument type');
    this._bcdice.$setDiceBot(diceBot._diceBot);

    this.diceBot = diceBot;
    diceBot._diceBot['$bcdice='](this._bcdice);
  }

  diceCommand() {
    return this.dice_command();
  }

  setGameByTitle(gameTitle) {
    if (DiceBotResolver.isAsync()) {
      const loader = DiceBotLoaderList.find(gameTitle);

      return (
        loader ? loader.loadDiceBot() : DiceBotLoader.loadUnknownGame(gameTitle)
      ).then((diceBot) => {
        if (diceBot) this.setDiceBot(diceBot);
        else this.setDiceBot(new DiceBot());
        diceBot.postSet();
      });
    }
    return this._bcdice.$setGameByTitle(gameTitle);
  }
}
