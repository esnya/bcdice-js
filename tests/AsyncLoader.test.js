describe('AsyncLoader', () => {
    const DiceBotLoader = require('../lib/DiceBotLoader').default;

    var DiceBotResolver;
    var customLoader;
    describe('DiceBotResolber', () => {
        it('is valid module', () => {
            DiceBotResolver = require('../lib/DiceBotResolver').default;
        });

        it('accepts custom async loader', () => {
            customLoader = jest.fn(filename => new Promise(resolve => {
                setTimeout(() => {
                    const path = `../lib/diceBot/${filename}`;
                    // console.log(filename, path);
                    require(path);
                    resolve();
                });
            }));
            DiceBotResolver.setCustomLoader(customLoader, true);
            expect(DiceBotResolver.isAsync()).toBe(true);
        });
    });

    describe('DiceBotLoader', () => {
        const DiceBot = require('../lib/DiceBot').default;

        it('loads diceBot', () => {
            const result = DiceBotLoader.loadUnknownGame('SwordWorld2_0');

            expect(customLoader).toBeCalledWith('SwordWorld2_0');

            return result.then(diceBot => {
                expect(diceBot).toBeInstanceOf(DiceBot);
            });
        });
    });

    describe('BCDice', () => {
        const BCDice = require('../lib/BCDice').default;
        const bcdice = new BCDice();

        it('loads diceBoy', () =>
            bcdice.setGameByTitle('Alsetto')
                .then(() => {
                    expect(customLoader).toBeCalledWith('Alsetto');
                    expect(bcdice.getGameType()).toEqual('Alsetto');
                })
        );
    });
});
