var isNil = require('./isNil.js');
var isArray = require('./isArray.js');

module.exports = function isObject(x) {
  return !isNil(x) && typeof x === 'object' && !isArray(x);
};