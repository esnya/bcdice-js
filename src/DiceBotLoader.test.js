describe('DiceBotLoader', () => {
  let DiceBotLoader;

  it('is valid module', () => {
    DiceBotLoader = require('./DiceBotLoader').default;
  });

  it('is defined', () => {
    expect(DiceBotLoader).toBeDefined();
  });

  describe('.loadUnknownGame', () => {
    it('loads diceBot', () => {
      const DiceBot = require('./DiceBot').default;

      const diceBot = DiceBotLoader.loadUnknownGame('SwordWorld2_0');
      expect(diceBot).toBeInstanceOf(DiceBot);
    });

    it('returns null for if load failed', () => {
      expect(DiceBotLoader.loadUnknownGame('')).toBe(null);
    });
  });

  describe('.collectDiceBotDescriptions', () => {
    it('enumerates diceBotDescriptions', () => {
      const descs = DiceBotLoader.collectDiceBotDescriptions();
      expect(descs).toBeInstanceOf(Array);
      expect(descs.length).toBeGreaterThan(0);

      const desc = descs[0];
      expect(desc.length).toBe(3);
    });
  });
  describe('.collectDiceBots', () => {
    it('enumerates diceBots', () => {
      const diceBots = DiceBotLoader.collectDiceBots();
      expect(diceBots).toBeInstanceOf(Array);
      expect(diceBots.length).toBeGreaterThan(0);

      const DiceBot = require('./DiceBot').default;
      expect(diceBots[0]).toBeInstanceOf(DiceBot);
    });
  });
});
