import { DiceBotLoader as RubyDiceBotLoader } from '../dist/bcdice.ruby.js';
import DiceBot from './DiceBot';
import { isNil } from './utilities';

export default class DiceBotLoader {
    static loadUnknownGame(gameTitle) {
        const diceBot = RubyDiceBotLoader.$loadUnknownGame(gameTitle);
        if (isNil(diceBot)) return null;

        return new DiceBot(diceBot);
    }

    static collectDiceBots() {
        return RubyDiceBotLoader.$collectDiceBots().map(diceBot => new DiceBot(diceBot));
    }

    constructor(diceBotLoader) {
        this._diceBotLoader = diceBotLoader;
    }

    match() {
        return this._diceBotLoader.$match();
    }

    loadDiceBot() {
        return new DiceBot(this._diceBotLoader.$loadDiceBot());
    }
}
