jest.autoMockOff();

const fs = require('fs');
const path = require('path');

const DataDir = path.join(__dirname, '../BCDice/src/test/data');

describe('Original BCDice Test', () => {
  const files = fs.readdirSync(DataDir)
    .filter(file => file.match(/\.txt$/))
    .filter(file => ![
      // Test Failed
      '_InsaneScp.txt',
      'AceKillerGene.txt',
      'Airgetlamh.txt',
      'Alsetto.txt',
      'Avandner.txt',
      'BeginningIdol.txt',
      'BeginningIdol_Korean.txt',
      'BladeOfArcana.txt',
      'BlindMythos.txt',
      'BloodMoon.txt',
      'ColossalHunter.txt',
      'Cthulhu7th.txt',
      'Cthulhu7th_Korean.txt',
      'DarkDaysDrive.txt',
      'DetatokoSaga.txt',
      'DetatokoSaga_Korean.txt',
      'Dracurouge.txt',
      'Dracurouge_Korean.txt',
      'EarthDawn.txt',
      'EarthDawn3.txt',
      'EarthDawn4.txt',
      'EclipsePhase.txt',
      'Elysion.txt',
      'FilledWith.txt',
      'GardenOrder.txt',
      'GurpsFW.txt',
      'IthaWenUa.txt',
      'Kamigakari.txt',
      'KillDeathBusiness.txt',
      'KillDeathBusiness_Korean.txt',
      'LogHorizon.txt',
      'LogHorizon_Korean.txt',
      'MagicaLogia.txt',
      'MetalHeadExtream.txt',
      'OneWayHeroics.txt',
      'Oukahoushin3rd.txt',
      'Peekaboo.txt',
      'PlotTest.txt',
      'Ryutama.txt',
      'ShinMegamiTenseiKakuseihen.txt',
      'Satasupe.txt',
      'Skynauts.txt',
      'Strave.txt',
      'SwordWorld2_0.txt',
      'SwordWorld2_5.txt',
      'Warhammer.txt',
      'None.txt',
      'SevenFortressMobius.txt',
      'NightWizard.txt',
      'NightWizard3rd.txt',
      'Postman.txt',
      'StellarKnights.txt',
      'WorldOfDarkness.txt',

      // Execution Error
      'CthulhuTech.txt',
    ].some(a => a === file));
  files.forEach((file) => {
    const gameType = file.replace(/\.txt$/, '');
    describe(gameType, () => {
      fs.readFileSync(path.join(DataDir, file)).toString()
        .replace(/\r/g, '')
        .split(/=+\n/g)
        .filter(a => a)
        .forEach((test) => {
          const m = test.match(/input:\n((.|\n)*)?output:\n((.|\n)*)rand:(.*)\n/);
          it('should be valid test', () => expect(m).toBeTruthy());

          const input = m[1].replace(/\n$/m, '');
          const output = m[3].replace(/\n$/m, '');
          const rand = m[5].replace(/\n$/m, '');
          // console.log({ input, output, rand });

          const BCDice = require('./BCDice').default;
          const bcdice = new BCDice();

          it('should executes command', () => {
            bcdice.setRandomValues(rand.split(/,/g).map(a => a.split(/\//g)));
            bcdice.setTest(true);

            bcdice.setGameByTitle(gameType);
            bcdice.setMessage(input);

            // expect(bcdice.getGameType()).toEqual(gameType);

            const [result, isSecret] = bcdice.diceCommand();
            // console.log({output, result: `${bcdice.getGameType()} ${result}` });

            const resultMessage = result === '1'
              ? `${input}\n`
              : `${input}\n${bcdice.getGameType().replace(/:Korean/, '')} ${result.replace(/\r/g, '')}${isSecret ? '###secret dice###' : ''}`;
            expect(resultMessage).toEqual(`${input}\n${output}`);
          });
        });
    });
  });
});
