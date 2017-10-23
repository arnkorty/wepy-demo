'use strict';

/*
    ## Text

    http://www.lipsum.com/
*/
var Basic = require('./basic.js');
var Helper = require('./helper.js');

function range(defaultMin, defaultMax, min, max) {
    return min === undefined ? Basic.natural(defaultMin, defaultMax) : // ()
    max === undefined ? min : // ( len )
    Basic.natural(parseInt(min, 10), parseInt(max, 10)); // ( min, max )
}

module.exports = {
    // 随机生成一段文本。
    paragraph: function paragraph(min, max) {
        var len = range(3, 7, min, max);
        var result = [];
        for (var i = 0; i < len; i++) {
            result.push(this.sentence());
        }
        return result.join(' ');
    },
    // 
    cparagraph: function cparagraph(min, max) {
        var len = range(3, 7, min, max);
        var result = [];
        for (var i = 0; i < len; i++) {
            result.push(this.csentence());
        }
        return result.join('');
    },
    // 随机生成一个句子，第一个单词的首字母大写。
    sentence: function sentence(min, max) {
        var len = range(12, 18, min, max);
        var result = [];
        for (var i = 0; i < len; i++) {
            result.push(this.word());
        }
        return Helper.capitalize(result.join(' ')) + '.';
    },
    // 随机生成一个中文句子。
    csentence: function csentence(min, max) {
        var len = range(12, 18, min, max);
        var result = [];
        for (var i = 0; i < len; i++) {
            result.push(this.cword());
        }

        return result.join('') + '。';
    },
    // 随机生成一个单词。
    word: function word(min, max) {
        var len = range(3, 10, min, max);
        var result = '';
        for (var i = 0; i < len; i++) {
            result += Basic.character('lower');
        }
        return result;
    },
    // 随机生成一个或多个汉字。
    cword: function cword(pool, min, max) {
        // 最常用的 500 个汉字 http://baike.baidu.com/view/568436.htm
        var DICT_KANZI = '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞';

        var len;
        switch (arguments.length) {
            case 0:
                // ()
                pool = DICT_KANZI;
                len = 1;
                break;
            case 1:
                // ( pool )
                if (typeof arguments[0] === 'string') {
                    len = 1;
                } else {
                    // ( length )
                    len = pool;
                    pool = DICT_KANZI;
                }
                break;
            case 2:
                // ( pool, length )
                if (typeof arguments[0] === 'string') {
                    len = min;
                } else {
                    // ( min, max )
                    len = this.natural(pool, min);
                    pool = DICT_KANZI;
                }
                break;
            case 3:
                len = this.natural(min, max);
                break;
        }

        var result = '';
        for (var i = 0; i < len; i++) {
            result += pool.charAt(this.natural(0, pool.length - 1));
        }
        return result;
    },
    // 随机生成一句标题，其中每个单词的首字母大写。
    title: function title(min, max) {
        var len = range(3, 7, min, max);
        var result = [];
        for (var i = 0; i < len; i++) {
            result.push(this.capitalize(this.word()));
        }
        return result.join(' ');
    },
    // 随机生成一句中文标题。
    ctitle: function ctitle(min, max) {
        var len = range(3, 7, min, max);
        var result = [];
        for (var i = 0; i < len; i++) {
            result.push(this.cword());
        }
        return result.join('');
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHQuanMiXSwibmFtZXMiOlsiQmFzaWMiLCJyZXF1aXJlIiwiSGVscGVyIiwicmFuZ2UiLCJkZWZhdWx0TWluIiwiZGVmYXVsdE1heCIsIm1pbiIsIm1heCIsInVuZGVmaW5lZCIsIm5hdHVyYWwiLCJwYXJzZUludCIsIm1vZHVsZSIsImV4cG9ydHMiLCJwYXJhZ3JhcGgiLCJsZW4iLCJyZXN1bHQiLCJpIiwicHVzaCIsInNlbnRlbmNlIiwiam9pbiIsImNwYXJhZ3JhcGgiLCJjc2VudGVuY2UiLCJ3b3JkIiwiY2FwaXRhbGl6ZSIsImN3b3JkIiwiY2hhcmFjdGVyIiwicG9vbCIsIkRJQ1RfS0FOWkkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJjaGFyQXQiLCJ0aXRsZSIsImN0aXRsZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7QUFLQSxJQUFJQSxRQUFRQyxRQUFRLFNBQVIsQ0FBWjtBQUNBLElBQUlDLFNBQVNELFFBQVEsVUFBUixDQUFiOztBQUVBLFNBQVNFLEtBQVQsQ0FBZUMsVUFBZixFQUEyQkMsVUFBM0IsRUFBdUNDLEdBQXZDLEVBQTRDQyxHQUE1QyxFQUFpRDtBQUM3QyxXQUFPRCxRQUFRRSxTQUFSLEdBQW9CUixNQUFNUyxPQUFOLENBQWNMLFVBQWQsRUFBMEJDLFVBQTFCLENBQXBCLEdBQTREO0FBQy9ERSxZQUFRQyxTQUFSLEdBQW9CRixHQUFwQixHQUEwQjtBQUMxQk4sVUFBTVMsT0FBTixDQUFjQyxTQUFTSixHQUFULEVBQWMsRUFBZCxDQUFkLEVBQWlDSSxTQUFTSCxHQUFULEVBQWMsRUFBZCxDQUFqQyxDQUZKLENBRDZDLENBR1c7QUFDM0Q7O0FBRURJLE9BQU9DLE9BQVAsR0FBaUI7QUFDYjtBQUNBQyxlQUFXLG1CQUFTUCxHQUFULEVBQWNDLEdBQWQsRUFBbUI7QUFDMUIsWUFBSU8sTUFBTVgsTUFBTSxDQUFOLEVBQVMsQ0FBVCxFQUFZRyxHQUFaLEVBQWlCQyxHQUFqQixDQUFWO0FBQ0EsWUFBSVEsU0FBUyxFQUFiO0FBQ0Es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UCxDQUFZLEtBQUtPLEtBQUwsRUFBWjtBQUNIO0FBQ0QsZUFBT1QsT0FBT0ksSUFBUCxDQUFZLEVBQVosQ0FBUDtBQUNIO0FBekdZLENBQWpCIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICAgICMjIFRleHRcblxuICAgIGh0dHA6Ly93d3cubGlwc3VtLmNvbS9cbiovXG52YXIgQmFzaWMgPSByZXF1aXJlKCcuL2Jhc2ljJylcbnZhciBIZWxwZXIgPSByZXF1aXJlKCcuL2hlbHBlcicpXG5cbmZ1bmN0aW9uIHJhbmdlKGRlZmF1bHRNaW4sIGRlZmF1bHRNYXgsIG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIG1pbiA9PT0gdW5kZWZpbmVkID8gQmFzaWMubmF0dXJhbChkZWZhdWx0TWluLCBkZWZhdWx0TWF4KSA6IC8vICgpXG4gICAgICAgIG1heCA9PT0gdW5kZWZpbmVkID8gbWluIDogLy8gKCBsZW4gKVxuICAgICAgICBCYXNpYy5uYXR1cmFsKHBhcnNlSW50KG1pbiwgMTApLCBwYXJzZUludChtYXgsIDEwKSkgLy8gKCBtaW4sIG1heCApXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIC8vIOmaj+acuueUn+aIkOS4gOauteaWh+acrOOAglxuICAgIHBhcmFncmFwaDogZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgICAgICAgdmFyIGxlbiA9IHJhbmdlKDMsIDcsIG1pbiwgbWF4KVxuICAgICAgICB2YXIgcmVzdWx0ID0gW11cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5zZW50ZW5jZSgpKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQuam9pbignICcpXG4gICAgfSxcbiAgICAvLyBcbiAgICBjcGFyYWdyYXBoOiBmdW5jdGlvbihtaW4sIG1heCkge1xuICAgICAgICB2YXIgbGVuID0gcmFuZ2UoMywgNywgbWluLCBtYXgpXG4gICAgICAgIHZhciByZXN1bHQgPSBbXVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmNzZW50ZW5jZSgpKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQuam9pbignJylcbiAgICB9LFxuICAgIC8vIOmaj+acuueUn+aIkOS4gOS4quWPpeWtkO+8jOesrOS4gOS4quWNleivjeeahOmmluWtl+avjeWkp+WGmeOAglxuICAgIHNlbnRlbmNlOiBmdW5jdGlvbihtaW4sIG1heCkge1xuICAgICAgICB2YXIgbGVuID0gcmFuZ2UoMTIsIDE4LCBtaW4sIG1heClcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMud29yZCgpKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBIZWxwZXIuY2FwaXRhbGl6ZShyZXN1bHQuam9pbignICcpKSArICcuJ1xuICAgIH0sXG4gICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq5Lit5paH5Y+l5a2Q44CCXG4gICAgY3NlbnRlbmNlOiBmdW5jdGlvbihtaW4sIG1heCkge1xuICAgICAgICB2YXIgbGVuID0gcmFuZ2UoMTIsIDE4LCBtaW4sIG1heClcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuY3dvcmQoKSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQuam9pbignJykgKyAn44CCJ1xuICAgIH0sXG4gICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq5Y2V6K+N44CCXG4gICAgd29yZDogZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgICAgICAgdmFyIGxlbiA9IHJhbmdlKDMsIDEwLCBtaW4sIG1heClcbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gQmFzaWMuY2hhcmFjdGVyKCdsb3dlcicpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0sXG4gICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq5oiW5aSa5Liq5rGJ5a2X44CCXG4gICAgY3dvcmQ6IGZ1bmN0aW9uKHBvb2wsIG1pbiwgbWF4KSB7XG4gICAgICAgIC8vIOacgOW4uOeUqOeahCA1MDAg5Liq5rGJ5a2XIGh0dHA6Ly9iYWlrZS5iYWlkdS5jb20vdmlldy81Njg0MzYuaHRtXG4gICAgICAgIHZhciBESUNUX0tBTlpJID0gJ+eahOS4gOaYr+WcqOS4jeS6huacieWSjOS6uui/meS4reWkp+S4uuS4iuS4quWbveaIkeS7peimgeS7luaXtuadpeeUqOS7rOeUn+WIsOS9nOWcsOS6juWHuuWwseWIhuWvueaIkOS8muWPr+S4u+WPkeW5tOWKqOWQjOW3peS5n+iDveS4i+i/h+WtkOivtOS6p+enjemdouiAjOaWueWQjuWkmuWumuihjOWtpuazleaJgOawkeW+l+e7j+WNgeS4ieS5i+i/m+edgOetiemDqOW6puWutueUteWKm+mHjOWmguawtOWMlumrmOiHquS6jOeQhui1t+Wwj+eJqeeOsOWunuWKoOmHj+mDveS4pOS9k+WItuacuuW9k+S9v+eCueS7juS4muacrOWOu+aKiuaAp+WlveW6lOW8gOWug+WQiOi/mOWboOeUseWFtuS6m+eEtuWJjeWkluWkqeaUv+Wbm+aXpemCo+ekvuS5ieS6i+W5s+W9ouebuOWFqOihqOmXtOagt+S4juWFs+WQhOmHjeaWsOe6v+WGheaVsOato+W/g+WPjeS9oOaYjueci+WOn+WPiOS5iOWIqeavlOaIluS9hui0qOawlOesrOWQkemBk+WRveatpOWPmOadoeWPquayoee7k+ino+mXruaEj+W7uuaciOWFrOaXoOezu+WGm+W+iOaDheiAheacgOeri+S7o+aDs+W3sumAmuW5tuaPkOebtOmimOWFmueoi+WxleS6lOaenOaWmeixoeWRmOmdqeS9jeWFpeW4uOaWh+aAu+asoeWTgeW8j+a0u+iuvuWPiueuoeeJueS7tumVv+axguiAgeWktOWfuui1hOi+uea1gei3r+e6p+WwkeWbvuWxsee7n+aOpeefpei+g+Wwhue7hOingeiuoeWIq+WlueaJi+inkuacn+agueiuuui/kOWGnOaMh+WHoOS5neWMuuW8uuaUvuWGs+ilv+iiq+W5suWBmuW/heaImOWFiOWbnuWImeS7u+WPluaNruWkhOmYn+WNl+e7meiJsuWFiemXqOWNs+S/neayu+WMl+mAoOeZvuinhOeDremihuS4g+a1t+WPo+S4nOWvvOWZqOWOi+W/l+S4lumHkeWinuS6iea1jumYtuayueaAneacr+aegeS6pOWPl+iBlOS7gOiupOWFreWFseadg+aUtuivgeaUuea4heW3see+juWGjemHh+i9rOabtOWNlemjjuWIh+aJk+eZveaVmemAn+iKseW4puWuieWcuui6q+i9puS+i+ecn+WKoeWFt+S4h+avj+ebruiHs+i+vui1sOenr+ekuuiuruWjsOaKpeaWl+WujOexu+WFq+emu+WNjuWQjeehruaJjeenkeW8oOS/oemprOiKguivneexs+aVtOepuuWFg+WGteS7iumbhua4qeS8oOWcn+iuuOatpee+pOW5v+efs+iusOmcgOauteeglOeVjOaLieael+W+i+WPq+S4lOeptuingui2iue7h+ijheW9seeul+S9juaMgemfs+S8l+S5puW4g+WkjeWuueWEv+mhu+mZheWVhumdnumqjOi/nuaWrea3semavui/keefv+WNg+WRqOWnlOe0oOaKgOWkh+WNiuWKnumdkuecgeWIl+S5oOWTjee6puaUr+iIrOWPsuaEn+WKs+S+v+WbouW+gOmFuOWOhuW4guWFi+S9lemZpOa2iOaehOW6nOensOWkquWHhueyvuWAvOWPt+eOh+aXj+e7tOWIkumAieagh+WGmeWtmOWAmeavm+S6suW/q+aViOaWr+mZouafpeaxn+Wei+ecvOeOi+aMieagvOWFu+aYk+e9rua0vuWxgueJh+Wni+WNtOS4k+eKtuiCsuWOguS6rOivhumAguWxnuWchuWMheeBq+S9j+iwg+a7oeWOv+WxgOeFp+WPgue6oue7huW8leWQrOivpemTgeS7t+S4pem+memjnidcblxuICAgICAgICB2YXIgbGVuXG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiAvLyAoKVxuICAgICAgICAgICAgICAgIHBvb2wgPSBESUNUX0tBTlpJXG4gICAgICAgICAgICAgICAgbGVuID0gMVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDE6IC8vICggcG9vbCApXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IDFcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyAoIGxlbmd0aCApXG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IHBvb2xcbiAgICAgICAgICAgICAgICAgICAgcG9vbCA9IERJQ1RfS0FOWklcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAvLyAoIHBvb2wsIGxlbmd0aCApXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IG1pblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICggbWluLCBtYXggKVxuICAgICAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLm5hdHVyYWwocG9vbCwgbWluKVxuICAgICAgICAgICAgICAgICAgICBwb29sID0gRElDVF9LQU5aSVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMubmF0dXJhbChtaW4sIG1heClcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBwb29sLmNoYXJBdCh0aGlzLm5hdHVyYWwoMCwgcG9vbC5sZW5ndGggLSAxKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSxcbiAgICAvLyDpmo/mnLrnlJ/miJDkuIDlj6XmoIfpopjvvIzlhbbkuK3mr4/kuKrljZXor43nmoTpppblrZfmr43lpKflhpnjgIJcbiAgICB0aXRsZTogZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgICAgICAgdmFyIGxlbiA9IHJhbmdlKDMsIDcsIG1pbiwgbWF4KVxuICAgICAgICB2YXIgcmVzdWx0ID0gW11cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5jYXBpdGFsaXplKHRoaXMud29yZCgpKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKVxuICAgIH0sXG4gICAgLy8g6ZqP5py655Sf5oiQ5LiA5Y+l5Lit5paH5qCH6aKY44CCXG4gICAgY3RpdGxlOiBmdW5jdGlvbihtaW4sIG1heCkge1xuICAgICAgICB2YXIgbGVuID0gcmFuZ2UoMywgNywgbWluLCBtYXgpXG4gICAgICAgIHZhciByZXN1bHQgPSBbXVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmN3b3JkKCkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKVxuICAgIH1cbn0iXX0=