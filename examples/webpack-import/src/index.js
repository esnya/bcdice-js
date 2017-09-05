// import BCDice, { DiceBotLoader, DiceBotResolver } from 'bcdice-js';
// import webpackDynamicLoader from 'bcdice-js/lib/webpackDynamicLoader';
import BCDice, { DiceBotLoader, DiceBotResolver } from '../../../';

function customLoader(filename) {
    // return import(`bcdice-js/lib/diceBot/${filename}`);
    return import(`../../../lib/diceBot/${filename}`);
}
DiceBotResolver.setCustomLoader(customLoader, true);

const diceBotElement = document.getElementById('diceBot');
const inputElement = document.getElementById('input');
const rollElement = document.getElementById('roll');
const clearElement = document.getElementById('clear');
const resultsElement = document.getElementById('results');

const diceBots = DiceBotLoader.collectDiceBotDescriptions().forEach(desc => {
    const gameType = desc[0];

    const optionElement = document.createElement('option');
    optionElement.value = gameType;
    optionElement.innerText = gameType;

    diceBotElement.appendChild(optionElement);
});

rollElement.addEventListener('click', () => {
    const gameType = diceBotElement.value || 'DiceBot';
    const message = inputElement.value;
    console.log({ gameType, message });

    const bcdice = new BCDice();
    bcdice.setGameByTitle(gameType).then(() => {
        bcdice.setMessage(message);
        const result = bcdice.dice_command();

        const resultElement = document.createElement('p');
        resultElement.innerText = result[0];
        resultsElement.appendChild(resultElement);
    });
});

clearElement.addEventListener('click', () => {
    Array.prototype.map.call(resultsElement.children, (child) => resultsElement.removeChild(child));
});
