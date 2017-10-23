var irreducible = require('./irreducible.js');

module.exports = irreducible('RegExp', function (x) { return x instanceof RegExp; });
