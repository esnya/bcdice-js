const TargetClass = [
    Array,
    Boolean,
    Function,
    Number,
    RegExp,
    String,
];

function restoreOriginal(originalKeys) {
    TargetClass.forEach(targetClass => {
        Object.keys(targetClass.prototype)
            .filter(key => originalKeys[targetClass.name].indexOf(key) < 0)
            .forEach(key => {
                // eslint-disable-next-line no-param-reassign
                delete targetClass.prototype[key];
            });
    });
}

function backupOriginalKeys() {
    const originalKeys = {};

    TargetClass.forEach(targetClass => {
        originalKeys[targetClass.name] = Object.keys(targetClass.prototype);
    });

    return originalKeys;
}

const OpalPrototypes = {};
function loadOpal() {
    TargetClass.forEach(targetClass => {
        Object.assign(targetClass.prototype, OpalPrototypes[targetClass.name]);
    });
}
function backupOpalKeys() {
    TargetClass.forEach(targetClass => {
        OpalPrototypes[targetClass.name] = Object.assign({}, targetClass.prototype);
    });
}

function init() {
    const originalKeys = backupOriginalKeys();

    // eslint-disable-next-line
    const Opal = require('../lib/opal.ruby.js');
    backupOpalKeys();

    restoreOriginal(originalKeys);
}
init();

module.exports = function opal(callback) {
    const originalKeys = backupOriginalKeys();

    try {
        loadOpal();

        // eslint-disable-next-line
        const result = callback(Opal);

        restoreOriginal(originalKeys);

        return result;
    } catch (e) {
        restoreOriginal(originalKeys);
        throw e;
    }
};
