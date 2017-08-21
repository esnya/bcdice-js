import BCDice, { DiceBotLoader } from 'bcdice-js';

const diceBotElement = document.getElementById('diceBot');
const inputElement = document.getElementById('input');
const rollElement = document.getElementById('roll');
const clearElement = document.getElementById('clear');
const resultsElement = document.getElementById('results');

const diceBotTable = {};
const diceBots = DiceBotLoader.collectDiceBots().forEach(diceBot => {
    const gameType = diceBot.gameType();

    diceBotTable[gameType] = diceBot;

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
    bcdice.setDiceBot(diceBotTable[gameType]);

    bcdice.setMessage(message);
    const result = bcdice.dice_command();

    const resultElement = document.createElement('p');
    resultElement.innerText = result[0];
    resultsElement.appendChild(resultElement);
});

clearElement.addEventListener('click', () => {
    Array.prototype.map.call(resultsElement.children, (child) => resultsElement.removeChild(child));
});
