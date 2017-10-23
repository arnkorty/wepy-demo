'use strict';

/*
    ## Color

    http://llllll.li/randomColor/
        A color generator for JavaScript.
        randomColor generates attractive colors by default. More specifically, randomColor produces bright colors with a reasonably high saturation. This makes randomColor particularly useful for data visualizations and generative art.

    http://randomcolour.com/
        var bg_colour = Math.floor(Math.random() * 16777215).toString(16);
        bg_colour = "#" + ("000000" + bg_colour).slice(-6);
        document.bgColor = bg_colour;
    
    http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
        Creating random colors is actually more difficult than it seems. The randomness itself is easy, but aesthetically pleasing randomness is more difficult.
        https://github.com/devongovett/color-generator

    http://www.paulirish.com/2009/random-hex-color-code-snippets/
        Random Hex Color Code Generator in JavaScript

    http://chancejs.com/#color
        chance.color()
        // => '#79c157'
        chance.color({format: 'hex'})
        // => '#d67118'
        chance.color({format: 'shorthex'})
        // => '#60f'
        chance.color({format: 'rgb'})
        // => 'rgb(110,52,164)'

    http://tool.c7sky.com/webcolor
        网页设计常用色彩搭配表
    
    https://github.com/One-com/one-color
        An OO-based JavaScript color parser/computation toolkit with support for RGB, HSV, HSL, CMYK, and alpha channels.
        API 很赞

    https://github.com/harthur/color
        JavaScript color conversion and manipulation library

    https://github.com/leaverou/css-colors
        Share & convert CSS colors
    http://leaverou.github.io/css-colors/#slategray
        Type a CSS color keyword, #hex, hsl(), rgba(), whatever:

    色调 hue
        http://baike.baidu.com/view/23368.htm
        色调指的是一幅画中画面色彩的总体倾向，是大的色彩效果。
    饱和度 saturation
        http://baike.baidu.com/view/189644.htm
        饱和度是指色彩的鲜艳程度，也称色彩的纯度。饱和度取决于该色中含色成分和消色成分（灰色）的比例。含色成分越大，饱和度越大；消色成分越大，饱和度越小。
    亮度 brightness
        http://baike.baidu.com/view/34773.htm
        亮度是指发光体（反光体）表面发光（反光）强弱的物理量。
    照度 luminosity
        物体被照亮的程度,采用单位面积所接受的光通量来表示,表示单位为勒[克斯](Lux,lx) ,即 1m / m2 。

    http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
        var letters = '0123456789ABCDEF'.split('')
        var color = '#'
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    
        // 随机生成一个无脑的颜色，格式为 '#RRGGBB'。
        // _brainlessColor()
        var color = Math.floor(
            Math.random() *
            (16 * 16 * 16 * 16 * 16 * 16 - 1)
        ).toString(16)
        color = "#" + ("000000" + color).slice(-6)
        return color.toUpperCase()
*/

var Convert = require('./color_convert.js');
var DICT = require('./color_dict.js');

module.exports = {
    // 随机生成一个有吸引力的颜色，格式为 '#RRGGBB'。
    color: function color(name) {
        if (name || DICT[name]) return DICT[name].nicer;
        return this.hex();
    },
    // #DAC0DE
    hex: function hex() {
        var hsv = this._goldenRatioColor();
        var rgb = Convert.hsv2rgb(hsv);
        var hex = Convert.rgb2hex(rgb[0], rgb[1], rgb[2]);
        return hex;
    },
    // rgb(128,255,255)
    rgb: function rgb() {
        var hsv = this._goldenRatioColor();
        var rgb = Convert.hsv2rgb(hsv);
        return 'rgb(' + parseInt(rgb[0], 10) + ', ' + parseInt(rgb[1], 10) + ', ' + parseInt(rgb[2], 10) + ')';
    },
    // rgba(128,255,255,0.3)
    rgba: function rgba() {
        var hsv = this._goldenRatioColor();
        var rgb = Convert.hsv2rgb(hsv);
        return 'rgba(' + parseInt(rgb[0], 10) + ', ' + parseInt(rgb[1], 10) + ', ' + parseInt(rgb[2], 10) + ', ' + Math.random().toFixed(2) + ')';
    },
    // hsl(300,80%,90%)
    hsl: function hsl() {
        var hsv = this._goldenRatioColor();
        var hsl = Convert.hsv2hsl(hsv);
        return 'hsl(' + parseInt(hsl[0], 10) + ', ' + parseInt(hsl[1], 10) + ', ' + parseInt(hsl[2], 10) + ')';
    },
    // http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
    // https://github.com/devongovett/color-generator/blob/master/index.js
    // 随机生成一个有吸引力的颜色。
    _goldenRatioColor: function _goldenRatioColor(saturation, value) {
        this._goldenRatio = 0.618033988749895;
        this._hue = this._hue || Math.random();
        this._hue += this._goldenRatio;
        this._hue %= 1;

        if (typeof saturation !== "number") saturation = 0.5;
        if (typeof value !== "number") value = 0.95;

        return [this._hue * 360, saturation * 100, value * 100];
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbG9yLmpzIl0sIm5hbWVzIjpbIkNvbnZlcnQiLCJyZXF1aXJlIiwiRElDVCIsIm1vZHVsZSIsImV4cG9ydHMiLCJjb2xvciIsIm5hbWUiLCJuaWNlciIsImhleCIsImhzdiIsIl9nb2xkZW5SYXRpb0NvbG9yIiwicmdiIiwiaHN2MnJnYiIsInJnYjJoZXgiLCJwYXJzZUludCIsInJnYmEiLCJNYXRoIiwicmFuZG9tIiwidG9GaXhlZCIsImhzbCIsImhzdjJoc2wiLCJzYXR1cmF0aW9uIiwidmFsdWUiLCJfZ29sZGVuUmF0aW8iLCJfaHVlIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBFQSxJQUFJQSxVQUFVQyxRQUFRLGlCQUFSLENBQWQ7QUFDQSxJQUFJQyxPQUFPRCxRQUFRLGNBQVIsQ0FBWDs7QUFFQUUsT0FBT0MsT0FBUCxHQUFpQjtBQUNiO0FBQ0FDLFdBQU8sZUFBU0MsSUFBVCxFQUFlO0FBQ2xCLFlBQUlBLFFBQVFKLEtBQUtJLElBQUwsQ0FBWixFQUF3QixPQUFPSixLQUFLSSxJQUFMLEVBQVdDLEtBQWxCO0FBQ3hCLGVBQU8sS0FBS0MsR0FBTCxFQUFQO0FBQ0gsS0FMWTtBQU1iO0FBQ0FBLFNBQUssZUFBVztBQUNaLFlBQUlDLE1BQU0sS0FBS0MsaUJBQUwsRUFBVjtBQUNBLFlBQUlDLE1BQU1YLFFBQVFZLE9BQVIsQ0FBZ0JILEdBQWhCLENBQVY7QUFDQSxZQUFJRCxNQUFNUixRQUFRYSxPQUFSLENBQWdCRixJQUFJLENBQUosQ0FBaEIsRUFBd0JBLElBQUksQ0FBSixDQUF4QixFQUFnQ0EsSUFBSSxDQUFKLENBQWhDLENBQVY7QUFDQSxlQUFPSCxHQUFQO0FBQ0gsS0FaWTtBQWFiO0FBQ0FHLFNBQUssZUFBVztBQUNaLFlBQUlGLE1BQU0sS0FBS0MsaUJBQUwsRUFBVjtBQUNBLFlBQUlDLE1BQU1YLFFBQVFZLE9BQVIsQ0FBZ0JILEdBQWhCLENBQVY7QUFDQSxlQUFPLFNBQ0hLLFNBQVNILElBQUksQ0FBSixDQUFULEVBQWlCLEVBQWpCLENBREcsR0FDb0IsSUFEcEIsR0FFSEcsU0FBU0gsSUFBSSxDQUFKLENBQVQsRUFBaUIsRUFBakIsQ0FGRyxHQUVvQixJQUZwQixHQUdIRyxTQUFTSCxJQUFJLENBQUosQ0FBVCxFQUFpQixFQUFqQixDQUhHLEdBR29CLEdBSDNCO0FBSUgsS0FyQlk7QUFzQmI7QUFDQUksVUFBTSxnQkFBVztBQUNiLFlBQUlOLE1BQU0sS0FBS0MsaUJBQUwsRUFBVjtBQUNBLFlBQUlDLE1BQU1YLFFBQVFZLE9BQVIsQ0FBZ0JILEdBQWhCLENBQVY7QUFDQSxlQUFPLFVBQ0hLLFNBQVNILElBQUksQ0FBSixDQUFULEVBQWlCLEVBQWpCLENBREcsR0FDb0IsSUFEcEIsR0FFSEcsU0FBU0gsSUFBSSxDQUFKLENBQVQsRUFBaUIsRUFBakIsQ0FGRyxHQUVvQixJQUZwQixHQUdIRyxTQUFTSCxJQUFJLENBQUosQ0FBVCxFQUFpQixFQUFqQixDQUhHLEdBR29CLElBSHBCLEdBSUhLLEtBQUtDLE1BQUwsR0FBY0MsT0FBZCxDQUFzQixDQUF0QixDQUpHLEdBSXdCLEdBSi9CO0FBS0gsS0EvQlk7QUFnQ2I7QUFDQUMsU0FBSyxlQUFXO0FBQ1osWUFBSVYsTUFBTSxLQUFLQyxpQkFBTCxFQUFWO0FBQ0EsWUFBSVMsTUFBTW5CLFFBQVFvQixPQUFSLENBQWdCWCxHQUFoQixDQUFWO0FBQ0EsZUFBTyxTQUNISyxTQUFTSyxJQUFJLENBQUosQ0FBVCxFQUFpQixFQUFqQixDQURHLEdBQ29CLElBRHBCLEdBRUhMLFNBQVNLLElBQUksQ0FBSixDQUFULEVBQWlCLEVBQWpCLENBRkcsR0FFb0IsSUFGcEIsR0FHSEwsU0FBU0ssSUFBSSxDQUFKLENBQVQsRUFBaUIsRUFBakIsQ0FIRyxHQUdvQixHQUgzQjtBQUlILEtBeENZO0FBeUNiO0FBQ0E7QUFDQTtBQUNBVCx1QkFBbUIsMkJBQVNXLFVBQVQsRUFBcUJDLEtBQXJCLEVBQTRCO0FBQzNDLGFBQUtDLFlBQUwsR0FBb0IsaUJBQXBCO0FBQ0EsYUFBS0MsSUFBTCxHQUFZLEtBQUtBLElBQUwsSUFBYVIsS0FBS0MsTUFBTCxFQUF6QjtBQUNBLGFBQUtPLElBQUwsSUFBYSxLQUFLRCxZQUFsQjtBQUNBLGFBQUtDLElBQUwsSUFBYSxDQUFiOztBQUVBLFlBQUksT0FBT0gsVUFBUCxLQUFzQixRQUExQixFQUFvQ0EsYUFBYSxHQUFiO0FBQ3BDLFlBQUksT0FBT0MsS0FBUCxLQUFpQixRQUFyQixFQUErQkEsUUFBUSxJQUFSOztBQUUvQixlQUFPLENBQ0gsS0FBS0UsSUFBTCxHQUFZLEdBRFQsRUFFSEgsYUFBYSxHQUZWLEVBR0hDLFFBQVEsR0FITCxDQUFQO0FBS0g7QUExRFksQ0FBakIiLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICAgICMjIENvbG9yXG5cbiAgICBodHRwOi8vbGxsbGxsLmxpL3JhbmRvbUNvbG9yL1xuICAgICAgICBBIGNvbG9yIGdlbmVyYXRvciBmb3IgSmF2YVNjcmlwdC5cbiAgICAgICAgcmFuZG9tQ29sb3IgZ2VuZXJhdGVzIGF0dHJhY3RpdmUgY29sb3JzIGJ5IGRlZmF1bHQuIE1vcmUgc3BlY2lmaWNhbGx5LCByYW5kb21Db2xvciBwcm9kdWNlcyBicmlnaHQgY29sb3JzIHdpdGggYSByZWFzb25hYmx5IGhpZ2ggc2F0dXJhdGlvbi4gVGhpcyBtYWtlcyByYW5kb21Db2xvciBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBkYXRhIHZpc3VhbGl6YXRpb25zIGFuZCBnZW5lcmF0aXZlIGFydC5cblxuICAgIGh0dHA6Ly9yYW5kb21jb2xvdXIuY29tL1xuICAgICAgICB2YXIgYmdfY29sb3VyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTY3NzcyMTUpLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgYmdfY29sb3VyID0gXCIjXCIgKyAoXCIwMDAwMDBcIiArIGJnX2NvbG91cikuc2xpY2UoLTYpO1xuICAgICAgICBkb2N1bWVudC5iZ0NvbG9yID0gYmdfY29sb3VyO1xuICAgIFxuICAgIGh0dHA6Ly9tYXJ0aW4uYW5rZXJsLmNvbS8yMDA5LzEyLzA5L2hvdy10by1jcmVhdGUtcmFuZG9tLWNvbG9ycy1wcm9ncmFtbWF0aWNhbGx5L1xuICAgICAgICBDcmVhdGluZyByYW5kb20gY29sb3JzIGlzIGFjdHVhbGx5IG1vcmUgZGlmZmljdWx0IHRoYW4gaXQgc2VlbXMuIFRoZSByYW5kb21uZXNzIGl0c2VsZiBpcyBlYXN5LCBidXQgYWVzdGhldGljYWxseSBwbGVhc2luZyByYW5kb21uZXNzIGlzIG1vcmUgZGlmZmljdWx0LlxuICAgICAgICBodHRwczovL2dpdGh1Yi5jb20vZGV2b25nb3ZldHQvY29sb3ItZ2VuZXJhdG9yXG5cbiAgICBodHRwOi8vd3d3LnBhdWxpcmlzaC5jb20vMjAwOS9yYW5kb20taGV4LWNvbG9yLWNvZGUtc25pcHBldHMvXG4gICAgICAgIFJhbmRvbSBIZXggQ29sb3IgQ29kZSBHZW5lcmF0b3IgaW4gSmF2YVNjcmlwdFxuXG4gICAgaHR0cDovL2NoYW5jZWpzLmNvbS8jY29sb3JcbiAgICAgICAgY2hhbmNlLmNvbG9yKClcbiAgICAgICAgLy8gPT4gJyM3OWMxNTcnXG4gICAgICAgIGNoYW5jZS5jb2xvcih7Zm9ybWF0OiAnaGV4J30pXG4gICAgICAgIC8vID0+ICcjZDY3MTE4J1xuICAgICAgICBjaGFuY2UuY29sb3Ioe2Zvcm1hdDogJ3Nob3J0aGV4J30pXG4gICAgICAgIC8vID0+ICcjNjBmJ1xuICAgICAgICBjaGFuY2UuY29sb3Ioe2Zvcm1hdDogJ3JnYid9KVxuICAgICAgICAvLyA9PiAncmdiKDExMCw1MiwxNjQpJ1xuXG4gICAgaHR0cDovL3Rvb2wuYzdza3kuY29tL3dlYmNvbG9yXG4gICAgICAgIOe9kemhteiuvuiuoeW4uOeUqOiJsuW9qeaQremFjeihqFxuICAgIFxuICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9PbmUtY29tL29uZS1jb2xvclxuICAgICAgICBBbiBPTy1iYXNlZCBKYXZhU2NyaXB0IGNvbG9yIHBhcnNlci9jb21wdXRhdGlvbiB0b29sa2l0IHdpdGggc3VwcG9ydCBmb3IgUkdCLCBIU1YsIEhTTCwgQ01ZSywgYW5kIGFscGhhIGNoYW5uZWxzLlxuICAgICAgICBBUEkg5b6I6LWeXG5cbiAgICBodHRwczovL2dpdGh1Yi5jb20vaGFydGh1ci9jb2xvclxuICAgICAgICBKYXZhU2NyaXB0IGNvbG9yIGNvbnZlcnNpb24gYW5kIG1hbmlwdWxhdGlvbiBsaWJyYXJ5XG5cbiAgICBodHRwczovL2dpdGh1Yi5jb20vbGVhdmVyb3UvY3NzLWNvbG9yc1xuICAgICAgICBTaGFyZSAmIGNvbnZlcnQgQ1NTIGNvbG9yc1xuICAgIGh0dHA6Ly9sZWF2ZXJvdS5naXRodWIuaW8vY3NzLWNvbG9ycy8jc2xhdGVncmF5XG4gICAgICAgIFR5cGUgYSBDU1MgY29sb3Iga2V5d29yZCwgI2hleCwgaHNsKCksIHJnYmEoKSwgd2hhdGV2ZXI6XG5cbiAgICDoibLosIMgaHVlXG4gICAgICAgIGh0dHA6Ly9iYWlrZS5iYWlkdS5jb20vdmlldy8yMzM2OC5odG1cbiAgICAgICAg6Imy6LCD5oyH55qE5piv5LiA5bmF55S75Lit55S76Z2i6Imy5b2p55qE5oC75L2T5YC+5ZCR77yM5piv5aSn55qE6Imy5b2p5pWI5p6c44CCXG4gICAg6aWx5ZKM5bqmIHNhdHVyYXRpb25cbiAgICAgICAgaHR0cDovL2JhaWtlLmJhaWR1LmNvbS92aWV3LzE4OTY0NC5odG1cbiAgICAgICAg6aWx5ZKM5bqm5piv5oyH6Imy5b2p55qE6bKc6Imz56iL5bqm77yM5Lmf56ew6Imy5b2p55qE57qv5bqm44CC6aWx5ZKM5bqm5Y+W5Yaz5LqO6K+l6Imy5Lit5ZCr6Imy5oiQ5YiG5ZKM5raI6Imy5oiQ5YiG77yI54Gw6Imy77yJ55qE5q+U5L6L44CC5ZCr6Imy5oiQ5YiG6LaK5aSn77yM6aWx5ZKM5bqm6LaK5aSn77yb5raI6Imy5oiQ5YiG6LaK5aSn77yM6aWx5ZKM5bqm6LaK5bCP44CCXG4gICAg5Lqu5bqmIGJyaWdodG5lc3NcbiAgICAgICAgaHR0cDovL2JhaWtlLmJhaWR1LmNvbS92aWV3LzM0NzczLmh0bVxuICAgICAgICDkuq7luqbmmK/mjIflj5HlhYnkvZPvvIjlj43lhYnkvZPvvInooajpnaLlj5HlhYnvvIjlj43lhYnvvInlvLrlvLHnmoTniannkIbph4/jgIJcbiAgICDnhafluqYgbHVtaW5vc2l0eVxuICAgICAgICDniankvZPooqvnhafkuq7nmoTnqIvluqYs6YeH55So5Y2V5L2N6Z2i56ev5omA5o6l5Y+X55qE5YWJ6YCa6YeP5p2l6KGo56S6LOihqOekuuWNleS9jeS4uuWLklvlhYvmlq9dKEx1eCxseCkgLOWNsyAxbSAvIG0yIOOAglxuXG4gICAgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNDg0NTA2L3JhbmRvbS1jb2xvci1nZW5lcmF0b3ItaW4tamF2YXNjcmlwdFxuICAgICAgICB2YXIgbGV0dGVycyA9ICcwMTIzNDU2Nzg5QUJDREVGJy5zcGxpdCgnJylcbiAgICAgICAgdmFyIGNvbG9yID0gJyMnXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgICAgICBjb2xvciArPSBsZXR0ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KV1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sb3JcbiAgICBcbiAgICAgICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq5peg6ISR55qE6aKc6Imy77yM5qC85byP5Li6ICcjUlJHR0JCJ+OAglxuICAgICAgICAvLyBfYnJhaW5sZXNzQ29sb3IoKVxuICAgICAgICB2YXIgY29sb3IgPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAoMTYgKiAxNiAqIDE2ICogMTYgKiAxNiAqIDE2IC0gMSlcbiAgICAgICAgKS50b1N0cmluZygxNilcbiAgICAgICAgY29sb3IgPSBcIiNcIiArIChcIjAwMDAwMFwiICsgY29sb3IpLnNsaWNlKC02KVxuICAgICAgICByZXR1cm4gY29sb3IudG9VcHBlckNhc2UoKVxuKi9cblxudmFyIENvbnZlcnQgPSByZXF1aXJlKCcuL2NvbG9yX2NvbnZlcnQnKVxudmFyIERJQ1QgPSByZXF1aXJlKCcuL2NvbG9yX2RpY3QnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKrmnInlkLjlvJXlipvnmoTpopzoibLvvIzmoLzlvI/kuLogJyNSUkdHQkIn44CCXG4gICAgY29sb3I6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUgfHwgRElDVFtuYW1lXSkgcmV0dXJuIERJQ1RbbmFtZV0ubmljZXJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGV4KClcbiAgICB9LFxuICAgIC8vICNEQUMwREVcbiAgICBoZXg6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaHN2ID0gdGhpcy5fZ29sZGVuUmF0aW9Db2xvcigpXG4gICAgICAgIHZhciByZ2IgPSBDb252ZXJ0LmhzdjJyZ2IoaHN2KVxuICAgICAgICB2YXIgaGV4ID0gQ29udmVydC5yZ2IyaGV4KHJnYlswXSwgcmdiWzFdLCByZ2JbMl0pXG4gICAgICAgIHJldHVybiBoZXhcbiAgICB9LFxuICAgIC8vIHJnYigxMjgsMjU1LDI1NSlcbiAgICByZ2I6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaHN2ID0gdGhpcy5fZ29sZGVuUmF0aW9Db2xvcigpXG4gICAgICAgIHZhciByZ2IgPSBDb252ZXJ0LmhzdjJyZ2IoaHN2KVxuICAgICAgICByZXR1cm4gJ3JnYignICtcbiAgICAgICAgICAgIHBhcnNlSW50KHJnYlswXSwgMTApICsgJywgJyArXG4gICAgICAgICAgICBwYXJzZUludChyZ2JbMV0sIDEwKSArICcsICcgK1xuICAgICAgICAgICAgcGFyc2VJbnQocmdiWzJdLCAxMCkgKyAnKSdcbiAgICB9LFxuICAgIC8vIHJnYmEoMTI4LDI1NSwyNTUsMC4zKVxuICAgIHJnYmE6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaHN2ID0gdGhpcy5fZ29sZGVuUmF0aW9Db2xvcigpXG4gICAgICAgIHZhciByZ2IgPSBDb252ZXJ0LmhzdjJyZ2IoaHN2KVxuICAgICAgICByZXR1cm4gJ3JnYmEoJyArXG4gICAgICAgICAgICBwYXJzZUludChyZ2JbMF0sIDEwKSArICcsICcgK1xuICAgICAgICAgICAgcGFyc2VJbnQocmdiWzFdLCAxMCkgKyAnLCAnICtcbiAgICAgICAgICAgIHBhcnNlSW50KHJnYlsyXSwgMTApICsgJywgJyArXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLnRvRml4ZWQoMikgKyAnKSdcbiAgICB9LFxuICAgIC8vIGhzbCgzMDAsODAlLDkwJSlcbiAgICBoc2w6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaHN2ID0gdGhpcy5fZ29sZGVuUmF0aW9Db2xvcigpXG4gICAgICAgIHZhciBoc2wgPSBDb252ZXJ0LmhzdjJoc2woaHN2KVxuICAgICAgICByZXR1cm4gJ2hzbCgnICtcbiAgICAgICAgICAgIHBhcnNlSW50KGhzbFswXSwgMTApICsgJywgJyArXG4gICAgICAgICAgICBwYXJzZUludChoc2xbMV0sIDEwKSArICcsICcgK1xuICAgICAgICAgICAgcGFyc2VJbnQoaHNsWzJdLCAxMCkgKyAnKSdcbiAgICB9LFxuICAgIC8vIGh0dHA6Ly9tYXJ0aW4uYW5rZXJsLmNvbS8yMDA5LzEyLzA5L2hvdy10by1jcmVhdGUtcmFuZG9tLWNvbG9ycy1wcm9ncmFtbWF0aWNhbGx5L1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZvbmdvdmV0dC9jb2xvci1nZW5lcmF0b3IvYmxvYi9tYXN0ZXIvaW5kZXguanNcbiAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKrmnInlkLjlvJXlipvnmoTpopzoibLjgIJcbiAgICBfZ29sZGVuUmF0aW9Db2xvcjogZnVuY3Rpb24oc2F0dXJhdGlvbiwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZ29sZGVuUmF0aW8gPSAwLjYxODAzMzk4ODc0OTg5NVxuICAgICAgICB0aGlzLl9odWUgPSB0aGlzLl9odWUgfHwgTWF0aC5yYW5kb20oKVxuICAgICAgICB0aGlzLl9odWUgKz0gdGhpcy5fZ29sZGVuUmF0aW9cbiAgICAgICAgdGhpcy5faHVlICU9IDFcblxuICAgICAgICBpZiAodHlwZW9mIHNhdHVyYXRpb24gIT09IFwibnVtYmVyXCIpIHNhdHVyYXRpb24gPSAwLjU7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHZhbHVlID0gMC45NTtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGhpcy5faHVlICogMzYwLFxuICAgICAgICAgICAgc2F0dXJhdGlvbiAqIDEwMCxcbiAgICAgICAgICAgIHZhbHVlICogMTAwXG4gICAgICAgIF1cbiAgICB9XG59Il19