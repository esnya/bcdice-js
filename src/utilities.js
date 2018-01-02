import Opal from './opal';

export function isNil(value) {
  return value === null || value === Opal.nil
}

export function nil2null(value) {
  return isNil(value) ? null : value;
}
