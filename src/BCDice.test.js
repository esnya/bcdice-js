describe('BCDice', () => {
    var BCDice;

    it('is valid module', () => {
        BCDice = require('./BCDice').default;
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

    let DiceBotLoaderList
    it('.setDiceBot', () => {
        DiceBotLoaderList = require('./DiceBotLoaderList').default;

        const diceBot = DiceBotLoaderList.find('SW').loadDiceBot();
        bcdice.setDiceBot(diceBot);
        expect(bcdice.getGameType()).toEqual('SwordWorld');
    });

    it('.setIrcClient', () => {
        expect(() => bcdice.setIrcClient(null)).toThrow();
    });

    it('.setMessage', () => {
        bcdice.setMessage('K20');
    });

    describe('.dice_command', () => {
        it('rolls dice', () => {
            const [result, isSecret] = bcdice.dice_command();

            expect(result).toBeDefined();
            expect(result).not.toEqual('1');
            expect(isSecret).toBe(false);
        });

        it('avoids gsub! error', () => {
            bcdice.setMessage('K20+10');

            const [result, isSecret] = bcdice.dice_command();

            expect(result).toBeDefined();
            expect(result).not.toEqual('1');
            expect(isSecret).toBe(false);
        });

        it('avoids split error', () => {
            bcdice.setMessage('2D6>5');

            const [result, isSecret] = bcdice.dice_command();

            expect(result).toBeDefined();
            expect(result).not.toEqual('1');
            expect(isSecret).toBe(false);
        });

        it('rolls CC>5 COC', () => {
            bcdice.setGameByTitle('Cthulhu7th');
            bcdice.setMessage('CC>5');

            const [result, isSecret] = bcdice.dice_command();

            expect(result).toBeDefined();
            expect(result).not.toEqual('1');
            expect(isSecret).toBe(false);
        });

        it('rolls BT2 Kancolle', () => {
            bcdice.setGameByTitle('KanColle');
            bcdice.setMessage('BT2');

            const [result, isSecret] = bcdice.dice_command();

            expect(result).toBeDefined();
            expect(result).not.toEqual('1');
            expect(isSecret).toBe(false);
        });

        it('rolls DoubleCloss', () => {
            bcdice.setGameByTitle('DoubleCross');


            bcdice.setMessage('2dx@7');
            const [result1] = bcdice.dice_command();
            expect(result1).toMatch(/^: \(2R10\[7\]\)/);

            bcdice.setMessage('2dx+5@7');
            const [result2] = bcdice.dice_command();
            expect(result2).toMatch(/^: \(2R10\+5\[7\]\)/);

            bcdice.setMessage('2dx@7+5');
            const [result3] = bcdice.dice_command();
            expect(result3).toMatch(/^: \(2R10\+5\[7\]\)/);
        });
    });

    it('.setGameByTitle', () => {
        bcdice.setGameByTitle('Cthulhu7th');

        expect(bcdice.getGameType()).toEqual('Cthulhu7th');
    });

    it('.setCollectRandResult', () => {
        bcdice.setGameByTitle('DiceBot');

        bcdice.setMessage('2D6');
        bcdice.setCollectRandResult(true);
        bcdice.dice_command();
    });

    describe('.getRandResults', () => {
        it('returns rand results', () => {
            const randResults = bcdice.getRandResults();

            expect(randResults).toBeInstanceOf(Array);
            expect(randResults.length).toBe(2);

            expect(typeof randResults[0][0]).toEqual('number');
            expect(randResults[0][1]).toBe(6);

            expect(typeof randResults[1][0]).toEqual('number');
            expect(randResults[1][1]).toBe(6);
        });

        it('returns null if not collected', () => {
            bcdice.setCollectRandResult(false);
            bcdice.dice_command();

            expect(bcdice.getRandResults()).toBe(null);
        });
    });
});
