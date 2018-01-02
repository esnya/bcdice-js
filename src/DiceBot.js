import Opal from './opal';

export default class DiceBot {
  constructor(diceBot) {
    if (diceBot) {
      this._diceBot = diceBot;
    } else {
      this._diceBot = Opal.DiceBot.$new()
    }
  }

  gameName() {
    return this._diceBot.$gameName()
  }

  gameType() {
    return this._diceBot.$gameType()
  }

  postSet() {
    this._diceBot.$postSet()
  }

  getHelpMessage() {
    return this._diceBot.$getHelpMessage()
  }

  info() {
    const result = this._diceBot.$info().$$smap
    return Object.assign({
      prefixes: result.prefixs,
    }, result);
  }
}
