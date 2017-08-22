describe('DiceBot', () => {
    var DiceBot;

    it('is valid module', () => {
        DiceBot = require('../lib/DiceBot').default;
    });

    it('is defined', () => {
        expect(DiceBot).toBeDefined();
    });
});
