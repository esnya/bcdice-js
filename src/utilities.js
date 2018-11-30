import Opal from './opal';

export function isNil(value) {
  return value === null || value === Opal.nil;
}

export function nil2null(value) {
  return isNil(value) ? null : value;
}

export function proxy(rubyObject) {
  function has(target, name) {
    return (name in target) || (`$${name}` in rubyObject) || (name in rubyObject);
  }

  function rubyMember(target, name) {
    if (typeof target[name] === 'function') return (...args) => nil2null(target[name](...args));
    return target[name];
  }

  function get(target, name) {
    const rubyName = `$${name}`;
    if (name in target) return target[name];
    if (rubyName in rubyObject) return rubyMember(rubyObject, rubyName);
    if (name in rubyObject) return rubyMember(rubyObject, name);
    return undefined;
  }

  return target => new Proxy(target, {
    has,
    get,
  });
}
