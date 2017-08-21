import { DiceBotLoaderList as RubyDiceBotLoaderList } from '../dist/bcdice.ruby.js';
import DiceBotLoader from './DiceBotLoader';
import { isNil } from './utilities';

export default class DiceBotLoaderList {
    static find(gameTitle) {
        const loader = RubyDiceBotLoaderList.$find(gameTitle);
        if (isNil(loader)) return null;

        return new DiceBotLoader(loader);
    }
}
