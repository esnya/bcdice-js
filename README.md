# bcdice-js
[![npm package](https://img.shields.io/npm/v/bcdice-js.svg?style=flat-square)](https://www.npmjs.org/package/bcdice-js)
[![Build Status](https://img.shields.io/travis/ukatama/bcdice-js/master.svg?style=flat-square)](https://travis-ci.org/ukatama/bcdice-js)
[![PeerDependencies](https://img.shields.io/david/peer/ukatama/bcdice-js.svg?style=flat-square)](https://david-dm.org/ukatama/bcdice-js#info=peerDependencies&view=list)
[![Dependencies](https://img.shields.io/david/ukatama/bcdice-js.svg?style=flat-square)](https://david-dm.org/ukatama/bcdice-js)
[![DevDependencies](https://img.shields.io/david/dev/ukatama/bcdice-js.svg?style=flat-square)](https://david-dm.org/ukatama/bcdice-js#info=devDependencies&view=list)

[BCDice](https://github.com/torgtaitai/BCDice) for JavaScript (Browser/Node.js).
Transpiled by [Opal](http://opalrb.org/).

## Examples
- Node.js (CommonJS):
  [examples/node](examples/node)
- Browser:
  [examples/browser](examples/browser)

## Usage
1. Install
    ```bash
    $ npm install --save bcdice-js
    ```

2. Import
    ```js
    import BCDice from 'bcdice-js'; // ES Modules
    // or
    const BCDice = require('bcdice-js').BCDice; // CommonJS
    ```

3. Create BCDice instance
    ```js
    const bcdice = new BCDice();
    ```

4. Set dicebot
    ```js
    bcdice.setGameByTitle('SwordWorld2_0'); // Default: 'DiceBot'
    ```

4. Set message and execute
    ```js
    bcdice.setMessage('2d');
    console.log(bcdice.dice_command());
    ```

## Contribution
- Open [Issue](https://github.com/ukatama/bcdice-js/issues) or [Pull Request](https://github.com/ukatama/bcdice-js/pulls)
- Supported Language
  - English
  - Japanese(日本語)

## License
MIT License

- BCDice: [Modified BSD license](https://github.com/torgtaitai/BCDice)

## Changelog
[CHANGELOG.md](https://github.com/ukatama/bcdice-js/blob/master/CHANGELOG.md)
