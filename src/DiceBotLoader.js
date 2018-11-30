import '../lib/bcdice.ruby.js';
import Opal from './opal';
import DiceBot from './DiceBot';
import { isNil, proxy } from './utilities';

export default class DiceBotLoader {
  static loadUnknownGame(gameTitle) {
    const diceBot = Opal.DiceBotLoader.$loadUnknownGame(gameTitle);

    if (diceBot instanceof Promise) {
      return diceBot.then(d => (isNil(d) ? null : new DiceBot(d)));
    }

    if (isNil(diceBot)) return null;

    return new DiceBot(diceBot);
  }

  static collectDiceBotDescriptions() {
    return Opal.DiceBotLoader.$collectDiceBotDescriptions();
  }

  static collectDiceBots() {
    return Opal.DiceBotLoader.$collectDiceBots().map((diceBot) => {
      if (diceBot instanceof Promise) {
        return diceBot.then(d => new DiceBot(d));
      }
      return new DiceBot(diceBot);
    });
  }

  constructor(diceBotLoader) {
    this._diceBotLoader = diceBotLoader;

    return proxy(diceBotLoader)(this);
  }

  loadDiceBot() {
    const diceBot = this._diceBotLoader.$loadDiceBot();
    if (diceBot instanceof Promise) {
      return diceBot.then(d => new DiceBot(d));
    }
    return new DiceBot(diceBot);
  }
}
