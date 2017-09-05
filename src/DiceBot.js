import opal from './opal';

export default class DiceBot {
    constructor(diceBot) {
        if (diceBot) {
            this._diceBot = diceBot;
        } else {
            this._diceBot = opal(Opal => Opal.DiceBot.$new());
        }
    }

    gameName() {
        return opal(() => this._diceBot.$gameName());
    }

    gameType() {
        return opal(() => this._diceBot.$gameType());
    }

    postSet() {
        opal(() => this._diceBot.$postSet());
    }
}
