describe('index.js', () => {
    var Index;

    it('is valid module', () => {
        Index = require('.');
    });

    it('exports BCDice as default', () => {
        expect(Index.default).toBe(require('./BCDice').default);
    });

    it('exports BCDice', () => {
        expect(Index.BCDice).toBe(require('./BCDice').default);
    });

    it('exports DiceBot', () => {
        expect(Index.DiceBot).toBe(require('./DiceBot').default);
    });

    it('exports DiceBotLoader', () => {
        expect(Index.DiceBotLoader).toBe(require('./DiceBotLoader').default);
    });
    
    it('exports DiceBotLoaderList', () => {
        expect(Index.DiceBotLoaderList).toBe(require('./DiceBotLoaderList').default);
    });
});
