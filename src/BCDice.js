/* eslint no-underscore-dangle: off */

import '../lib/bcdice.ruby.js';
import Opal from './opal';
import DiceBot from './DiceBot';
import DiceBotLoader from './DiceBotLoader';
import DiceBotLoaderList from './DiceBotLoaderList';
import DiceBotResolver from './DiceBotResolver';
import { nil2null } from './utilities';

export default class BCDice {
  constructor() {
    const maker = Opal.BCDiceMaker.$new()
    this._bcdice = maker.$newBcDice()
  }

  // eslint-disable-next-line no-unused-vars
  setDir(dir, prefix) {
    throw new Error('Unsupported');
  }

  isKeepSecretDice(b) {
    this._bcdice.$isKeepSecretDice(b)
  }

  getGameType() {
    return this._bcdice.$getGameType()
  }

  setDiceBot(diceBot) {
    if (!diceBot) return;

    if (!(diceBot instanceof DiceBot)) throw new Error('Invalit argument type');
    this._bcdice.$setDiceBot(diceBot._diceBot)
  }

  // eslint-disable-next-line no-unused-vars
  setIrcClient(client) {
    throw new Error('Unimplemented');
  }

  setMessage(message) {
    this._bcdice.$setMessage(message)
  }

  // eslint-disable-next-line camelcase
  dice_command() {
    return this.diceCommand();
  }
  diceCommand() {
    return this._bcdice.$dice_command()
  }

  setCollectRandResult(b) {
    this._bcdice.$setCollectRandResult(b)
  }

  getRandResults() {
    const results = this._bcdice.$getRandResults()
    return nil2null(results);
  }

  setGameByTitle(gameTitle) {
    if (DiceBotResolver.isAsync()) {
      const loader = DiceBotLoaderList.find(gameTitle);

      return (loader ? loader.loadDiceBot() : DiceBotLoader.loadUnknownGame(gameTitle)).then(diceBot => {
        if (diceBot) this.setDiceBot(diceBot);
        else this.setDiceBot(new DiceBot());
        diceBot.postSet();
      });
    } else {
      return this._bcdice.$setGameByTitle(gameTitle)
    }
  }
}
