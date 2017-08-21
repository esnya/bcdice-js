describe('DiceBotLoader', () => {
    var DiceBotLoader;

    it('is valid module', () => {
        DiceBotLoader = require('../dist/DiceBotLoader').default;
    });

    it('is defined', () => {
        expect(DiceBotLoader).toBeDefined();
    });

    describe('.loadUnknownGame', () => {
        it('loads diceBot', () => {
            const DiceBot = require('../dist/DiceBot').default;

            const diceBot = DiceBotLoader.loadUnknownGame('SwordWorld2_0');
            expect(diceBot).toBeInstanceOf(DiceBot);
        });

        it('returns null for if load failed', () => {
            expect(DiceBotLoader.loadUnknownGame('')).toBe(null);
        });
    });

    describe('.collectDiceBots', () => {
        it('enumerates diceBots', () => {
            const diceBots = DiceBotLoader.collectDiceBots();
            expect(diceBots).toBeInstanceOf(Array);
            expect(diceBots.length).toBeGreaterThan(0);

            const DiceBot = require('../dist/DiceBot').default;
            expect(diceBots[0]).toBeInstanceOf(DiceBot);
        });
    });
});
