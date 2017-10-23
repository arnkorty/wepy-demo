var isFunction = require('./isFunction.js');
var isObject = require('./isObject.js');

module.exports = function isType(x) {
  return isFunction(x) && isObject(x.meta);
};