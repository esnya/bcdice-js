import Opal from './opal';

export default class DiceBotResolver {
  static setCustomLoader(loader, async) {
    Opal.DiceBotResolver.$setCustomLoader(loader, async || false)
  }

  static isAsync() {
    return Opal.DiceBotResolver['$async?']()
  }
}
