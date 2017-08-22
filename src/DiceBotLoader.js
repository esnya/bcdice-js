import '../dist/bcdice.ruby.js';
import opal from './opal';
import DiceBot from './DiceBot';
import { isNil } from './utilities';

export default class DiceBotLoader {
    static loadUnknownGame(gameTitle) {
        const diceBot = opal(Opal => Opal.DiceBotLoader.$loadUnknownGame(gameTitle));
        if (isNil(diceBot)) return null;

        return new DiceBot(diceBot);
    }

    static collectDiceBots() {
        return opal(
            Opal => Opal.DiceBotLoader.$collectDiceBots().map(diceBot => new DiceBot(diceBot))
        );
    }

    constructor(diceBotLoader) {
        this._diceBotLoader = diceBotLoader;
    }

    match() {
        return opal(() => this._diceBotLoader.$match());
    }

    loadDiceBot() {
        const diceBot = opal(() => this._diceBotLoader.$loadDiceBot());
        return new DiceBot(diceBot);
    }
}
