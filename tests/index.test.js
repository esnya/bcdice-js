describe('index.js', () => {
    var Index;

    it('is valid module', () => {
        Index = require('..');
    });

    it('exports BCDice as default', () => {
        expect(Index.default).toBe(require('../dist/BCDice').default);
    });

    it('exports BCDice', () => {
        expect(Index.BCDice).toBe(require('../dist/BCDice').default);
    });

    it('exports DiceBot', () => {
        expect(Index.DiceBot).toBe(require('../dist/DiceBot').default);
    });

    it('exports DiceBotLoader', () => {
        expect(Index.DiceBotLoader).toBe(require('../dist/DiceBotLoader').default);
    });
    
    it('exports DiceBotLoaderList', () => {
        expect(Index.DiceBotLoaderList).toBe(require('../dist/DiceBotLoaderList').default);
    });
});
