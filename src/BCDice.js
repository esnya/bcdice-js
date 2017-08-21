/* eslint no-underscore-dangle: off */

import { BCDiceMaker } from '../dist/bcdice.ruby.js';
import Opal from '../dist/opal';

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

        this._bcdice.$setDiceBot(Opal.Object.$const_get(diceBot).$new());
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
