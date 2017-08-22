const OpalFunctionPrototype = {};
const FunctionPrototype = Function.prototype;
const FunctionPrototypeKeys = Object.keys(FunctionPrototype);

// eslint-disable-next-line
const Opal = require('../dist/opal.ruby.js');
Object.keys(Function.prototype).forEach(key => {
    if (FunctionPrototypeKeys.indexOf(key) < 0) {
        OpalFunctionPrototype[key] = Function.prototype[key];
        delete Function.prototype[key];
    }
});

function up() {
    Object.assign(Function.prototype, OpalFunctionPrototype);
}
function down() {
    Object.keys(Function.prototype).forEach(key => {
        if (FunctionPrototypeKeys.indexOf(key) < 0) delete Function.prototype[key];
    });
}

module.exports = function opal(callback) {
    try {
        up();

        // eslint-disable-next-line
        const result = callback(Opal);

        down();

        return result;
    } catch (e) {
        down();
        throw e;
    }
};
