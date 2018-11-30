function savaBuiltinObjects() {
  const BuiltinObjects = [
    Array,
    Boolean,
    Function,
    Number,
    RegExp,
    String,
  ];

  function callback(obj) {
    return {
      obj,
      keys: Object.getOwnPropertyNames(obj),
    };
  }

  return BuiltinObjects.map(callback).concat(BuiltinObjects.map(o => o.prototype).map(callback));
}

function refineOpalPrototype(saved) {
  saved.forEach(({ obj, keys }) => {
    Object.getOwnPropertyNames(obj)
      .filter(key => keys.indexOf(key) < 0)
      .forEach((key) => {
        // Reflect.deleteProperty(obj, key);
        Object.defineProperty(obj, key, {
          enumerable: false,
          configurable: false,
          writable: true,
          value: obj[key],
        });
      });
  });
}

function init() {
  const saved = savaBuiltinObjects();

  // eslint-disable-next-line global-require
  const Opal = require('../lib/opal.ruby.js');

  refineOpalPrototype(saved);

  return Opal;
}
export default init();
