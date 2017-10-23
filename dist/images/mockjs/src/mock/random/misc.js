'use strict';

/*
    ## Miscellaneous
*/
var DICT = require('./address_dict.js');
module.exports = {
	// Dice
	d4: function d4() {
		return this.natural(1, 4);
	},
	d6: function d6() {
		return this.natural(1, 6);
	},
	d8: function d8() {
		return this.natural(1, 8);
	},
	d12: function d12() {
		return this.natural(1, 12);
	},
	d20: function d20() {
		return this.natural(1, 20);
	},
	d100: function d100() {
		return this.natural(1, 100);
	},
	/*
     随机生成一个 GUID。
 	    http://www.broofa.com/2008/09/javascript-uuid-function/
     [UUID 规范](http://www.ietf.org/rfc/rfc4122.txt)
         UUIDs (Universally Unique IDentifier)
         GUIDs (Globally Unique IDentifier)
         The formal definition of the UUID string representation is provided by the following ABNF [7]:
             UUID                   = time-low "-" time-mid "-"
                                    time-high-and-version "-"
                                    clock-seq-and-reserved
                                    clock-seq-low "-" node
             time-low               = 4hexOctet
             time-mid               = 2hexOctet
             time-high-and-version  = 2hexOctet
             clock-seq-and-reserved = hexOctet
             clock-seq-low          = hexOctet
             node                   = 6hexOctet
             hexOctet               = hexDigit hexDigit
             hexDigit =
                 "0" / "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9" /
                 "a" / "b" / "c" / "d" / "e" / "f" /
                 "A" / "B" / "C" / "D" / "E" / "F"
     
     https://github.com/victorquinn/chancejs/blob/develop/chance.js#L1349
 */
	guid: function guid() {
		var pool = "abcdefABCDEF1234567890",
		    guid = this.string(pool, 8) + '-' + this.string(pool, 4) + '-' + this.string(pool, 4) + '-' + this.string(pool, 4) + '-' + this.string(pool, 12);
		return guid;
	},
	uuid: function uuid() {
		return this.guid();
	},
	/*
     随机生成一个 18 位身份证。
 	    [身份证](http://baike.baidu.com/view/1697.htm#4)
         地址码 6 + 出生日期码 8 + 顺序码 3 + 校验码 1
     [《中华人民共和国行政区划代码》国家标准(GB/T2260)](http://zhidao.baidu.com/question/1954561.html)
 */
	id: function id() {
		var id,
		    sum = 0,
		    rank = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"],
		    last = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

		id = this.pick(DICT).id + this.date('yyyyMMdd') + this.string('number', 3);

		for (var i = 0; i < id.length; i++) {
			sum += id[i] * rank[i];
		}
		id += last[sum % 11];

		return id;
	},

	/*
     生成一个全局的自增整数。
     类似自增主键（auto increment primary key）。
 */
	increment: function () {
		var key = 0;
		return function (step) {
			return key += +step || 1; // step?
		};
	}(),
	inc: function inc(step) {
		return this.increment(step);
	}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pc2MuanMiXSwibmFtZXMiOlsiRElDVCIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiZDQiLCJuYXR1cmFsIiwiZDYiLCJkOCIsImQxMiIsImQyMCIsImQxMDAiLCJndWlkIiwicG9vbCIsInN0cmluZyIsInV1aWQiLCJpZCIsInN1bSIsInJhbmsiLCJsYXN0IiwicGljayIsImRhdGUiLCJpIiwibGVuZ3RoIiwiaW5jcmVtZW50Iiwia2V5Iiwic3RlcCIsImluYyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0FBR0EsSUFBSUEsT0FBT0MsUUFBUSxnQkFBUixDQUFYO0FBQ0FDLE9BQU9DLE9BQVAsR0FBaUI7QUFDaEI7QUFDQUMsS0FBSSxjQUFXO0FBQ2QsU0FBTyxLQUFLQyxPQUFMLENBQWEsQ0FBYixFQUFnQixDQUFoQixDQUFQO0FBQ0EsRUFKZTtBQUtoQkMsS0FBSSxjQUFXO0FBQ2QsU0FBTyxLQUFLRCxPQUFMLENBQWEsQ0FBYixFQUFnQixDQUFoQixDQUFQO0FBQ0EsRUFQZTtBQVFoQkUsS0FBSSxjQUFXO0FBQ2QsU0FBTyxLQUFLRixPQUFMLENBQWEsQ0FBYixFQUFnQixDQUFoQixDQUFQO0FBQ0EsRUFWZTtBQVdoQkcsTUFBSyxlQUFXO0FBQ2YsU0FBTyxLQUFLSCxPQUFMLENBQWEsQ0FBYixFQUFnQixFQUFoQixDQUFQO0FBQ0EsRUFiZTtBQWNoQkksTUFBSyxlQUFXO0FBQ2YsU0FBTyxLQUFLSixPQUFMLENBQWEsQ0FBYixFQUFnQixFQUFoQixDQUFQO0FBQ0EsRUFoQmU7QUFpQmhCSyxPQUFNLGdCQUFXO0FBQ2hCLFNBQU8sS0FBS0wsT0FBTCxDQUFhLENBQWIsRUFBZ0IsR0FBaEIsQ0FBUDtBQUNBLEVBbkJlO0FBb0JoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQU0sT0FBTSxnQkFBVztBQUNoQixNQUFJQyxPQUFPLHdCQUFYO0FBQUEsTUFDQ0QsT0FBTyxLQUFLRSxNQUFMLENBQVlELElBQVosRUFBa0IsQ0FBbEIsSUFBdUIsR0FBdkIsR0FDUCxLQUFLQyxNQUFMLENBQVlELElBQVosRUFBa0IsQ0FBbEIsQ0FETyxHQUNnQixHQURoQixHQUVQLEtBQUtDLE1BQUwsQ0FBWUQsSUFBWixFQUFrQixDQUFsQixDQUZPLEdBRWdCLEdBRmhCLEdBR1AsS0FBS0MsTUFBTCxDQUFZRCxJQUFaLEVBQWtCLENBQWxCLENBSE8sR0FHZ0IsR0FIaEIsR0FJUCxLQUFLQyxNQUFMLENBQVlELElBQVosRUFBa0IsRUFBbEIsQ0FMRDtBQU1BLFNBQU9ELElBQVA7QUFDQSxFQXREZTtBQXVEaEJHLE9BQU0sZ0JBQVc7QUFDaEIsU0FBTyxLQUFLSCxJQUFMLEVBQVA7QUFDQSxFQXpEZTtBQTBEaEI7Ozs7OztBQU9BSSxLQUFJLGNBQVc7QUFDZCxNQUFJQSxFQUFKO0FBQUEsTUFDQ0MsTUFBTSxDQURQO0FBQUEsTUFFQ0MsT0FBTyxDQUNOLEdBRE0sRUFDRCxHQURDLEVBQ0ksSUFESixFQUNVLEdBRFYsRUFDZSxHQURmLEVBQ29CLEdBRHBCLEVBQ3lCLEdBRHpCLEVBQzhCLEdBRDlCLEVBQ21DLEdBRG5DLEVBQ3dDLEdBRHhDLEVBQzZDLEdBRDdDLEVBQ2tELEdBRGxELEVBQ3VELElBRHZELEVBQzZELEdBRDdELEVBQ2tFLEdBRGxFLEVBQ3VFLEdBRHZFLEVBQzRFLEdBRDVFLENBRlI7QUFBQSxNQUtDQyxPQUFPLENBQ04sR0FETSxFQUNELEdBREMsRUFDSSxHQURKLEVBQ1MsR0FEVCxFQUNjLEdBRGQsRUFDbUIsR0FEbkIsRUFDd0IsR0FEeEIsRUFDNkIsR0FEN0IsRUFDa0MsR0FEbEMsRUFDdUMsR0FEdkMsRUFDNEMsR0FENUMsQ0FMUjs7QUFTQUgsT0FBSyxLQUFLSSxJQUFMLENBQVVuQixJQUFWLEVBQWdCZSxFQUFoQixHQUNKLEtBQUtLLElBQUwsQ0FBVSxVQUFWLENBREksR0FFSixLQUFLUCxNQUFMLENBQVksUUFBWixFQUFzQixDQUF0QixDQUZEOztBQUlBLE9BQUssSUFBSVEsSUFBSSxDQUFiLEVBQWdCQSxJQUFJTixHQUFHTyxNQUF2QixFQUErQkQsR0FBL0IsRUFBb0M7QUFDbkNMLFVBQU9ELEdBQUdNLENBQUgsSUFBUUosS0FBS0ksQ0FBTCxDQUFmO0FBQ0E7QUFDRE4sUUFBTUcsS0FBS0YsTUFBTSxFQUFYLENBQU47O0FBRUEsU0FBT0QsRUFBUDtBQUNBLEVBckZlOztBQXVGaEI7Ozs7QUFJQVEsWUFBVyxZQUFXO0FBQ3JCLE1BQUlDLE1BQU0sQ0FBVjtBQUNBLFNBQU8sVUFBU0MsSUFBVCxFQUFlO0FBQ3JCLFVBQU9ELE9BQVEsQ0FBQ0MsSUFBRCxJQUFTLENBQXhCLENBRHFCLENBQ007QUFDM0IsR0FGRDtBQUdBLEVBTFUsRUEzRks7QUFpR2hCQyxNQUFLLGFBQVNELElBQVQsRUFBZTtBQUNuQixTQUFPLEtBQUtGLFNBQUwsQ0FBZUUsSUFBZixDQUFQO0FBQ0E7QUFuR2UsQ0FBakIiLCJmaWxlIjoibWlzYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gICAgIyMgTWlzY2VsbGFuZW91c1xuKi9cbnZhciBESUNUID0gcmVxdWlyZSgnLi9hZGRyZXNzX2RpY3QnKVxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdC8vIERpY2Vcblx0ZDQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLm5hdHVyYWwoMSwgNClcblx0fSxcblx0ZDY6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLm5hdHVyYWwoMSwgNilcblx0fSxcblx0ZDg6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLm5hdHVyYWwoMSwgOClcblx0fSxcblx0ZDEyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDEyKVxuXHR9LFxuXHRkMjA6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLm5hdHVyYWwoMSwgMjApXG5cdH0sXG5cdGQxMDA6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLm5hdHVyYWwoMSwgMTAwKVxuXHR9LFxuXHQvKlxuXHQgICAg6ZqP5py655Sf5oiQ5LiA5LiqIEdVSUTjgIJcblxuXHQgICAgaHR0cDovL3d3dy5icm9vZmEuY29tLzIwMDgvMDkvamF2YXNjcmlwdC11dWlkLWZ1bmN0aW9uL1xuXHQgICAgW1VVSUQg6KeE6IyDXShodHRwOi8vd3d3LmlldGYub3JnL3JmYy9yZmM0MTIyLnR4dClcblx0ICAgICAgICBVVUlEcyAoVW5pdmVyc2FsbHkgVW5pcXVlIElEZW50aWZpZXIpXG5cdCAgICAgICAgR1VJRHMgKEdsb2JhbGx5IFVuaXF1ZSBJRGVudGlmaWVyKVxuXHQgICAgICAgIFRoZSBmb3JtYWwgZGVmaW5pdGlvbiBvZiB0aGUgVVVJRCBzdHJpbmcgcmVwcmVzZW50YXRpb24gaXMgcHJvdmlkZWQgYnkgdGhlIGZvbGxvd2luZyBBQk5GIFs3XTpcblx0ICAgICAgICAgICAgVVVJRCAgICAgICAgICAgICAgICAgICA9IHRpbWUtbG93IFwiLVwiIHRpbWUtbWlkIFwiLVwiXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZS1oaWdoLWFuZC12ZXJzaW9uIFwiLVwiXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvY2stc2VxLWFuZC1yZXNlcnZlZFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb2NrLXNlcS1sb3cgXCItXCIgbm9kZVxuXHQgICAgICAgICAgICB0aW1lLWxvdyAgICAgICAgICAgICAgID0gNGhleE9jdGV0XG5cdCAgICAgICAgICAgIHRpbWUtbWlkICAgICAgICAgICAgICAgPSAyaGV4T2N0ZXRcblx0ICAgICAgICAgICAgdGltZS1oaWdoLWFuZC12ZXJzaW9uICA9IDJoZXhPY3RldFxuXHQgICAgICAgICAgICBjbG9jay1zZXEtYW5kLXJlc2VydmVkID0gaGV4T2N0ZXRcblx0ICAgICAgICAgICAgY2xvY2stc2VxLWxvdyAgICAgICAgICA9IGhleE9jdGV0XG5cdCAgICAgICAgICAgIG5vZGUgICAgICAgICAgICAgICAgICAgPSA2aGV4T2N0ZXRcblx0ICAgICAgICAgICAgaGV4T2N0ZXQgICAgICAgICAgICAgICA9IGhleERpZ2l0IGhleERpZ2l0XG5cdCAgICAgICAgICAgIGhleERpZ2l0ID1cblx0ICAgICAgICAgICAgICAgIFwiMFwiIC8gXCIxXCIgLyBcIjJcIiAvIFwiM1wiIC8gXCI0XCIgLyBcIjVcIiAvIFwiNlwiIC8gXCI3XCIgLyBcIjhcIiAvIFwiOVwiIC9cblx0ICAgICAgICAgICAgICAgIFwiYVwiIC8gXCJiXCIgLyBcImNcIiAvIFwiZFwiIC8gXCJlXCIgLyBcImZcIiAvXG5cdCAgICAgICAgICAgICAgICBcIkFcIiAvIFwiQlwiIC8gXCJDXCIgLyBcIkRcIiAvIFwiRVwiIC8gXCJGXCJcblx0ICAgIFxuXHQgICAgaHR0cHM6Ly9naXRodWIuY29tL3ZpY3RvcnF1aW5uL2NoYW5jZWpzL2Jsb2IvZGV2ZWxvcC9jaGFuY2UuanMjTDEzNDlcblx0Ki9cblx0Z3VpZDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHBvb2wgPSBcImFiY2RlZkFCQ0RFRjEyMzQ1Njc4OTBcIixcblx0XHRcdGd1aWQgPSB0aGlzLnN0cmluZyhwb29sLCA4KSArICctJyArXG5cdFx0XHR0aGlzLnN0cmluZyhwb29sLCA0KSArICctJyArXG5cdFx0XHR0aGlzLnN0cmluZyhwb29sLCA0KSArICctJyArXG5cdFx0XHR0aGlzLnN0cmluZyhwb29sLCA0KSArICctJyArXG5cdFx0XHR0aGlzLnN0cmluZyhwb29sLCAxMik7XG5cdFx0cmV0dXJuIGd1aWRcblx0fSxcblx0dXVpZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ3VpZCgpXG5cdH0sXG5cdC8qXG5cdCAgICDpmo/mnLrnlJ/miJDkuIDkuKogMTgg5L2N6Lqr5Lu96K+B44CCXG5cblx0ICAgIFvouqvku73or4FdKGh0dHA6Ly9iYWlrZS5iYWlkdS5jb20vdmlldy8xNjk3Lmh0bSM0KVxuXHQgICAgICAgIOWcsOWdgOeggSA2ICsg5Ye655Sf5pel5pyf56CBIDggKyDpobrluo/noIEgMyArIOagoemqjOeggSAxXG5cdCAgICBb44CK5Lit5Y2O5Lq65rCR5YWx5ZKM5Zu96KGM5pS/5Yy65YiS5Luj56CB44CL5Zu95a625qCH5YeGKEdCL1QyMjYwKV0oaHR0cDovL3poaWRhby5iYWlkdS5jb20vcXVlc3Rpb24vMTk1NDU2MS5odG1sKVxuXHQqL1xuXHRpZDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGlkLFxuXHRcdFx0c3VtID0gMCxcblx0XHRcdHJhbmsgPSBbXG5cdFx0XHRcdFwiN1wiLCBcIjlcIiwgXCIxMFwiLCBcIjVcIiwgXCI4XCIsIFwiNFwiLCBcIjJcIiwgXCIxXCIsIFwiNlwiLCBcIjNcIiwgXCI3XCIsIFwiOVwiLCBcIjEwXCIsIFwiNVwiLCBcIjhcIiwgXCI0XCIsIFwiMlwiXG5cdFx0XHRdLFxuXHRcdFx0bGFzdCA9IFtcblx0XHRcdFx0XCIxXCIsIFwiMFwiLCBcIlhcIiwgXCI5XCIsIFwiOFwiLCBcIjdcIiwgXCI2XCIsIFwiNVwiLCBcIjRcIiwgXCIzXCIsIFwiMlwiXG5cdFx0XHRdXG5cblx0XHRpZCA9IHRoaXMucGljayhESUNUKS5pZCArXG5cdFx0XHR0aGlzLmRhdGUoJ3l5eXlNTWRkJykgK1xuXHRcdFx0dGhpcy5zdHJpbmcoJ251bWJlcicsIDMpXG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGlkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRzdW0gKz0gaWRbaV0gKiByYW5rW2ldO1xuXHRcdH1cblx0XHRpZCArPSBsYXN0W3N1bSAlIDExXTtcblxuXHRcdHJldHVybiBpZFxuXHR9LFxuXG5cdC8qXG5cdCAgICDnlJ/miJDkuIDkuKrlhajlsYDnmoToh6rlop7mlbTmlbDjgIJcblx0ICAgIOexu+S8vOiHquWinuS4u+mUru+8iGF1dG8gaW5jcmVtZW50IHByaW1hcnkga2V577yJ44CCXG5cdCovXG5cdGluY3JlbWVudDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGtleSA9IDBcblx0XHRyZXR1cm4gZnVuY3Rpb24oc3RlcCkge1xuXHRcdFx0cmV0dXJuIGtleSArPSAoK3N0ZXAgfHwgMSkgLy8gc3RlcD9cblx0XHR9XG5cdH0oKSxcblx0aW5jOiBmdW5jdGlvbihzdGVwKSB7XG5cdFx0cmV0dXJuIHRoaXMuaW5jcmVtZW50KHN0ZXApXG5cdH1cbn0iXX0=