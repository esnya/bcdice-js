# bcdice-js [![npm version](https://badge.fury.io/js/bcdice-js.svg)](https://badge.fury.io/js/bcdice-js)
[BCDice](https://github.com/torgtaitai/BCDice) for JavaScript (Browser/Node.js).
Transpiled by [Opal](http://opalrb.org/).

## Examples
- Node.js (CommonJS):
  [examples/node](examples/node)
- Browser:
  [examples/browser](examples/browser)

## Usage
1. Install with npm
    ```bash
    $ npm install --save bcdice-js
    ```
2. Import the library
  - CommonJS
    ```js
      const BCDice = require('bcdice-js');
    ```

  - ES Module
    ```js
    import BCDice from 'bcdice-js'
    ```

3. Create BCDice instance
    ```js
    const bcdice = new BCDice();
    ```

4. Set message and execute
    ```js
    bcdice.setMessage('2d');
    console.log(bcdice.dice_command());
    ```

## License
MIT License

- BCDice: [Modified BSD license](https://github.com/torgtaitai/BCDice)
