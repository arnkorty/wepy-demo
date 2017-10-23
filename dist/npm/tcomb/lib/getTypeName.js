var isType = require('./isType.js');
var getFunctionName = require('./getFunctionName.js');

module.exports = function getTypeName(constructor) {
  if (isType(constructor)) {
    return constructor.displayName;
  }
  return getFunctionName(constructor);
};