describe('BCDice', () => {
    var BCDice;

    it('is valid module', () => {
        BCDice = require('../').default;
    });

    var bcdice;
    it('can instantiate', () => {
        bcdice = new BCDice();

        expect(bcdice).toBeInstanceOf(BCDice);
    });

    it('.setDir', () => {
        expect(() => bcdice.setDir('a', 'b')).toThrow();
    });

    it('.isKeepSecretDice', () => {
        bcdice.isKeepSecretDice(true);
    });

    it('.getGameType', () => {
        expect(bcdice.getGameType()).toEqual('DiceBot');
    });

    it('.setDiceBot', () => {
        bcdice.setDiceBot('SwordWorld2_0');
        expect(bcdice.getGameType()).toEqual('SwordWorld2.0');
    })

    it('.setIrcClient', () => {
        expect(() => bcdice.setIrcClient(null)).toThrow();
    });

    it('.setMessage', () => {
        bcdice.setMessage('K20');
    });

    it('.dice_command', () => {
        const [ result, isSecret ] = bcdice.dice_command();

        expect(result).toBeDefined();
        expect(result).not.toEqual('1');
        expect(isSecret).toBe(false);
    });

    it('.setGameByTitle', () => {
        bcdice.setGameByTitle('Cthulhu7th');

        expect(bcdice.getGameType()).toEqual('Cthulhu7th');
    });
});
