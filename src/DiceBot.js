import '../lib/bcdice.ruby.js';
import Opal from './opal';
import { proxy } from './utilities';

export default class DiceBot {
  constructor(diceBot) {
    if (diceBot) {
      this._diceBot = diceBot;
    } else {
      this._diceBot = Opal.DiceBot.$new();
    }

    return proxy(this._diceBot)(this);
  }

  info() {
    const result = this._diceBot.$info().$$smap;
    return {
      prefixes: result.prefixs,
      ...result,
    };
  }
}
