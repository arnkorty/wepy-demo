var irreducible = require('./irreducible.js');

module.exports = irreducible('Date', function (x) { return x instanceof Date; });
