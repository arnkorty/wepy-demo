var isType = require('./isType.js');

module.exports = function isStruct(x) {
  return isType(x) && ( x.meta.kind === 'struct' );
};