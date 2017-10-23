var irreducible = require('./irreducible.js');

module.exports = irreducible('Error', function (x) { return x instanceof Error; });
