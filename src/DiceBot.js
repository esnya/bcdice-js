export default class DiceBot {
    constructor(diceBot) {
        this._diceBot = diceBot;
    }

    gameName() {
        return this._diceBot.$gameName();
    }

    gameType() {
        return this._diceBot.$gameType();
    }
}
