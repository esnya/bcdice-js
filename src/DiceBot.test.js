describe('DiceBot', () => {
  let DiceBot;

  it('is valid module', () => {
    DiceBot = require('./DiceBot').default;
  });

  it('is defined', () => {
    expect(DiceBot).toBeDefined();
  });

  let DiceBotLoader;
  let diceBot;
  describe('getHelpMessage', () => {
    it('returns helpMessage', () => {
      DiceBotLoader = require('./DiceBotLoader').default;
      diceBot = DiceBotLoader.loadUnknownGame('SwordWorld2_0');

      const help = diceBot.getHelpMessage();
      expect(typeof help).toEqual('string');
      expect(help.length).not.toBe(0);
    });
  });

  describe('info', () => {
    it('returns info', () => {
      const {
        name,
        gameType,
        prefixs,
        prefixes,
        info,
      } = diceBot.info();

      expect(name).toBeDefined();
      expect(gameType).toBeDefined();
      expect(prefixs).toBeDefined();
      expect(prefixes).toBeDefined();
      expect(info).toBeDefined();
    });
  });
});
