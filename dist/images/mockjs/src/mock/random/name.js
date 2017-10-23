"use strict";

/*
    ## Name

    [Beyond the Top 1000 Names](http://www.ssa.gov/oact/babynames/limits.html)
*/
module.exports = {
	// 随机生成一个常见的英文名。
	first: function first() {
		var names = [
		// male
		"James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Matthew", "Gary", "Timothy", "Jose", "Larry", "Jeffrey", "Frank", "Scott", "Eric"].concat([
		// female
		"Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah", "Jessica", "Shirley", "Cynthia", "Angela", "Melissa", "Brenda", "Amy", "Anna"]);
		return this.pick(names);
		// or this.capitalize(this.word())
	},
	// 随机生成一个常见的英文姓。
	last: function last() {
		var names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez", "Lee", "Gonzalez", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young", "Allen"];
		return this.pick(names);
		// or this.capitalize(this.word())
	},
	// 随机生成一个常见的英文姓名。
	name: function name(middle) {
		return this.first() + ' ' + (middle ? this.first() + ' ' : '') + this.last();
	},
	/*
     随机生成一个常见的中文姓。
     [世界常用姓氏排行](http://baike.baidu.com/view/1719115.htm)
     [玄派网 - 网络小说创作辅助平台](http://xuanpai.sinaapp.com/)
  */
	cfirst: function cfirst() {
		var names = ('王 李 张 刘 陈 杨 赵 黄 周 吴 ' + '徐 孙 胡 朱 高 林 何 郭 马 罗 ' + '梁 宋 郑 谢 韩 唐 冯 于 董 萧 ' + '程 曹 袁 邓 许 傅 沈 曾 彭 吕 ' + '苏 卢 蒋 蔡 贾 丁 魏 薛 叶 阎 ' + '余 潘 杜 戴 夏 锺 汪 田 任 姜 ' + '范 方 石 姚 谭 廖 邹 熊 金 陆 ' + '郝 孔 白 崔 康 毛 邱 秦 江 史 ' + '顾 侯 邵 孟 龙 万 段 雷 钱 汤 ' + '尹 黎 易 常 武 乔 贺 赖 龚 文').split(' ');
		return this.pick(names);
	},
	/*
     随机生成一个常见的中文名。
     [中国最常见名字前50名_三九算命网](http://www.name999.net/xingming/xingshi/20131004/48.html)
  */
	clast: function clast() {
		var names = ('伟 芳 娜 秀英 敏 静 丽 强 磊 军 ' + '洋 勇 艳 杰 娟 涛 明 超 秀兰 霞 ' + '平 刚 桂英').split(' ');
		return this.pick(names);
	},
	// 随机生成一个常见的中文姓名。
	cname: function cname() {
		return this.cfirst() + this.clast();
	}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hbWUuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImZpcnN0IiwibmFtZXMiLCJjb25jYXQiLCJwaWNrIiwibGFzdCIsIm5hbWUiLCJtaWRkbGUiLCJjZmlyc3QiLCJzcGxpdCIsImNsYXN0IiwiY25hbWUiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7O0FBS0FBLE9BQU9DLE9BQVAsR0FBaUI7QUFDaEI7QUFDQUMsUUFBTyxpQkFBVztBQUNqQixNQUFJQyxRQUFRO0FBQ1g7QUFDQSxTQUZXLEVBRUYsTUFGRSxFQUVNLFFBRk4sRUFFZ0IsU0FGaEIsRUFFMkIsU0FGM0IsRUFHWCxPQUhXLEVBR0YsU0FIRSxFQUdTLFNBSFQsRUFHb0IsUUFIcEIsRUFHOEIsUUFIOUIsRUFJWCxhQUpXLEVBSUksUUFKSixFQUljLE1BSmQsRUFJc0IsTUFKdEIsRUFJOEIsUUFKOUIsRUFLWCxRQUxXLEVBS0QsU0FMQyxFQUtVLFFBTFYsRUFLb0IsUUFMcEIsRUFLOEIsT0FMOUIsRUFNWCxRQU5XLEVBTUQsU0FOQyxFQU1VLE9BTlYsRUFNbUIsT0FObkIsRUFNNEIsU0FONUIsRUFPWCxNQVBXLEVBT0gsU0FQRyxFQU9RLE1BUFIsRUFPZ0IsT0FQaEIsRUFPeUIsU0FQekIsRUFRWCxPQVJXLEVBUUYsT0FSRSxFQVFPLE1BUlAsRUFTVkMsTUFUVSxDQVNIO0FBQ1I7QUFDQSxRQUZRLEVBRUEsVUFGQSxFQUVZLE9BRlosRUFFcUIsU0FGckIsRUFFZ0MsV0FGaEMsRUFHUixVQUhRLEVBR0ksT0FISixFQUdhLE9BSGIsRUFHc0IsVUFIdEIsRUFHa0MsU0FIbEMsRUFJUixNQUpRLEVBSUEsT0FKQSxFQUlTLE9BSlQsRUFJa0IsT0FKbEIsRUFJMkIsT0FKM0IsRUFLUixRQUxRLEVBS0UsT0FMRixFQUtXLE9BTFgsRUFLb0IsTUFMcEIsRUFLNEIsUUFMNUIsRUFNUixVQU5RLEVBTUksT0FOSixFQU1hLE9BTmIsRUFNc0IsVUFOdEIsRUFNa0MsU0FObEMsRUFPUixTQVBRLEVBT0csU0FQSCxFQU9jLFNBUGQsRUFPeUIsUUFQekIsRUFPbUMsU0FQbkMsRUFRUixRQVJRLEVBUUUsS0FSRixFQVFTLE1BUlQsQ0FURyxDQUFaO0FBbUJBLFNBQU8sS0FBS0MsSUFBTCxDQUFVRixLQUFWLENBQVA7QUFDQztBQUNELEVBeEJlO0FBeUJoQjtBQUNBRyxPQUFNLGdCQUFXO0FBQ2hCLE1BQUlILFFBQVEsQ0FDWCxPQURXLEVBQ0YsU0FERSxFQUNTLFVBRFQsRUFDcUIsT0FEckIsRUFDOEIsT0FEOUIsRUFFWCxRQUZXLEVBRUQsT0FGQyxFQUVRLFFBRlIsRUFFa0IsV0FGbEIsRUFFK0IsUUFGL0IsRUFHWCxVQUhXLEVBR0MsVUFIRCxFQUdhLFFBSGIsRUFHdUIsUUFIdkIsRUFHaUMsV0FIakMsRUFJWCxPQUpXLEVBSUYsUUFKRSxFQUlRLFNBSlIsRUFJbUIsVUFKbkIsRUFJK0IsT0FKL0IsRUFLWCxPQUxXLEVBS0YsS0FMRSxFQUtLLFVBTEwsRUFLaUIsUUFMakIsRUFLMkIsT0FMM0IsRUFNWCxPQU5XLEVBTUYsVUFORSxFQU1VLFFBTlYsRUFNb0IsT0FOcEIsRUFNNkIsTUFON0IsRUFPWCxPQVBXLEVBT0YsT0FQRSxDQUFaO0FBU0EsU0FBTyxLQUFLRSxJQUFMLENBQVVGLEtBQVYsQ0FBUDtBQUNDO0FBQ0QsRUF0Q2U7QUF1Q2hCO0FBQ0FJLE9BQU0sY0FBU0MsTUFBVCxFQUFpQjtBQUN0QixTQUFPLEtBQUtOLEtBQUwsS0FBZSxHQUFmLElBQ0xNLFNBQVMsS0FBS04sS0FBTCxLQUFlLEdBQXhCLEdBQThCLEVBRHpCLElBRU4sS0FBS0ksSUFBTCxFQUZEO0FBR0EsRUE1Q2U7QUE2Q2hCOzs7OztBQUtBRyxTQUFRLGtCQUFXO0FBQ2xCLE1BQUlOLFFBQVEsQ0FDWCx5QkFDQSxzQkFEQSxHQUVBLHNCQUZBLEdBR0Esc0JBSEEsR0FJQSxzQkFKQSxHQUtBLHNCQUxBLEdBTUEsc0JBTkEsR0FPQSxzQkFQQSxHQVFBLHNCQVJBLEdBU0EscUJBVlcsRUFXVk8sS0FYVSxDQVdKLEdBWEksQ0FBWjtBQVlBLFNBQU8sS0FBS0wsSUFBTCxDQUFVRixLQUFWLENBQVA7QUFDQSxFQWhFZTtBQWlFaEI7Ozs7QUFJQVEsUUFBTyxpQkFBVztBQUNqQixNQUFJUixRQUFRLENBQ1gsMEJBQ0EsdUJBREEsR0FFQSxRQUhXLEVBSVZPLEtBSlUsQ0FJSixHQUpJLENBQVo7QUFLQSxTQUFPLEtBQUtMLElBQUwsQ0FBVUYsS0FBVixDQUFQO0FBQ0EsRUE1RWU7QUE2RWhCO0FBQ0FTLFFBQU8saUJBQVc7QUFDakIsU0FBTyxLQUFLSCxNQUFMLEtBQWdCLEtBQUtFLEtBQUwsRUFBdkI7QUFDQTtBQWhGZSxDQUFqQiIsImZpbGUiOiJuYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgICAjIyBOYW1lXG5cbiAgICBbQmV5b25kIHRoZSBUb3AgMTAwMCBOYW1lc10oaHR0cDovL3d3dy5zc2EuZ292L29hY3QvYmFieW5hbWVzL2xpbWl0cy5odG1sKVxuKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuXHQvLyDpmo/mnLrnlJ/miJDkuIDkuKrluLjop4HnmoToi7HmloflkI3jgIJcblx0Zmlyc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuYW1lcyA9IFtcblx0XHRcdC8vIG1hbGVcblx0XHRcdFwiSmFtZXNcIiwgXCJKb2huXCIsIFwiUm9iZXJ0XCIsIFwiTWljaGFlbFwiLCBcIldpbGxpYW1cIixcblx0XHRcdFwiRGF2aWRcIiwgXCJSaWNoYXJkXCIsIFwiQ2hhcmxlc1wiLCBcIkpvc2VwaFwiLCBcIlRob21hc1wiLFxuXHRcdFx0XCJDaHJpc3RvcGhlclwiLCBcIkRhbmllbFwiLCBcIlBhdWxcIiwgXCJNYXJrXCIsIFwiRG9uYWxkXCIsXG5cdFx0XHRcIkdlb3JnZVwiLCBcIktlbm5ldGhcIiwgXCJTdGV2ZW5cIiwgXCJFZHdhcmRcIiwgXCJCcmlhblwiLFxuXHRcdFx0XCJSb25hbGRcIiwgXCJBbnRob255XCIsIFwiS2V2aW5cIiwgXCJKYXNvblwiLCBcIk1hdHRoZXdcIixcblx0XHRcdFwiR2FyeVwiLCBcIlRpbW90aHlcIiwgXCJKb3NlXCIsIFwiTGFycnlcIiwgXCJKZWZmcmV5XCIsXG5cdFx0XHRcIkZyYW5rXCIsIFwiU2NvdHRcIiwgXCJFcmljXCJcblx0XHRdLmNvbmNhdChbXG5cdFx0XHQvLyBmZW1hbGVcblx0XHRcdFwiTWFyeVwiLCBcIlBhdHJpY2lhXCIsIFwiTGluZGFcIiwgXCJCYXJiYXJhXCIsIFwiRWxpemFiZXRoXCIsXG5cdFx0XHRcIkplbm5pZmVyXCIsIFwiTWFyaWFcIiwgXCJTdXNhblwiLCBcIk1hcmdhcmV0XCIsIFwiRG9yb3RoeVwiLFxuXHRcdFx0XCJMaXNhXCIsIFwiTmFuY3lcIiwgXCJLYXJlblwiLCBcIkJldHR5XCIsIFwiSGVsZW5cIixcblx0XHRcdFwiU2FuZHJhXCIsIFwiRG9ubmFcIiwgXCJDYXJvbFwiLCBcIlJ1dGhcIiwgXCJTaGFyb25cIixcblx0XHRcdFwiTWljaGVsbGVcIiwgXCJMYXVyYVwiLCBcIlNhcmFoXCIsIFwiS2ltYmVybHlcIiwgXCJEZWJvcmFoXCIsXG5cdFx0XHRcIkplc3NpY2FcIiwgXCJTaGlybGV5XCIsIFwiQ3ludGhpYVwiLCBcIkFuZ2VsYVwiLCBcIk1lbGlzc2FcIixcblx0XHRcdFwiQnJlbmRhXCIsIFwiQW15XCIsIFwiQW5uYVwiXG5cdFx0XSlcblx0XHRyZXR1cm4gdGhpcy5waWNrKG5hbWVzKVxuXHRcdFx0Ly8gb3IgdGhpcy5jYXBpdGFsaXplKHRoaXMud29yZCgpKVxuXHR9LFxuXHQvLyDpmo/mnLrnlJ/miJDkuIDkuKrluLjop4HnmoToi7Hmloflp5PjgIJcblx0bGFzdDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5hbWVzID0gW1xuXHRcdFx0XCJTbWl0aFwiLCBcIkpvaG5zb25cIiwgXCJXaWxsaWFtc1wiLCBcIkJyb3duXCIsIFwiSm9uZXNcIixcblx0XHRcdFwiTWlsbGVyXCIsIFwiRGF2aXNcIiwgXCJHYXJjaWFcIiwgXCJSb2RyaWd1ZXpcIiwgXCJXaWxzb25cIixcblx0XHRcdFwiTWFydGluZXpcIiwgXCJBbmRlcnNvblwiLCBcIlRheWxvclwiLCBcIlRob21hc1wiLCBcIkhlcm5hbmRlelwiLFxuXHRcdFx0XCJNb29yZVwiLCBcIk1hcnRpblwiLCBcIkphY2tzb25cIiwgXCJUaG9tcHNvblwiLCBcIldoaXRlXCIsXG5cdFx0XHRcIkxvcGV6XCIsIFwiTGVlXCIsIFwiR29uemFsZXpcIiwgXCJIYXJyaXNcIiwgXCJDbGFya1wiLFxuXHRcdFx0XCJMZXdpc1wiLCBcIlJvYmluc29uXCIsIFwiV2Fsa2VyXCIsIFwiUGVyZXpcIiwgXCJIYWxsXCIsXG5cdFx0XHRcIllvdW5nXCIsIFwiQWxsZW5cIlxuXHRcdF1cblx0XHRyZXR1cm4gdGhpcy5waWNrKG5hbWVzKVxuXHRcdFx0Ly8gb3IgdGhpcy5jYXBpdGFsaXplKHRoaXMud29yZCgpKVxuXHR9LFxuXHQvLyDpmo/mnLrnlJ/miJDkuIDkuKrluLjop4HnmoToi7Hmloflp5PlkI3jgIJcblx0bmFtZTogZnVuY3Rpb24obWlkZGxlKSB7XG5cdFx0cmV0dXJuIHRoaXMuZmlyc3QoKSArICcgJyArXG5cdFx0XHQobWlkZGxlID8gdGhpcy5maXJzdCgpICsgJyAnIDogJycpICtcblx0XHRcdHRoaXMubGFzdCgpXG5cdH0sXG5cdC8qXG5cdCAgICDpmo/mnLrnlJ/miJDkuIDkuKrluLjop4HnmoTkuK3mloflp5PjgIJcblx0ICAgIFvkuJbnlYzluLjnlKjlp5PmsI/mjpLooYxdKGh0dHA6Ly9iYWlrZS5iYWlkdS5jb20vdmlldy8xNzE5MTE1Lmh0bSlcblx0ICAgIFvnjoTmtL7nvZEgLSDnvZHnu5zlsI/or7TliJvkvZzovoXliqnlubPlj7BdKGh0dHA6Ly94dWFucGFpLnNpbmFhcHAuY29tLylcblx0ICovXG5cdGNmaXJzdDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5hbWVzID0gKFxuXHRcdFx0J+eOiyDmnY4g5bygIOWImCDpmYgg5p2oIOi1tSDpu4Qg5ZGoIOWQtCAnICtcblx0XHRcdCflvpAg5a2ZIOiDoSDmnLEg6auYIOaelyDkvZUg6YOtIOmprCDnvZcgJyArXG5cdFx0XHQn5qKBIOWuiyDpg5Eg6LCiIOmfqSDllJAg5YavIOS6jiDokaMg6JCnICcgK1xuXHRcdFx0J+eoiyDmm7kg6KKBIOmCkyDorrgg5YKFIOayiCDmm74g5b2tIOWQlSAnICtcblx0XHRcdCfoi48g5Y2iIOiSiyDolKEg6LS+IOS4gSDprY8g6JabIOWPtiDpmI4gJyArXG5cdFx0XHQn5L2ZIOa9mCDmnZwg5oi0IOWkjyDplLog5rGqIOeUsCDku7sg5aecICcgK1xuXHRcdFx0J+iMgyDmlrkg55+zIOWnmiDosK0g5buWIOmCuSDnhoog6YeRIOmZhiAnICtcblx0XHRcdCfpg50g5a2UIOeZvSDltJQg5bq3IOavmyDpgrEg56emIOaxnyDlj7IgJyArXG5cdFx0XHQn6aG+IOS+ryDpgrUg5a2fIOm+mSDkuIcg5q61IOmbtyDpkrEg5rGkICcgK1xuXHRcdFx0J+WwuSDpu44g5piTIOW4uCDmraYg5LmUIOi0uiDotZYg6b6aIOaWhydcblx0XHQpLnNwbGl0KCcgJylcblx0XHRyZXR1cm4gdGhpcy5waWNrKG5hbWVzKVxuXHR9LFxuXHQvKlxuXHQgICAg6ZqP5py655Sf5oiQ5LiA5Liq5bi46KeB55qE5Lit5paH5ZCN44CCXG5cdCAgICBb5Lit5Zu95pyA5bi46KeB5ZCN5a2X5YmNNTDlkI1f5LiJ5Lmd566X5ZG9572RXShodHRwOi8vd3d3Lm5hbWU5OTkubmV0L3hpbmdtaW5nL3hpbmdzaGkvMjAxMzEwMDQvNDguaHRtbClcblx0ICovXG5cdGNsYXN0OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmFtZXMgPSAoXG5cdFx0XHQn5LyfIOiKsyDlqJwg56eA6IuxIOaVjyDpnZkg5Li9IOW8uiDno4og5YabICcgK1xuXHRcdFx0J+a0iyDli4cg6ImzIOadsCDlqJ8g5rabIOaYjiDotoUg56eA5YWwIOmcniAnICtcblx0XHRcdCflubMg5YiaIOahguiLsSdcblx0XHQpLnNwbGl0KCcgJylcblx0XHRyZXR1cm4gdGhpcy5waWNrKG5hbWVzKVxuXHR9LFxuXHQvLyDpmo/mnLrnlJ/miJDkuIDkuKrluLjop4HnmoTkuK3mloflp5PlkI3jgIJcblx0Y25hbWU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmNmaXJzdCgpICsgdGhpcy5jbGFzdCgpXG5cdH1cbn0iXX0=