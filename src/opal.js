const TargetClass = [
    Array,
    Boolean,
    Function,
    Number,
    RegExp,
    String,
];

const OriginalKeys = {};
function restoreOriginal() {
    TargetClass.forEach(targetClass => {
        Object.keys(targetClass.prototype)
            .filter(key => OriginalKeys[targetClass.name].indexOf(key) < 0)
            .forEach(key => {
                // eslint-disable-next-line no-param-reassign
                delete targetClass.prototype[key];
            });
    });
}

function backupOriginalKeys() {
    TargetClass.forEach(targetClass => {
        OriginalKeys[targetClass.name] = Object.keys(targetClass.prototype);
    });
}

const OpalPrototypes = {};
function restoreOpal() {
    TargetClass.forEach(targetClass => {
        Object.assign(targetClass.prototype, OpalPrototypes[targetClass.name]);
    });
}
function backupOpalKeys() {
    TargetClass.forEach(targetClass => {
        OpalPrototypes[targetClass.name] = Object.assign({}, targetClass.prototype);
    });
}

backupOriginalKeys();
// eslint-disable-next-line
const Opal = require('../lib/opal.ruby.js');
backupOpalKeys();
restoreOriginal();

module.exports = function opal(callback) {
    try {
        restoreOpal();

        // eslint-disable-next-line
        const result = callback(Opal);

        restoreOriginal();

        return result;
    } catch (e) {
        restoreOriginal();
        throw e;
    }
};
