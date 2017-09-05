// import BCDice, { DiceBotLoader } from 'bcdice-js';
// import 'bcdice-js/lib/preload-dicebots'; // required on browser
import BCDice, { DiceBotLoader } from '../../../';
import '../../../lib/preload-dicebots';

const diceBotElement = document.getElementById('diceBot');
const inputElement = document.getElementById('input');
const rollElement = document.getElementById('roll');
const clearElement = document.getElementById('clear');
const resultsElement = document.getElementById('results');

const diceBotTable = {};
const diceBots = DiceBotLoader.collectDiceBots().forEach(diceBot => {
    const game = `${diceBot.gameType()}(${diceBot.gameName()})`;

    diceBotTable[game] = diceBot;

    const optionElement = document.createElement('option');
    optionElement.value = game;
    optionElement.innerText = game;

    diceBotElement.appendChild(optionElement);
});

rollElement.addEventListener('click', () => {
    const game = diceBotElement.value || 'DiceBot';
    const message = inputElement.value;
    console.log({ game, message });

    const bcdice = new BCDice();
    bcdice.setDiceBot(diceBotTable[game]);

    bcdice.setMessage(message);
    const result = bcdice.dice_command();

    const resultElement = document.createElement('p');
    resultElement.innerText = result[0];
    resultsElement.appendChild(resultElement);
});

clearElement.addEventListener('click', () => {
    Array.prototype.map.call(resultsElement.children, (child) => resultsElement.removeChild(child));
});
