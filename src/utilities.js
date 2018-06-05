import opal from './opal';

export function isNil(value) {
  return opal(Opal => value === null || value === Opal.nil);
}

export function nil2null(value) {
  return isNil(value) ? null : value;
}
