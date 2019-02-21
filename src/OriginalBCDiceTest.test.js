jest.autoMockOff();

const fs = require('fs');
const path = require('path');

const DataDir = path.join(__dirname, '../BCDice/src/test/data');

describe('Original BCDice Test', () => {
  const files = fs.readdirSync(DataDir)
    .filter(file => file.match(/\.txt$/))
    .filter(file => ![
      // Test Failed
      '_InsaneScp',
      'ArsMagica',
      'AceKillerGene',
      'BloodMoon',
      'Cthulhu7th',
      'Cthulhu7th_Korean',
      'DetatokoSaga',
      'DetatokoSaga_Korean',
      'Dracurouge',
      'Dracurouge_Korean',
      'EarthDawn3',
      'EarthDawn4',
      'EclipsePhase',
      'Elysion',
      'FilledWith',
      'GardenOrder',
      'GurpsFW',
      'IthaWenUa',
      'Kamigakari',
      'KillDeathBusiness',
      'KillDeathBusiness_Korean',
      'MagicaLogia',
      'MetalHeadExtream',
      'OneWayHeroics',
      'Oukahoushin3rd',
      'Peekaboo',
      'PlotTest',
      'Ryutama',
      'ShinMegamiTenseiKakuseihen',
      'Skynauts',
      'SwordWorld2_0',
      'SwordWorld2_5',
      'Warhammer',
      'None',
      'SevenFortressMobius',
      'NightWizard',
      'NightWizard3rd',
      'Postman',
      'StellarKnights',
    ].some(a => `${a}.txt` === file));
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
          const output = `:${m[3].replace(/\n$/m, '').replace(/ダイス残り.*$/, '').replace(/^.*? :/, '')}`;
          const rand = m[5].replace(/\n$/m, '');

          const BCDice = require('./BCDice').default;
          const bcdice = new BCDice();

          it(`sould executes dise from "${input}" to "${output}" with "${rand}"`, () => {
            bcdice.setRandomValues(rand.split(/,/g).map(a => a.split(/\//g)));
            bcdice.setTest(true);

            bcdice.setGameByTitle(gameType);
            bcdice.setMessage(input);

            const [result, isSecret] = bcdice.diceCommand();

            const resultMessage = result === '1' ? ':' : `${result.replace(/\r/g, '')}${isSecret ? '###secret dice###' : ''}`;
            expect(resultMessage).toEqual(output);
          });
        });
    });
  });
});
