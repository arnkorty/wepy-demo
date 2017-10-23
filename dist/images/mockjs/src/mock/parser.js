'use strict';

/*
	## Parser

	解析数据模板（属性名部分）。

	* Parser.parse( name )
		
		```json
		{
			parameters: [ name, inc, range, decimal ],
			rnage: [ min , max ],

			min: min,
			max: max,
			count : count,

			decimal: decimal,
			dmin: dmin,
			dmax: dmax,
			dcount: dcount
		}
		```
 */

var Constant = require('./constant.js');
var Random = require('./random/index.js');

/* jshint -W041 */
module.exports = {
	parse: function parse(name) {
		name = name == undefined ? '' : name + '';

		var parameters = (name || '').match(Constant.RE_KEY);

		var range = parameters && parameters[3] && parameters[3].match(Constant.RE_RANGE);
		var min = range && range[1] && parseInt(range[1], 10); // || 1
		var max = range && range[2] && parseInt(range[2], 10); // || 1
		// repeat || min-max || 1
		// var count = range ? !range[2] && parseInt(range[1], 10) || Random.integer(min, max) : 1
		var count = range ? !range[2] ? parseInt(range[1], 10) : Random.integer(min, max) : undefined;

		var decimal = parameters && parameters[4] && parameters[4].match(Constant.RE_RANGE);
		var dmin = decimal && decimal[1] && parseInt(decimal[1], 10); // || 0,
		var dmax = decimal && decimal[2] && parseInt(decimal[2], 10); // || 0,
		// int || dmin-dmax || 0
		var dcount = decimal ? !decimal[2] && parseInt(decimal[1], 10) || Random.integer(dmin, dmax) : undefined;

		var result = {
			// 1 name, 2 inc, 3 range, 4 decimal
			parameters: parameters,
			// 1 min, 2 max
			range: range,
			min: min,
			max: max,
			// min-max
			count: count,
			// 是否有 decimal
			decimal: decimal,
			dmin: dmin,
			dmax: dmax,
			// dmin-dimax
			dcount: dcount
		};

		for (var r in result) {
			if (result[r] != undefined) return result;
		}

		return {};
	}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlci5qcyJdLCJuYW1lcyI6WyJDb25zdGFudCIsInJlcXVpcmUiLCJSYW5kb20iLCJtb2R1bGUiLCJleHBvcnRzIiwicGFyc2UiLCJuYW1lIiwidW5kZWZpbmVkIiwicGFyYW1ldGVycyIsIm1hdGNoIiwiUkVfS0VZIiwicmFuZ2UiLCJSRV9SQU5HRSIsIm1pbiIsInBhcnNlSW50IiwibWF4IiwiY291bnQiLCJpbnRlZ2VyIiwiZGVjaW1hbCIsImRtaW4iLCJkbWF4IiwiZGNvdW50IiwicmVzdWx0IiwiciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLElBQUlBLFdBQVdDLFFBQVEsWUFBUixDQUFmO0FBQ0EsSUFBSUMsU0FBU0QsUUFBUSxXQUFSLENBQWI7O0FBRUE7QUFDQUUsT0FBT0MsT0FBUCxHQUFpQjtBQUNoQkMsUUFBTyxlQUFTQyxJQUFULEVBQWU7QUFDckJBLFNBQU9BLFFBQVFDLFNBQVIsR0FBb0IsRUFBcEIsR0FBMEJELE9BQU8sRUFBeEM7O0FBRUEsTUFBSUUsYUFBYSxDQUFDRixRQUFRLEVBQVQsRUFBYUcsS0FBYixDQUFtQlQsU0FBU1UsTUFBNUIsQ0FBakI7O0FBRUEsTUFBSUMsUUFBUUgsY0FBY0EsV0FBVyxDQUFYLENBQWQsSUFBK0JBLFdBQVcsQ0FBWCxFQUFjQyxLQUFkLENBQW9CVCxTQUFTWSxRQUE3QixDQUEzQztBQUNBLE1BQUlDLE1BQU1GLFNBQVNBLE1BQU0sQ0FBTixDQUFULElBQXFCRyxTQUFTSCxNQUFNLENBQU4sQ0FBVCxFQUFtQixFQUFuQixDQUEvQixDQU5xQixDQU1pQztBQUN0RCxNQUFJSSxNQUFNSixTQUFTQSxNQUFNLENBQU4sQ0FBVCxJQUFxQkcsU0FBU0gsTUFBTSxDQUFOLENBQVQsRUFBbUIsRUFBbkIsQ0FBL0IsQ0FQcUIsQ0FPaUM7QUFDckQ7QUFDQTtBQUNELE1BQUlLLFFBQVFMLFFBQVEsQ0FBQ0EsTUFBTSxDQUFOLENBQUQsR0FBWUcsU0FBU0gsTUFBTSxDQUFOLENBQVQsRUFBbUIsRUFBbkIsQ0FBWixHQUFxQ1QsT0FBT2UsT0FBUCxDQUFlSixHQUFmLEVBQW9CRSxHQUFwQixDQUE3QyxHQUF3RVIsU0FBcEY7O0FBRUEsTUFBSVcsVUFBVVYsY0FBY0EsV0FBVyxDQUFYLENBQWQsSUFBK0JBLFdBQVcsQ0FBWCxFQUFjQyxLQUFkLENBQW9CVCxTQUFTWSxRQUE3QixDQUE3QztBQUNBLE1BQUlPLE9BQU9ELFdBQVdBLFFBQVEsQ0FBUixDQUFYLElBQXlCSixTQUFTSSxRQUFRLENBQVIsQ0FBVCxFQUFxQixFQUFyQixDQUFwQyxDQWJxQixDQWF3QztBQUM3RCxNQUFJRSxPQUFPRixXQUFXQSxRQUFRLENBQVIsQ0FBWCxJQUF5QkosU0FBU0ksUUFBUSxDQUFSLENBQVQsRUFBcUIsRUFBckIsQ0FBcEMsQ0FkcUIsQ0Fjd0M7QUFDNUQ7QUFDRCxNQUFJRyxTQUFTSCxVQUFVLENBQUNBLFFBQVEsQ0FBUixDQUFELElBQWVKLFNBQVNJLFFBQVEsQ0FBUixDQUFULEVBQXFCLEVBQXJCLENBQWYsSUFBMkNoQixPQUFPZSxPQUFQLENBQWVFLElBQWYsRUFBcUJDLElBQXJCLENBQXJELEdBQWtGYixTQUEvRjs7QUFFQSxNQUFJZSxTQUFTO0FBQ1o7QUFDQWQsZUFBWUEsVUFGQTtBQUdaO0FBQ0FHLFVBQU9BLEtBSks7QUFLWkUsUUFBS0EsR0FMTztBQU1aRSxRQUFLQSxHQU5PO0FBT1o7QUFDQUMsVUFBT0EsS0FSSztBQVNaO0FBQ0FFLFlBQVNBLE9BVkc7QUFXWkMsU0FBTUEsSUFYTTtBQVlaQyxTQUFNQSxJQVpNO0FBYVo7QUFDQUMsV0FBUUE7QUFkSSxHQUFiOztBQWlCQSxPQUFLLElBQUlFLENBQVQsSUFBY0QsTUFBZCxFQUFzQjtBQUNyQixPQUFJQSxPQUFPQyxDQUFQLEtBQWFoQixTQUFqQixFQUE0QixPQUFPZSxNQUFQO0FBQzVCOztBQUVELFNBQU8sRUFBUDtBQUNBO0FBekNlLENBQWpCIiwiZmlsZSI6InBhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5cdCMjIFBhcnNlclxuXG5cdOino+aekOaVsOaNruaooeadv++8iOWxnuaAp+WQjemDqOWIhu+8ieOAglxuXG5cdCogUGFyc2VyLnBhcnNlKCBuYW1lIClcblx0XHRcblx0XHRgYGBqc29uXG5cdFx0e1xuXHRcdFx0cGFyYW1ldGVyczogWyBuYW1lLCBpbmMsIHJhbmdlLCBkZWNpbWFsIF0sXG5cdFx0XHRybmFnZTogWyBtaW4gLCBtYXggXSxcblxuXHRcdFx0bWluOiBtaW4sXG5cdFx0XHRtYXg6IG1heCxcblx0XHRcdGNvdW50IDogY291bnQsXG5cblx0XHRcdGRlY2ltYWw6IGRlY2ltYWwsXG5cdFx0XHRkbWluOiBkbWluLFxuXHRcdFx0ZG1heDogZG1heCxcblx0XHRcdGRjb3VudDogZGNvdW50XG5cdFx0fVxuXHRcdGBgYFxuICovXG5cbnZhciBDb25zdGFudCA9IHJlcXVpcmUoJy4vY29uc3RhbnQnKVxudmFyIFJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tLycpXG5cbi8qIGpzaGludCAtVzA0MSAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHBhcnNlOiBmdW5jdGlvbihuYW1lKSB7XG5cdFx0bmFtZSA9IG5hbWUgPT0gdW5kZWZpbmVkID8gJycgOiAobmFtZSArICcnKVxuXG5cdFx0dmFyIHBhcmFtZXRlcnMgPSAobmFtZSB8fCAnJykubWF0Y2goQ29uc3RhbnQuUkVfS0VZKVxuXG5cdFx0dmFyIHJhbmdlID0gcGFyYW1ldGVycyAmJiBwYXJhbWV0ZXJzWzNdICYmIHBhcmFtZXRlcnNbM10ubWF0Y2goQ29uc3RhbnQuUkVfUkFOR0UpXG5cdFx0dmFyIG1pbiA9IHJhbmdlICYmIHJhbmdlWzFdICYmIHBhcnNlSW50KHJhbmdlWzFdLCAxMCkgLy8gfHwgMVxuXHRcdHZhciBtYXggPSByYW5nZSAmJiByYW5nZVsyXSAmJiBwYXJzZUludChyYW5nZVsyXSwgMTApIC8vIHx8IDFcblx0XHRcdC8vIHJlcGVhdCB8fCBtaW4tbWF4IHx8IDFcblx0XHRcdC8vIHZhciBjb3VudCA9IHJhbmdlID8gIXJhbmdlWzJdICYmIHBhcnNlSW50KHJhbmdlWzFdLCAxMCkgfHwgUmFuZG9tLmludGVnZXIobWluLCBtYXgpIDogMVxuXHRcdHZhciBjb3VudCA9IHJhbmdlID8gIXJhbmdlWzJdID8gcGFyc2VJbnQocmFuZ2VbMV0sIDEwKSA6IFJhbmRvbS5pbnRlZ2VyKG1pbiwgbWF4KSA6IHVuZGVmaW5lZFxuXG5cdFx0dmFyIGRlY2ltYWwgPSBwYXJhbWV0ZXJzICYmIHBhcmFtZXRlcnNbNF0gJiYgcGFyYW1ldGVyc1s0XS5tYXRjaChDb25zdGFudC5SRV9SQU5HRSlcblx0XHR2YXIgZG1pbiA9IGRlY2ltYWwgJiYgZGVjaW1hbFsxXSAmJiBwYXJzZUludChkZWNpbWFsWzFdLCAxMCkgLy8gfHwgMCxcblx0XHR2YXIgZG1heCA9IGRlY2ltYWwgJiYgZGVjaW1hbFsyXSAmJiBwYXJzZUludChkZWNpbWFsWzJdLCAxMCkgLy8gfHwgMCxcblx0XHRcdC8vIGludCB8fCBkbWluLWRtYXggfHwgMFxuXHRcdHZhciBkY291bnQgPSBkZWNpbWFsID8gIWRlY2ltYWxbMl0gJiYgcGFyc2VJbnQoZGVjaW1hbFsxXSwgMTApIHx8IFJhbmRvbS5pbnRlZ2VyKGRtaW4sIGRtYXgpIDogdW5kZWZpbmVkXG5cblx0XHR2YXIgcmVzdWx0ID0ge1xuXHRcdFx0Ly8gMSBuYW1lLCAyIGluYywgMyByYW5nZSwgNCBkZWNpbWFsXG5cdFx0XHRwYXJhbWV0ZXJzOiBwYXJhbWV0ZXJzLFxuXHRcdFx0Ly8gMSBtaW4sIDIgbWF4XG5cdFx0XHRyYW5nZTogcmFuZ2UsXG5cdFx0XHRtaW46IG1pbixcblx0XHRcdG1heDogbWF4LFxuXHRcdFx0Ly8gbWluLW1heFxuXHRcdFx0Y291bnQ6IGNvdW50LFxuXHRcdFx0Ly8g5piv5ZCm5pyJIGRlY2ltYWxcblx0XHRcdGRlY2ltYWw6IGRlY2ltYWwsXG5cdFx0XHRkbWluOiBkbWluLFxuXHRcdFx0ZG1heDogZG1heCxcblx0XHRcdC8vIGRtaW4tZGltYXhcblx0XHRcdGRjb3VudDogZGNvdW50XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgciBpbiByZXN1bHQpIHtcblx0XHRcdGlmIChyZXN1bHRbcl0gIT0gdW5kZWZpbmVkKSByZXR1cm4gcmVzdWx0XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHt9XG5cdH1cbn0iXX0=