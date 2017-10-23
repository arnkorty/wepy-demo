var isType = require('./isType.js');

module.exports = function isUnion(x) {
  return isType(x) && ( x.meta.kind === 'union' );
};