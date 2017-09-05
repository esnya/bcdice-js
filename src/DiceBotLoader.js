import '../lib/bcdice.ruby.js';
import opal from './opal';
import DiceBot from './DiceBot';
import { isNil } from './utilities';

export default class DiceBotLoader {
    static loadUnknownGame(gameTitle) {
        const diceBot = opal(Opal => Opal.DiceBotLoader.$loadUnknownGame(gameTitle));

        if (diceBot instanceof Promise) {
            return diceBot.then(d => isNil(d) ? null: new DiceBot(d));
        }

        if (isNil(diceBot)) return null;

        return new DiceBot(diceBot);
    }

    static collectDiceBotDescriptions() {
        return opal(
            Opal => Opal.DiceBotLoader.$collectDiceBotDescriptions()
        );
    }

    static collectDiceBots() {
        return opal(
            Opal => Opal.DiceBotLoader.$collectDiceBots().map((diceBot) => {
                if (diceBot instanceof Promise) {
                    return diceBot.then(d => new DiceBot(d));
                } else {
                    return new DiceBot(diceBot);
                }
            })
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
        if (diceBot instanceof Promise) {
            return diceBot.then(d => new DiceBot(d))
        }
        return new DiceBot(diceBot);
    }
}
