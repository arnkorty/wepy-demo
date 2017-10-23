var isNil = require('./isNil.js');
var isString = require('./isString.js');

module.exports = function isTypeName(name) {
  return isNil(name) || isString(name);
};