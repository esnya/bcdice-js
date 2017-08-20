try {
    const BCDice = require('../../dist/bcdice');

    const bcdice = new BCDice();

    bcdice.setMessage('2d');
    console.log('2d', bcdice.dice_command());

    bcdice.setMessage('2d>=7');
    console.log('2d>=7', bcdice.dice_command());

    bcdice.setGameByTitle('KanColle');
    bcdice.setMessage('BT2');
    console.log('BT2', bcdice.dice_command());
    
    bcdice.setGameByTitle('SwordWorld2_0');
    bcdice.setMessage('K20');
    console.log('K20', bcdice.dice_command());
} catch(e) {
    console.trace(e);
}
