describe('DiceBotLoaderList', () => {
    var DiceBotLoaderList;

    it('is valid module', () => {
        DiceBotLoaderList = require('../lib/DiceBotLoaderList').default;
    });

    it('is defined', () => {
        expect(DiceBotLoaderList).toBeDefined();
    });

    describe('.find', () => {
        it('returns loader', () => {
            const DiceBotLoader = require('../lib/DiceBotLoader').default;

            const loader = DiceBotLoaderList.find('COC');
            expect(loader).toBeInstanceOf(DiceBotLoader);

            const DiceBot = require('../lib/DiceBot').default;
            const diceBot = loader.loadDiceBot();
            expect(diceBot).toBeInstanceOf(DiceBot);
            expect(diceBot.gameType()).toEqual('Cthulhu');
        });

        it('returns null if gameTitle is empty or game was not found', () => {
            expect(DiceBotLoaderList.find('')).toBe(null);
            expect(DiceBotLoaderList.find('InvaridGameTitle')).toBe(null);
        });
    });
});