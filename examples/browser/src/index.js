import BCDice from 'bcdice-js';

const diceBotElement = document.getElementById('diceBot');
const inputElement = document.getElementById('input');
const rollElement = document.getElementById('roll');
const clearElement = document.getElementById('clear');
const resultsElement = document.getElementById('results');

rollElement.addEventListener('click', () => {
    const bcdice = new BCDice;
    bcdice.setGameByTitle(diceBotElement.value || 'DiceBot');

    bcdice.setMessage(inputElement.value);
    const result = bcdice.dice_command();

    const resultElement = document.createElement('p');
    resultElement.innerText = result[0];
    resultsElement.appendChild(resultElement);
});

clearElement.addEventListener('click', () => {
    Array.prototype.map.call(resultsElement.children, (child) => resultsElement.removeChild(child));
});
