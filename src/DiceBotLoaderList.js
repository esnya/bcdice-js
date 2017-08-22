import '../lib/bcdice.ruby.js';
import opal from './opal';
import DiceBotLoader from './DiceBotLoader';
import { isNil } from './utilities';

export default class DiceBotLoaderList {
    static find(gameTitle) {
        const loader = opal(Opal => Opal.DiceBotLoaderList.$find(gameTitle));
        if (isNil(loader)) return null;

        return new DiceBotLoader(loader);
    }
}
