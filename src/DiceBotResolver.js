import opal from './opal';

export default class DiceBotResolver {
    static setCustomLoader(loader, async) {
        opal(Opal => Opal.DiceBotResolver.$setCustomLoader(loader, async || false));
    }

    static isAsync() {
        return opal(Opal => Opal.DiceBotResolver['$async?']());
    }
}
