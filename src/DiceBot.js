import opal from './opal';

export default class DiceBot {
    constructor(diceBot) {
        this._diceBot = diceBot;
    }

    gameName() {
        return opal(() => this._diceBot.$gameName());
    }

    gameType() {
        return opal(() => this._diceBot.$gameType());
    }
}
