'use strict';

/*
    ## Helpers
*/

var Util = require('./../util.js');

module.exports = {
	// 把字符串的第一个字母转换为大写。
	capitalize: function capitalize(word) {
		return (word + '').charAt(0).toUpperCase() + (word + '').substr(1);
	},
	// 把字符串转换为大写。
	upper: function upper(str) {
		return (str + '').toUpperCase();
	},
	// 把字符串转换为小写。
	lower: function lower(str) {
		return (str + '').toLowerCase();
	},
	// 从数组中随机选取一个元素，并返回。
	pick: function pick(arr, min, max) {
		// pick( item1, item2 ... )
		if (!Util.isArray(arr)) {
			arr = [].slice.call(arguments);
			min = 1;
			max = 1;
		} else {
			// pick( [ item1, item2 ... ] )
			if (min === undefined) min = 1;

			// pick( [ item1, item2 ... ], count )
			if (max === undefined) max = min;
		}

		if (min === 1 && max === 1) return arr[this.natural(0, arr.length - 1)];

		// pick( [ item1, item2 ... ], min, max )
		return this.shuffle(arr, min, max);

		// 通过参数个数判断方法签名，扩展性太差！#90
		// switch (arguments.length) {
		// 	case 1:
		// 		// pick( [ item1, item2 ... ] )
		// 		return arr[this.natural(0, arr.length - 1)]
		// 	case 2:
		// 		// pick( [ item1, item2 ... ], count )
		// 		max = min
		// 			/* falls through */
		// 	case 3:
		// 		// pick( [ item1, item2 ... ], min, max )
		// 		return this.shuffle(arr, min, max)
		// }
	},
	/*
     打乱数组中元素的顺序，并返回。
     Given an array, scramble the order and return it.
 	    其他的实现思路：
         // https://code.google.com/p/jslibs/wiki/JavascriptTips
         result = result.sort(function() {
             return Math.random() - 0.5
         })
 */
	shuffle: function shuffle(arr, min, max) {
		arr = arr || [];
		var old = arr.slice(0),
		    result = [],
		    index = 0,
		    length = old.length;
		for (var i = 0; i < length; i++) {
			index = this.natural(0, old.length - 1);
			result.push(old[index]);
			old.splice(index, 1);
		}
		switch (arguments.length) {
			case 0:
			case 1:
				return result;
			case 2:
				max = min;
			/* falls through */
			case 3:
				min = parseInt(min, 10);
				max = parseInt(max, 10);
				return result.slice(0, this.natural(min, max));
		}
	},
	/*
     * Random.order(item, item)
     * Random.order([item, item ...])
 	    顺序获取数组中的元素
 	    [JSON导入数组支持数组数据录入](https://github.com/thx/RAP/issues/22)
 	    不支持单独调用！
 */
	order: function order(array) {
		order.cache = order.cache || {};

		if (arguments.length > 1) array = [].slice.call(arguments, 0);

		// options.context.path/templatePath
		var options = order.options;
		var templatePath = options.context.templatePath.join('.');

		var cache = order.cache[templatePath] = order.cache[templatePath] || {
			index: 0,
			array: array
		};

		return cache.array[cache.index++ % cache.array.length];
	}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHBlci5qcyJdLCJuYW1lcyI6WyJVdGlsIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJjYXBpdGFsaXplIiwid29yZCIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic3Vic3RyIiwidXBwZXIiLCJzdHIiLCJsb3dlciIsInRvTG93ZXJDYXNlIiwicGljayIsImFyciIsIm1pbiIsIm1heCIsImlzQXJyYXkiLCJzbGljZSIsImNhbGwiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJuYXR1cmFsIiwibGVuZ3RoIiwic2h1ZmZsZSIsIm9sZCIsInJlc3VsdCIsImluZGV4IiwiaSIsInB1c2giLCJzcGxpY2UiLCJwYXJzZUludCIsIm9yZGVyIiwiYXJyYXkiLCJjYWNoZSIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZVBhdGgiLCJjb250ZXh0Iiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUlBLElBQUlBLE9BQU9DLFFBQVEsU0FBUixDQUFYOztBQUVBQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2hCO0FBQ0FDLGFBQVksb0JBQVNDLElBQVQsRUFBZTtBQUMxQixTQUFPLENBQUNBLE9BQU8sRUFBUixFQUFZQyxNQUFaLENBQW1CLENBQW5CLEVBQXNCQyxXQUF0QixLQUFzQyxDQUFDRixPQUFPLEVBQVIsRUFBWUcsTUFBWixDQUFtQixDQUFuQixDQUE3QztBQUNBLEVBSmU7QUFLaEI7QUFDQUMsUUFBTyxlQUFTQyxHQUFULEVBQWM7QUFDcEIsU0FBTyxDQUFDQSxNQUFNLEVBQVAsRUFBV0gsV0FBWCxFQUFQO0FBQ0EsRUFSZTtBQVNoQjtBQUNBSSxRQUFPLGVBQVNELEdBQVQsRUFBYztBQUNwQixTQUFPLENBQUNBLE1BQU0sRUFBUCxFQUFXRSxXQUFYLEVBQVA7QUFDQSxFQVplO0FBYWhCO0FBQ0FDLE9BQU0sU0FBU0EsSUFBVCxDQUFjQyxHQUFkLEVBQW1CQyxHQUFuQixFQUF3QkMsR0FBeEIsRUFBNkI7QUFDbEM7QUFDQSxNQUFJLENBQUNoQixLQUFL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ciBVdGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHQvLyDmiorlrZfnrKbkuLLnmoTnrKzkuIDkuKrlrZfmr43ovazmjaLkuLrlpKflhpnjgIJcblx0Y2FwaXRhbGl6ZTogZnVuY3Rpb24od29yZCkge1xuXHRcdHJldHVybiAod29yZCArICcnKS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArICh3b3JkICsgJycpLnN1YnN0cigxKVxuXHR9LFxuXHQvLyDmiorlrZfnrKbkuLLovazmjaLkuLrlpKflhpnjgIJcblx0dXBwZXI6IGZ1bmN0aW9uKHN0cikge1xuXHRcdHJldHVybiAoc3RyICsgJycpLnRvVXBwZXJDYXNlKClcblx0fSxcblx0Ly8g5oqK5a2X56ym5Liy6L2s5o2i5Li65bCP5YaZ44CCXG5cdGxvd2VyOiBmdW5jdGlvbihzdHIpIHtcblx0XHRyZXR1cm4gKHN0ciArICcnKS50b0xvd2VyQ2FzZSgpXG5cdH0sXG5cdC8vIOS7juaVsOe7hOS4remaj+acuumAieWPluS4gOS4quWFg+e0oO+8jOW5tui/lOWbnuOAglxuXHRwaWNrOiBmdW5jdGlvbiBwaWNrKGFyciwgbWluLCBtYXgpIHtcblx0XHQvLyBwaWNrKCBpdGVtMSwgaXRlbTIgLi4uIClcblx0XHRpZiAoIVV0aWwuaXNBcnJheShhcnIpKSB7XG5cdFx0XHRhcnIgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylcblx0XHRcdG1pbiA9IDFcblx0XHRcdG1heCA9IDFcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGljayggWyBpdGVtMSwgaXRlbTIgLi4uIF0gKVxuXHRcdFx0aWYgKG1pbiA9PT0gdW5kZWZpbmVkKSBtaW4gPSAxXG5cblx0XHRcdC8vIHBpY2soIFsgaXRlbTEsIGl0ZW0yIC4uLiBdLCBjb3VudCApXG5cdFx0XHRpZiAobWF4ID09PSB1bmRlZmluZWQpIG1heCA9IG1pblxuXHRcdH1cblxuXHRcdGlmIChtaW4gPT09IDEgJiYgbWF4ID09PSAxKSByZXR1cm4gYXJyW3RoaXMubmF0dXJhbCgwLCBhcnIubGVuZ3RoIC0gMSldXG5cblx0XHQvLyBwaWNrKCBbIGl0ZW0xLCBpdGVtMiAuLi4gXSwgbWluLCBtYXggKVxuXHRcdHJldHVybiB0aGlzLnNodWZmbGUoYXJyLCBtaW4sIG1heClcblxuXHRcdC8vIOmAmui/h+WPguaVsOS4quaVsOWIpOaWreaWueazleetvuWQje+8jOaJqeWxleaAp+WkquW3ru+8gSM5MFxuXHRcdC8vIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdC8vIFx0Y2FzZSAxOlxuXHRcdC8vIFx0XHQvLyBwaWNrKCBbIGl0ZW0xLCBpdGVtMiAuLi4gXSApXG5cdFx0Ly8gXHRcdHJldHVybiBhcnJbdGhpcy5uYXR1cmFsKDAsIGFyci5sZW5ndGggLSAxKV1cblx0XHQvLyBcdGNhc2UgMjpcblx0XHQvLyBcdFx0Ly8gcGljayggWyBpdGVtMSwgaXRlbTIgLi4uIF0sIGNvdW50IClcblx0XHQvLyBcdFx0bWF4ID0gbWluXG5cdFx0Ly8gXHRcdFx0LyogZmFsbHMgdGhyb3VnaCAqL1xuXHRcdC8vIFx0Y2FzZSAzOlxuXHRcdC8vIFx0XHQvLyBwaWNrKCBbIGl0ZW0xLCBpdGVtMiAuLi4gXSwgbWluLCBtYXggKVxuXHRcdC8vIFx0XHRyZXR1cm4gdGhpcy5zaHVmZmxlKGFyciwgbWluLCBtYXgpXG5cdFx0Ly8gfVxuXHR9LFxuXHQvKlxuXHQgICAg5omT5Lmx5pWw57uE5Lit5YWD57Sg55qE6aG65bqP77yM5bm26L+U5Zue44CCXG5cdCAgICBHaXZlbiBhbiBhcnJheSwgc2NyYW1ibGUgdGhlIG9yZGVyIGFuZCByZXR1cm4gaXQuXG5cblx0ICAgIOWFtuS7lueahOWunueOsOaAnei3r++8mlxuXHQgICAgICAgIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvanNsaWJzL3dpa2kvSmF2YXNjcmlwdFRpcHNcblx0ICAgICAgICByZXN1bHQgPSByZXN1bHQuc29ydChmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgLSAwLjVcblx0ICAgICAgICB9KVxuXHQqL1xuXHRzaHVmZmxlOiBmdW5jdGlvbiBzaHVmZmxlKGFyciwgbWluLCBtYXgpIHtcblx0XHRhcnIgPSBhcnIgfHwgW11cblx0XHR2YXIgb2xkID0gYXJyLnNsaWNlKDApLFxuXHRcdFx0cmVzdWx0ID0gW10sXG5cdFx0XHRpbmRleCA9IDAsXG5cdFx0XHRsZW5ndGggPSBvbGQubGVuZ3RoO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdGluZGV4ID0gdGhpcy5uYXR1cmFsKDAsIG9sZC5sZW5ndGggLSAxKVxuXHRcdFx0cmVzdWx0LnB1c2gob2xkW2luZGV4XSlcblx0XHRcdG9sZC5zcGxpY2UoaW5kZXgsIDEpXG5cdFx0fVxuXHRcdHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0XG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdG1heCA9IG1pblxuXHRcdFx0XHRcdC8qIGZhbGxzIHRocm91Z2ggKi9cblx0XHRcdGNhc2UgMzpcblx0XHRcdFx0bWluID0gcGFyc2VJbnQobWluLCAxMClcblx0XHRcdFx0bWF4ID0gcGFyc2VJbnQobWF4LCAxMClcblx0XHRcdFx0cmV0dXJuIHJlc3VsdC5zbGljZSgwLCB0aGlzLm5hdHVyYWwobWluLCBtYXgpKVxuXHRcdH1cblx0fSxcblx0Lypcblx0ICAgICogUmFuZG9tLm9yZGVyKGl0ZW0sIGl0ZW0pXG5cdCAgICAqIFJhbmRvbS5vcmRlcihbaXRlbSwgaXRlbSAuLi5dKVxuXG5cdCAgICDpobrluo/ojrflj5bmlbDnu4TkuK3nmoTlhYPntKBcblxuXHQgICAgW0pTT07lr7zlhaXmlbDnu4TmlK/mjIHmlbDnu4TmlbDmja7lvZXlhaVdKGh0dHBzOi8vZ2l0aHViLmNvbS90aHgvUkFQL2lzc3Vlcy8yMilcblxuXHQgICAg5LiN5pSv5oyB5Y2V54us6LCD55So77yBXG5cdCovXG5cdG9yZGVyOiBmdW5jdGlvbiBvcmRlcihhcnJheSkge1xuXHRcdG9yZGVyLmNhY2hlID0gb3JkZXIuY2FjaGUgfHwge31cblxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkgYXJyYXkgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMClcblxuXHRcdC8vIG9wdGlvbnMuY29udGV4dC5wYXRoL3RlbXBsYXRlUGF0aFxuXHRcdHZhciBvcHRpb25zID0gb3JkZXIub3B0aW9uc1xuXHRcdHZhciB0ZW1wbGF0ZVBhdGggPSBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLmpvaW4oJy4nKVxuXG5cdFx0dmFyIGNhY2hlID0gKFxuXHRcdFx0b3JkZXIuY2FjaGVbdGVtcGxhdGVQYXRoXSA9IG9yZGVyLmNhY2hlW3RlbXBsYXRlUGF0aF0gfHwge1xuXHRcdFx0XHRpbmRleDogMCxcblx0XHRcdFx0YXJyYXk6IGFycmF5XG5cdFx0XHR9XG5cdFx0KVxuXG5cdFx0cmV0dXJuIGNhY2hlLmFycmF5W2NhY2hlLmluZGV4KysgJSBjYWNoZS5hcnJheS5sZW5ndGhdXG5cdH1cbn0iXX0=