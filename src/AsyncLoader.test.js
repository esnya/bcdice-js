describe('AsyncLoader', () => {
  const DiceBotLoader = require('./DiceBotLoader').default;

  let DiceBotResolver;
  let customLoader;
  describe('DiceBotResolber', () => {
    it('is valid module', () => {
      DiceBotResolver = require('./DiceBotResolver').default;
    });

    it('accepts custom async loader', () => {
      customLoader = jest.fn(filename => new Promise((resolve) => {
        setTimeout(() => {
          const path = `../lib/diceBot/${filename}`;
          // console.log(filename, path);
          // eslint-disable-next-line import/no-dynamic-require
          require(path);
          resolve();
        });
      }));
      DiceBotResolver.setCustomLoader(customLoader, true);
      expect(DiceBotResolver.isAsync()).toBe(true);
    });
  });

  describe('DiceBotLoader', () => {
    const DiceBot = require('./DiceBot').default;

    it('loads diceBot async', () => {
      const result = DiceBotLoader.loadUnknownGame('SwordWorld2_0');

      expect(customLoader).toBeCalledWith('SwordWorld2_0');

      return result.then((diceBot) => {
        expect(diceBot).toBeInstanceOf(DiceBot);
      });
    });
  });

  describe('BCDice', () => {
    const BCDice = require('./BCDice').default;
    const bcdice = new BCDice();

    it('loads diceBot async', () => bcdice.setGameByTitle('Alsetto')
      .then(() => {
        expect(customLoader).toBeCalledWith('Alsetto');
        expect(bcdice.getGameType()).toEqual('Alsetto');
      }));
  });
});
