describe('DiceBot', () => {
    var DiceBot;

    it('is valid module', () => {
        DiceBot = require('../dist/DiceBot').default;
    });

    it('is defined', () => {
        expect(DiceBot).toBeDefined();
    });
});
