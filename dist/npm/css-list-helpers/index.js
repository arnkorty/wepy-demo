var t = require('./../tcomb/index.js');

var Options = t.struct({
	last: t.maybe(t.Boolean)
});

var helpers = {

	split: function(value, separators, options) {
		return split(value, separators, options || {});
	},

	splitBySpaces: t.func(t.String, t.Array).of(
		function(value) {
			var spaces = [' ', '\n', '\t'];
			return helpers.split(value, spaces);
		}
	),

	splitByCommas: t.func(t.String, t.Array).of(
		function(value) {
			var comma = ',';
			return helpers.split(value, [comma], { last: true });
		}
	)

};

var split = t.func([t.String, t.Array, Options], t.Array).of(
	function(value, separators, options) {
		var array   = [];
		var current = '';
		var split   = false;

		var func    = 0;
		var quote   = false;
		var escape  = false;

		for (var i = 0; i < value.length; i++) {
			var char = value[i];

			if (quote) {
				if (escape) {
					escape = false;
				} else if (char === '\\') {
					escape = true;
				} else if (char === quote) {
					quote = false;
				}
			} else if (char === '"' || char === '\'') {
				quote = char;
			} else if (char === '(') {
				func += 1;
			} else if (char === ')') {
				if (func > 0) {
					func -= 1;
				}
			} else if (func === 0) {
				if (separators.indexOf(char) !== -1) {
					split = true;
				}
			}

			if (split) {
				if (current !== '') {
					array.push(current.trim());
				}
				current = '';
				split = false;
			} else {
				current += char;
			}
		}

		if (options.last || current !== '') {
			array.push(current.trim());
		}
		return array;
	}
);

module.exports = helpers;
