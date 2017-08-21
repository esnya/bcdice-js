/* eslint no-underscore-dangle: off */

import { BCDiceMaker } from '../dist/bcdice.ruby.js';
import Opal from '../dist/opal';
import DiceBot from './DiceBot';

export default class BCDice {
    constructor() {
        const maker = BCDiceMaker.$new();
        this._bcdice = maker.$newBcDice();
    }

    // eslint-disable-next-line no-unused-vars
    setDir(dir, prefix) {
        throw new Error('Unsupported');
    }

    isKeepSecretDice(b) {
        this._bcdice.$isKeepSecretDice(b);
    }

    getGameType() {
        return this._bcdice.$getGameType();
    }

    setDiceBot(diceBot) {
        if (!diceBot) return;

        if (!(diceBot instanceof DiceBot)) throw new Error('Invalit argument type');
        this._bcdice.$setDiceBot(diceBot._diceBot);
    }

    // eslint-disable-next-line no-unused-vars
    setIrcClient(client) {
        throw new Error('Unimplemented');
    }

    setMessage(message) {
        this._bcdice.$setMessage(message);
    }

    // eslint-disable-next-line camelcase
    dice_command() {
        return this.diceCommand();
    }
    diceCommand() {
        return this._bcdice.$dice_command();
    }

    setGameByTitle(gameTitle) {
        return this._bcdice.$setGameByTitle(gameTitle);
    }
}
