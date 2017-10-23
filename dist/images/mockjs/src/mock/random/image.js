'use strict';

/* global document  */
/*
    ## Image
*/
module.exports = {
    // 常见的广告宽高
    _adSize: ['300x250', '250x250', '240x400', '336x280', '180x150', '720x300', '468x60', '234x60', '88x31', '120x90', '120x60', '120x240', '125x125', '728x90', '160x600', '120x600', '300x600'],
    // 常见的屏幕宽高
    _screenSize: ['320x200', '320x240', '640x480', '800x480', '800x480', '1024x600', '1024x768', '1280x800', '1440x900', '1920x1200', '2560x1600'],
    // 常见的视频宽高
    _videoSize: ['720x480', '768x576', '1280x720', '1920x1080'],
    /*
        生成一个随机的图片地址。
         替代图片源
            http://fpoimg.com/
        参考自 
            http://rensanning.iteye.com/blog/1933310
            http://code.tutsplus.com/articles/the-top-8-placeholders-for-web-designers--net-19485
    */
    image: function image(size, background, foreground, format, text) {
        // Random.image( size, background, foreground, text )
        if (arguments.length === 4) {
            text = format;
            format = undefined;
        }
        // Random.image( size, background, text )
        if (arguments.length === 3) {
            text = foreground;
            foreground = undefined;
        }
        // Random.image()
        if (!size) size = this.pick(this._adSize);

        if (background && ~background.indexOf('#')) background = background.slice(1);
        if (foreground && ~foreground.indexOf('#')) foreground = foreground.slice(1);

        // http://dummyimage.com/600x400/cc00cc/470047.png&text=hello
        return 'http://dummyimage.com/' + size + (background ? '/' + background : '') + (foreground ? '/' + foreground : '') + (format ? '.' + format : '') + (text ? '&text=' + text : '');
    },
    img: function img() {
        return this.image.apply(this, arguments);
    },

    /*
        BrandColors
        http://brandcolors.net/
        A collection of major brand color codes curated by Galen Gidman.
        大牌公司的颜色集合
         // 获取品牌和颜色
        $('h2').each(function(index, item){
            item = $(item)
            console.log('\'' + item.text() + '\'', ':', '\'' + item.next().text() + '\'', ',')
        })
    */
    _brandColors: {
        '4ormat': '#fb0a2a',
        '500px': '#02adea',
        'About.me (blue)': '#00405d',
        'About.me (yellow)': '#ffcc33',
        'Addvocate': '#ff6138',
        'Adobe': '#ff0000',
        'Aim': '#fcd20b',
        'Amazon': '#e47911',
        'Android': '#a4c639',
        'Angie\'s List': '#7fbb00',
        'AOL': '#0060a3',
        'Atlassian': '#003366',
        'Behance': '#053eff',
        'Big Cartel': '#97b538',
        'bitly': '#ee6123',
        'Blogger': '#fc4f08',
        'Boeing': '#0039a6',
        'Booking.com': '#003580',
        'Carbonmade': '#613854',
        'Cheddar': '#ff7243',
        'Code School': '#3d4944',
        'Delicious': '#205cc0',
        'Dell': '#3287c1',
        'Designmoo': '#e54a4f',
        'Deviantart': '#4e6252',
        'Designer News': '#2d72da',
        'Devour': '#fd0001',
        'DEWALT': '#febd17',
        'Disqus (blue)': '#59a3fc',
        'Disqus (orange)': '#db7132',
        'Dribbble': '#ea4c89',
        'Dropbox': '#3d9ae8',
        'Drupal': '#0c76ab',
        'Dunked': '#2a323a',
        'eBay': '#89c507',
        'Ember': '#f05e1b',
        'Engadget': '#00bdf6',
        'Envato': '#528036',
        'Etsy': '#eb6d20',
        'Evernote': '#5ba525',
        'Fab.com': '#dd0017',
        'Facebook': '#3b5998',
        'Firefox': '#e66000',
        'Flickr (blue)': '#0063dc',
        'Flickr (pink)': '#ff0084',
        'Forrst': '#5b9a68',
        'Foursquare': '#25a0ca',
        'Garmin': '#007cc3',
        'GetGlue': '#2d75a2',
        'Gimmebar': '#f70078',
        'GitHub': '#171515',
        'Google Blue': '#0140ca',
        'Google Green': '#16a61e',
        'Google Red': '#dd1812',
        'Google Yellow': '#fcca03',
        'Google+': '#dd4b39',
        'Grooveshark': '#f77f00',
        'Groupon': '#82b548',
        'Hacker News': '#ff6600',
        'HelloWallet': '#0085ca',
        'Heroku (light)': '#c7c5e6',
        'Heroku (dark)': '#6567a5',
        'HootSuite': '#003366',
        'Houzz': '#73ba37',
        'HTML5': '#ec6231',
        'IKEA': '#ffcc33',
        'IMDb': '#f3ce13',
        'Instagram': '#3f729b',
        'Intel': '#0071c5',
        'Intuit': '#365ebf',
        'Kickstarter': '#76cc1e',
        'kippt': '#e03500',
        'Kodery': '#00af81',
        'LastFM': '#c3000d',
        'LinkedIn': '#0e76a8',
        'Livestream': '#cf0005',
        'Lumo': '#576396',
        'Mixpanel': '#a086d3',
        'Meetup': '#e51937',
        'Nokia': '#183693',
        'NVIDIA': '#76b900',
        'Opera': '#cc0f16',
        'Path': '#e41f11',
        'PayPal (dark)': '#1e477a',
        'PayPal (light)': '#3b7bbf',
        'Pinboard': '#0000e6',
        'Pinterest': '#c8232c',
        'PlayStation': '#665cbe',
        'Pocket': '#ee4056',
        'Prezi': '#318bff',
        'Pusha': '#0f71b4',
        'Quora': '#a82400',
        'QUOTE.fm': '#66ceff',
        'Rdio': '#008fd5',
        'Readability': '#9c0000',
        'Red Hat': '#cc0000',
        'Resource': '#7eb400',
        'Rockpack': '#0ba6ab',
        'Roon': '#62b0d9',
        'RSS': '#ee802f',
        'Salesforce': '#1798c1',
        'Samsung': '#0c4da2',
        'Shopify': '#96bf48',
        'Skype': '#00aff0',
        'Snagajob': '#f47a20',
        'Softonic': '#008ace',
        'SoundCloud': '#ff7700',
        'Space Box': '#f86960',
        'Spotify': '#81b71a',
        'Sprint': '#fee100',
        'Squarespace': '#121212',
        'StackOverflow': '#ef8236',
        'Staples': '#cc0000',
        'Status Chart': '#d7584f',
        'Stripe': '#008cdd',
        'StudyBlue': '#00afe1',
        'StumbleUpon': '#f74425',
        'T-Mobile': '#ea0a8e',
        'Technorati': '#40a800',
        'The Next Web': '#ef4423',
        'Treehouse': '#5cb868',
        'Trulia': '#5eab1f',
        'Tumblr': '#34526f',
        'Twitch.tv': '#6441a5',
        'Twitter': '#00acee',
        'TYPO3': '#ff8700',
        'Ubuntu': '#dd4814',
        'Ustream': '#3388ff',
        'Verizon': '#ef1d1d',
        'Vimeo': '#86c9ef',
        'Vine': '#00a478',
        'Virb': '#06afd8',
        'Virgin Media': '#cc0000',
        'Wooga': '#5b009c',
        'WordPress (blue)': '#21759b',
        'WordPress (orange)': '#d54e21',
        'WordPress (grey)': '#464646',
        'Wunderlist': '#2b88d9',
        'XBOX': '#9bc848',
        'XING': '#126567',
        'Yahoo!': '#720e9e',
        'Yandex': '#ffcc00',
        'Yelp': '#c41200',
        'YouTube': '#c4302b',
        'Zalongo': '#5498dc',
        'Zendesk': '#78a300',
        'Zerply': '#9dcc7a',
        'Zootool': '#5e8b1d'
    },
    _brandNames: function _brandNames() {
        var brands = [];
        for (var b in this._brandColors) {
            brands.push(b);
        }
        return brands;
    },
    /*
        生成一段随机的 Base64 图片编码。
         https://github.com/imsky/holder
        Holder renders image placeholders entirely on the client side.
         dataImageHolder: function(size) {
            return 'holder.js/' + size
        },
    */
    dataImage: function dataImage(size, text) {
        var canvas;
        if (typeof document !== 'undefined') {
            canvas = document.createElement('canvas');
        } else {
            /*
                https://github.com/Automattic/node-canvas
                    npm install canvas --save
                安装问题：
                * http://stackoverflow.com/questions/22953206/gulp-issues-with-cario-install-command-not-found-when-trying-to-installing-canva
                * https://github.com/Automattic/node-canvas/issues/415
                * https://github.com/Automattic/node-canvas/wiki/_pages
                 PS：node-canvas 的安装过程实在是太繁琐了，所以不放入 package.json 的 dependencies。
             */
            var Canvas = module.require('./../../../../../npm/canvas/lib/canvas.js');
            canvas = new Canvas();
        }

        var ctx = canvas && canvas.getContext && canvas.getContext("2d");
        if (!canvas || !ctx) return '';

        if (!size) size = this.pick(this._adSize);
        text = text !== undefined ? text : size;

        size = size.split('x');

        var width = parseInt(size[0], 10),
            height = parseInt(size[1], 10),
            background = this._brandColors[this.pick(this._brandNames())],
            foreground = '#FFF',
            text_height = 14,
            font = 'sans-serif';

        canvas.width = width;
        canvas.height = height;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = foreground;
        ctx.font = 'bold ' + text_height + 'px ' + font;
        ctx.fillText(text, width / 2, height / 2, width);
        return canvas.toDataURL('image/png');
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJfYWRTaXplIiwiX3NjcmVlblNpemUiLCJfdmlkZW9TaXplIiwiaW1hZ2UiLCJzaXplIiwiYmFja2dyb3VuZCIsImZvcmVncm91bmQiLCJmb3JtYXQiLCJ0ZXh0IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwicGljayIsImluZGV4T2YiLCJzbGljZSIsImltZyIsImFwcGx5IiwiX2JyYW5kQ29sb3JzIiwiX2JyYW5kTmFtZXMiLCJicmFuZHMiLCJiIiwicHVzaCIsImRhdGFJbWFnZSIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIkNhbnZhcyIsInJlcXVpcmUiLCJjdHgiLCJnZXRDb250ZXh0Iiwic3BsaXQiLCJ3aWR0aCIsInBhcnNlSW50IiwiaGVpZ2h0IiwidGV4dF9oZWlnaHQiLCJmb250IiwidGV4dEFsaWduIiwidGV4dEJhc2VsaW5lIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJmaWxsVGV4dCIsInRvRGF0YVVSTCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOzs7QUFHQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNiO0FBQ0FDLGFBQVMsQ0FDTCxTQURLLEVBQ00sU0FETixFQUNpQixTQURqQixFQUM0QixTQUQ1QixFQUN1QyxTQUR2QyxFQUVMLFNBRkssRUFFTSxRQUZOLEVBRWdCLFFBRmhCLEVBRTBCLE9BRjFCLEVBRW1DLFFBRm5DLEVBR0wsUUFISyxFQUdLLFNBSEwsRUFHZ0IsU0FIaEIsRUFHMkIsUUFIM0IsRUFHcUMsU0FIckMsRUFJTCxTQUpLLEVBSU0sU0FKTixDQUZJO0FBUWI7QUFDQUMsaUJBQWEsQ0FDVCxTQURTLEVBQ0UsU0FERixFQUNhLFNBRGIsRUFDd0IsU0FEeEIsRUFDbUMsU0FEbkMsRUFFVCxVQUZTLEVBRUcsVUFGSCxFQUVlLFVBRmYsRUFFMkIsVUFGM0IsRUFFdUMsV0FGdkMsRUFHVCxXQUhTLENBVEE7QUFjYjtB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USxLQUFQLEdBQWVBLEtBQWY7QUFDQVIsZUFBT1UsTUFBUCxHQUFnQkEsTUFBaEI7QUFDQUwsWUFBSVEsU0FBSixHQUFnQixRQUFoQjtBQUNBUixZQUFJUyxZQUFKLEdBQW1CLFFBQW5CO0FBQ0FULFlBQUlVLFNBQUosR0FBZ0JqQyxVQUFoQjtBQUNBdUIsWUFBSVcsUUFBSixDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUJSLEtBQW5CLEVBQTBCRSxNQUExQjtBQUNBTCxZQUFJVSxTQUFKLEdBQWdCaEMsVUFBaEI7QUFDQXNCLFlBQUlPLElBQUosR0FBVyxVQUFVRCxXQUFWLEdBQXdCLEtBQXhCLEdBQWdDQyxJQUEzQztBQUNBUCxZQUFJWSxRQUFKLENBQWFoQyxJQUFiLEVBQW9CdUIsUUFBUSxDQUE1QixFQUFpQ0UsU0FBUyxDQUExQyxFQUE4Q0YsS0FBOUM7QUFDQSxlQUFPUixPQUFPa0IsU0FBUCxDQUFpQixXQUFqQixDQUFQO0FBQ0g7QUFwUlksQ0FBakIiLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgZG9jdW1lbnQgICovXG4vKlxuICAgICMjIEltYWdlXG4qL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLy8g5bi46KeB55qE5bm/5ZGK5a696auYXG4gICAgX2FkU2l6ZTogW1xuICAgICAgICAnMzAweDI1MCcsICcyNTB4MjUwJywgJzI0MHg0MDAnLCAnMzM2eDI4MCcsICcxODB4MTUwJyxcbiAgICAgICAgJzcyMHgzMDAnLCAnNDY4eDYwJywgJzIzNHg2MCcsICc4OHgzMScsICcxMjB4OTAnLFxuICAgICAgICAnMTIweDYwJywgJzEyMHgyNDAnLCAnMTI1eDEyNScsICc3Mjh4OTAnLCAnMTYweDYwMCcsXG4gICAgICAgICcxMjB4NjAwJywgJzMwMHg2MDAnXG4gICAgXSxcbiAgICAvLyDluLjop4HnmoTlsY/luZXlrr3pq5hcbiAgICBfc2NyZWVuU2l6ZTogW1xuICAgICAgICAnMzIweDIwMCcsICczMjB4MjQwJywgJzY0MHg0ODAnLCAnODAweDQ4MCcsICc4MDB4NDgwJyxcbiAgICAgICAgJzEwMjR4NjAwJywgJzEwMjR4NzY4JywgJzEyODB4ODAwJywgJzE0NDB4OTAwJywgJzE5MjB4MTIwMCcsXG4gICAgICAgICcyNTYweDE2MDAnXG4gICAgXSxcbiAgICAvLyDluLjop4HnmoTop4bpopHlrr3pq5hcbiAgICBfdmlkZW9TaXplOiBbJzcyMHg0ODAnLCAnNzY4eDU3NicsICcxMjgweDcyMCcsICcxOTIweDEwODAnXSxcbiAgICAvKlxuICAgICAgICDnlJ/miJDkuIDkuKrpmo/mnLrnmoTlm77niYflnLDlnYDjgIJcblxuICAgICAgICDmm7/ku6Plm77niYfmupBcbiAgICAgICAgICAgIGh0dHA6Ly9mcG9pbWcuY29tL1xuICAgICAgICDlj4LogIPoh6ogXG4gICAgICAgICAgICBodHRwOi8vcmVuc2FubmluZy5pdGV5ZS5jb20vYmxvZy8xOTMzMzEwXG4gICAgICAgICAgICBodHRwOi8vY29kZS50dXRzcGx1cy5jb20vYXJ0aWNsZXMvdGhlLXRvcC04LXBsYWNlaG9sZGVycy1mb3Itd2ViLWRlc2lnbmVycy0tbmV0LTE5NDg1XG4gICAgKi9cbiAgICBpbWFnZTogZnVuY3Rpb24oc2l6ZSwgYmFja2dyb3VuZCwgZm9yZWdyb3VuZCwgZm9ybWF0LCB0ZXh0KSB7XG4gICAgICAgIC8vIFJhbmRvbS5pbWFnZSggc2l6ZSwgYmFja2dyb3VuZCwgZm9yZWdyb3VuZCwgdGV4dCApXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICB0ZXh0ID0gZm9ybWF0XG4gICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgICAvLyBSYW5kb20uaW1hZ2UoIHNpemUsIGJhY2tncm91bmQsIHRleHQgKVxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgdGV4dCA9IGZvcmVncm91bmRcbiAgICAgICAgICAgIGZvcmVncm91bmQgPSB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgICAvLyBSYW5kb20uaW1hZ2UoKVxuICAgICAgICBpZiAoIXNpemUpIHNpemUgPSB0aGlzLnBpY2sodGhpcy5fYWRTaXplKVxuXG4gICAgICAgIGlmIChiYWNrZ3JvdW5kICYmIH5iYWNrZ3JvdW5kLmluZGV4T2YoJyMnKSkgYmFja2dyb3VuZCA9IGJhY2tncm91bmQuc2xpY2UoMSlcbiAgICAgICAgaWYgKGZvcmVncm91bmQgJiYgfmZvcmVncm91bmQuaW5kZXhPZignIycpKSBmb3JlZ3JvdW5kID0gZm9yZWdyb3VuZC5zbGljZSgxKVxuXG4gICAgICAgIC8vIGh0dHA6Ly9kdW1teWltYWdlLmNvbS82MDB4NDAwL2NjMDBjYy80NzAwNDcucG5nJnRleHQ9aGVsbG9cbiAgICAgICAgcmV0dXJuICdodHRwOi8vZHVtbXlpbWFnZS5jb20vJyArIHNpemUgK1xuICAgICAgICAgICAgKGJhY2tncm91bmQgPyAnLycgKyBiYWNrZ3JvdW5kIDogJycpICtcbiAgICAgICAgICAgIChmb3JlZ3JvdW5kID8gJy8nICsgZm9yZWdyb3VuZCA6ICcnKSArXG4gICAgICAgICAgICAoZm9ybWF0ID8gJy4nICsgZm9ybWF0IDogJycpICtcbiAgICAgICAgICAgICh0ZXh0ID8gJyZ0ZXh0PScgKyB0ZXh0IDogJycpXG4gICAgfSxcbiAgICBpbWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIEJyYW5kQ29sb3JzXG4gICAgICAgIGh0dHA6Ly9icmFuZGNvbG9ycy5uZXQvXG4gICAgICAgIEEgY29sbGVjdGlvbiBvZiBtYWpvciBicmFuZCBjb2xvciBjb2RlcyBjdXJhdGVkIGJ5IEdhbGVuIEdpZG1hbi5cbiAgICAgICAg5aSn54mM5YWs5Y+455qE6aKc6Imy6ZuG5ZCIXG5cbiAgICAgICAgLy8g6I635Y+W5ZOB54mM5ZKM6aKc6ImyXG4gICAgICAgICQoJ2gyJykuZWFjaChmdW5jdGlvbihpbmRleCwgaXRlbSl7XG4gICAgICAgICAgICBpdGVtID0gJChpdGVtKVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1xcJycgKyBpdGVtLnRleHQoKSArICdcXCcnLCAnOicsICdcXCcnICsgaXRlbS5uZXh0KCkudGV4dCgpICsgJ1xcJycsICcsJylcbiAgICAgICAgfSlcbiAgICAqL1xuICAgIF9icmFuZENvbG9yczoge1xuICAgICAgICAnNG9ybWF0JzogJyNmYjBhMmEnLFxuICAgICAgICAnNTAwcHgnOiAnIzAyYWRlYScsXG4gICAgICAgICdBYm91dC5tZSAoYmx1ZSknOiAnIzAwNDA1ZCcsXG4gICAgICAgICdBYm91dC5tZSAoeWVsbG93KSc6ICcjZmZjYzMzJyxcbiAgICAgICAgJ0FkZHZvY2F0ZSc6ICcjZmY2MTM4JyxcbiAgICAgICAgJ0Fkb2JlJzogJyNmZjAwMDAnLFxuICAgICAgICAnQWltJzogJyNmY2QyMGInLFxuICAgICAgICAnQW1hem9uJzogJyNlNDc5MTEnLFxuICAgICAgICAnQW5kcm9pZCc6ICcjYTRjNjM5JyxcbiAgICAgICAgJ0FuZ2llXFwncyBMaXN0JzogJyM3ZmJiMDAnLFxuICAgICAgICAnQU9MJzogJyMwMDYwYTMnLFxuICAgICAgICAnQXRsYXNzaWFuJzogJyMwMDMzNjYnLFxuICAgICAgICAnQmVoYW5jZSc6ICcjMDUzZWZmJyxcbiAgICAgICAgJ0JpZyBDYXJ0ZWwnOiAnIzk3YjUzOCcsXG4gICAgICAgICdiaXRseSc6ICcjZWU2MTIzJyxcbiAgICAgICAgJ0Jsb2dnZXInOiAnI2ZjNGYwOCcsXG4gICAgICAgICdCb2VpbmcnOiAnIzAwMzlhNicsXG4gICAgICAgICdCb29raW5nLmNvbSc6ICcjMDAzNTgwJyxcbiAgICAgICAgJ0NhcmJvbm1hZGUnOiAnIzYxMzg1NCcsXG4gICAgICAgICdDaGVkZGFyJzogJyNmZjcyNDMnLFxuICAgICAgICAnQ29kZSBTY2hvb2wnOiAnIzNkNDk0NCcsXG4gICAgICAgICdEZWxpY2lvdXMnOiAnIzIwNWNjMCcsXG4gICAgICAgICdEZWxsJzogJyMzMjg3YzEnLFxuICAgICAgICAnRGVzaWdubW9vJzogJyNlNTRhNGYnLFxuICAgICAgICAnRGV2aWFudGFydCc6ICcjNGU2MjUyJyxcbiAgICAgICAgJ0Rlc2lnbmVyIE5ld3MnOiAnIzJkNzJkYScsXG4gICAgICAgICdEZXZvdXInOiAnI2ZkMDAwMScsXG4gICAgICAgICdERVdBTFQnOiAnI2ZlYmQxNycsXG4gICAgICAgICdEaXNxdXMgKGJsdWUpJzogJyM1OWEzZmMnLFxuICAgICAgICAnRGlzcXVzIChvcmFuZ2UpJzogJyNkYjcxMzInLFxuICAgICAgICAnRHJpYmJibGUnOiAnI2VhNGM4OScsXG4gICAgICAgICdEcm9wYm94JzogJyMzZDlhZTgnLFxuICAgICAgICAnRHJ1cGFsJzogJyMwYzc2YWInLFxuICAgICAgICAnRHVua2VkJzogJyMyYTMyM2EnLFxuICAgICAgICAnZUJheSc6ICcjODljNTA3JyxcbiAgICAgICAgJ0VtYmVyJzogJyNmMDVlMWInLFxuICAgICAgICAnRW5nYWRnZXQnOiAnIzAwYmRmNicsXG4gICAgICAgICdFbnZhdG8nOiAnIzUyODAzNicsXG4gICAgICAgICdFdHN5JzogJyNlYjZkMjAnLFxuICAgICAgICAnRXZlcm5vdGUnOiAnIzViYTUyNScsXG4gICAgICAgICdGYWIuY29tJzogJyNkZDAwMTcnLFxuICAgICAgICAnRmFjZWJvb2snOiAnIzNiNTk5OCcsXG4gICAgICAgICdGaXJlZm94JzogJyNlNjYwMDAnLFxuICAgICAgICAnRmxpY2tyIChibHVlKSc6ICcjMDA2M2RjJyxcbiAgICAgICAgJ0ZsaWNrciAocGluayknOiAnI2ZmMDA4NCcsXG4gICAgICAgICdGb3Jyc3QnOiAnIzViOWE2OCcsXG4gICAgICAgICdGb3Vyc3F1YXJlJzogJyMyNWEwY2EnLFxuICAgICAgICAnR2FybWluJzogJyMwMDdjYzMnLFxuICAgICAgICAnR2V0R2x1ZSc6ICcjMmQ3NWEyJyxcbiAgICAgICAgJ0dpbW1lYmFyJzogJyNmNzAwNzgnLFxuICAgICAgICAnR2l0SHViJzogJyMxNzE1MTUnLFxuICAgICAgICAnR29vZ2xlIEJsdWUnOiAnIzAxNDBjYScsXG4gICAgICAgICdHb29nbGUgR3JlZW4nOiAnIzE2YTYxZScsXG4gICAgICAgICdHb29nbGUgUmVkJzogJyNkZDE4MTInLFxuICAgICAgICAnR29vZ2xlIFllbGxvdyc6ICcjZmNjYTAzJyxcbiAgICAgICAgJ0dvb2dsZSsnOiAnI2RkNGIzOScsXG4gICAgICAgICdHcm9vdmVzaGFyayc6ICcjZjc3ZjAwJyxcbiAgICAgICAgJ0dyb3Vwb24nOiAnIzgyYjU0OCcsXG4gICAgICAgICdIYWNrZXIgTmV3cyc6ICcjZmY2NjAwJyxcbiAgICAgICAgJ0hlbGxvV2FsbGV0JzogJyMwMDg1Y2EnLFxuICAgICAgICAnSGVyb2t1IChsaWdodCknOiAnI2M3YzVlNicsXG4gICAgICAgICdIZXJva3UgKGRhcmspJzogJyM2NTY3YTUnLFxuICAgICAgICAnSG9vdFN1aXRlJzogJyMwMDMzNjYnLFxuICAgICAgICAnSG91enonOiAnIzczYmEzNycsXG4gICAgICAgICdIVE1MNSc6ICcjZWM2MjMxJyxcbiAgICAgICAgJ0lLRUEnOiAnI2ZmY2MzMycsXG4gICAgICAgICdJTURiJzogJyNmM2NlMTMnLFxuICAgICAgICAnSW5zdGFncmFtJzogJyMzZjcyOWInLFxuICAgICAgICAnSW50ZWwnOiAnIzAwNzFjNScsXG4gICAgICAgICdJbnR1aXQnOiAnIzM2NWViZicsXG4gICAgICAgICdLaWNrc3RhcnRlcic6ICcjNzZjYzFlJyxcbiAgICAgICAgJ2tpcHB0JzogJyNlMDM1MDAnLFxuICAgICAgICAnS29kZXJ5JzogJyMwMGFmODEnLFxuICAgICAgICAnTGFzdEZNJzogJyNjMzAwMGQnLFxuICAgICAgICAnTGlua2VkSW4nOiAnIzBlNzZhOCcsXG4gICAgICAgICdMaXZlc3RyZWFtJzogJyNjZjAwMDUnLFxuICAgICAgICAnTHVtbyc6ICcjNTc2Mzk2JyxcbiAgICAgICAgJ01peHBhbmVsJzogJyNhMDg2ZDMnLFxuICAgICAgICAnTWVldHVwJzogJyNlNTE5MzcnLFxuICAgICAgICAnTm9raWEnOiAnIzE4MzY5MycsXG4gICAgICAgICdOVklESUEnOiAnIzc2YjkwMCcsXG4gICAgICAgICdPcGVyYSc6ICcjY2MwZjE2JyxcbiAgICAgICAgJ1BhdGgnOiAnI2U0MWYxMScsXG4gICAgICAgICdQYXlQYWwgKGRhcmspJzogJyMxZTQ3N2EnLFxuICAgICAgICAnUGF5UGFsIChsaWdodCknOiAnIzNiN2JiZicsXG4gICAgICAgICdQaW5ib2FyZCc6ICcjMDAwMGU2JyxcbiAgICAgICAgJ1BpbnRlcmVzdCc6ICcjYzgyMzJjJyxcbiAgICAgICAgJ1BsYXlTdGF0aW9uJzogJyM2NjVjYmUnLFxuICAgICAgICAnUG9ja2V0JzogJyNlZTQwNTYnLFxuICAgICAgICAnUHJlemknOiAnIzMxOGJmZicsXG4gICAgICAgICdQdXNoYSc6ICcjMGY3MWI0JyxcbiAgICAgICAgJ1F1b3JhJzogJyNhODI0MDAnLFxuICAgICAgICAnUVVPVEUuZm0nOiAnIzY2Y2VmZicsXG4gICAgICAgICdSZGlvJzogJyMwMDhmZDUnLFxuICAgICAgICAnUmVhZGFiaWxpdHknOiAnIzljMDAwMCcsXG4gICAgICAgICdSZWQgSGF0JzogJyNjYzAwMDAnLFxuICAgICAgICAnUmVzb3VyY2UnOiAnIzdlYjQwMCcsXG4gICAgICAgICdSb2NrcGFjayc6ICcjMGJhNmFiJyxcbiAgICAgICAgJ1Jvb24nOiAnIzYyYjBkOScsXG4gICAgICAgICdSU1MnOiAnI2VlODAyZicsXG4gICAgICAgICdTYWxlc2ZvcmNlJzogJyMxNzk4YzEnLFxuICAgICAgICAnU2Ftc3VuZyc6ICcjMGM0ZGEyJyxcbiAgICAgICAgJ1Nob3BpZnknOiAnIzk2YmY0OCcsXG4gICAgICAgICdTa3lwZSc6ICcjMDBhZmYwJyxcbiAgICAgICAgJ1NuYWdham9iJzogJyNmNDdhMjAnLFxuICAgICAgICAnU29mdG9uaWMnOiAnIzAwOGFjZScsXG4gICAgICAgICdTb3VuZENsb3VkJzogJyNmZjc3MDAnLFxuICAgICAgICAnU3BhY2UgQm94JzogJyNmODY5NjAnLFxuICAgICAgICAnU3BvdGlmeSc6ICcjODFiNzFhJyxcbiAgICAgICAgJ1NwcmludCc6ICcjZmVlMTAwJyxcbiAgICAgICAgJ1NxdWFyZXNwYWNlJzogJyMxMjEyMTInLFxuICAgICAgICAnU3RhY2tPdmVyZmxvdyc6ICcjZWY4MjM2JyxcbiAgICAgICAgJ1N0YXBsZXMnOiAnI2NjMDAwMCcsXG4gICAgICAgICdTdGF0dXMgQ2hhcnQnOiAnI2Q3NTg0ZicsXG4gICAgICAgICdTdHJpcGUnOiAnIzAwOGNkZCcsXG4gICAgICAgICdTdHVkeUJsdWUnOiAnIzAwYWZlMScsXG4gICAgICAgICdTdHVtYmxlVXBvbic6ICcjZjc0NDI1JyxcbiAgICAgICAgJ1QtTW9iaWxlJzogJyNlYTBhOGUnLFxuICAgICAgICAnVGVjaG5vcmF0aSc6ICcjNDBhODAwJyxcbiAgICAgICAgJ1RoZSBOZXh0IFdlYic6ICcjZWY0NDIzJyxcbiAgICAgICAgJ1RyZWVob3VzZSc6ICcjNWNiODY4JyxcbiAgICAgICAgJ1RydWxpYSc6ICcjNWVhYjFmJyxcbiAgICAgICAgJ1R1bWJscic6ICcjMzQ1MjZmJyxcbiAgICAgICAgJ1R3aXRjaC50dic6ICcjNjQ0MWE1JyxcbiAgICAgICAgJ1R3aXR0ZXInOiAnIzAwYWNlZScsXG4gICAgICAgICdUWVBPMyc6ICcjZmY4NzAwJyxcbiAgICAgICAgJ1VidW50dSc6ICcjZGQ0ODE0JyxcbiAgICAgICAgJ1VzdHJlYW0nOiAnIzMzODhmZicsXG4gICAgICAgICdWZXJpem9uJzogJyNlZjFkMWQnLFxuICAgICAgICAnVmltZW8nOiAnIzg2YzllZicsXG4gICAgICAgICdWaW5lJzogJyMwMGE0NzgnLFxuICAgICAgICAnVmlyYic6ICcjMDZhZmQ4JyxcbiAgICAgICAgJ1ZpcmdpbiBNZWRpYSc6ICcjY2MwMDAwJyxcbiAgICAgICAgJ1dvb2dhJzogJyM1YjAwOWMnLFxuICAgICAgICAnV29yZFByZXNzIChibHVlKSc6ICcjMjE3NTliJyxcbiAgICAgICAgJ1dvcmRQcmVzcyAob3JhbmdlKSc6ICcjZDU0ZTIxJyxcbiAgICAgICAgJ1dvcmRQcmVzcyAoZ3JleSknOiAnIzQ2NDY0NicsXG4gICAgICAgICdXdW5kZXJsaXN0JzogJyMyYjg4ZDknLFxuICAgICAgICAnWEJPWCc6ICcjOWJjODQ4JyxcbiAgICAgICAgJ1hJTkcnOiAnIzEyNjU2NycsXG4gICAgICAgICdZYWhvbyEnOiAnIzcyMGU5ZScsXG4gICAgICAgICdZYW5kZXgnOiAnI2ZmY2MwMCcsXG4gICAgICAgICdZZWxwJzogJyNjNDEyMDAnLFxuICAgICAgICAnWW91VHViZSc6ICcjYzQzMDJiJyxcbiAgICAgICAgJ1phbG9uZ28nOiAnIzU0OThkYycsXG4gICAgICAgICdaZW5kZXNrJzogJyM3OGEzMDAnLFxuICAgICAgICAnWmVycGx5JzogJyM5ZGNjN2EnLFxuICAgICAgICAnWm9vdG9vbCc6ICcjNWU4YjFkJ1xuICAgIH0sXG4gICAgX2JyYW5kTmFtZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYnJhbmRzID0gW107XG4gICAgICAgIGZvciAodmFyIGIgaW4gdGhpcy5fYnJhbmRDb2xvcnMpIHtcbiAgICAgICAgICAgIGJyYW5kcy5wdXNoKGIpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJyYW5kc1xuICAgIH0sXG4gICAgLypcbiAgICAgICAg55Sf5oiQ5LiA5q616ZqP5py655qEIEJhc2U2NCDlm77niYfnvJbnoIHjgIJcblxuICAgICAgICBodHRwczovL2dpdGh1Yi5jb20vaW1za3kvaG9sZGVyXG4gICAgICAgIEhvbGRlciByZW5kZXJzIGltYWdlIHBsYWNlaG9sZGVycyBlbnRpcmVseSBvbiB0aGUgY2xpZW50IHNpZGUuXG5cbiAgICAgICAgZGF0YUltYWdlSG9sZGVyOiBmdW5jdGlvbihzaXplKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2hvbGRlci5qcy8nICsgc2l6ZVxuICAgICAgICB9LFxuICAgICovXG4gICAgZGF0YUltYWdlOiBmdW5jdGlvbihzaXplLCB0ZXh0KSB7XG4gICAgICAgIHZhciBjYW52YXNcbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL25vZGUtY2FudmFzXG4gICAgICAgICAgICAgICAgICAgIG5wbSBpbnN0YWxsIGNhbnZhcyAtLXNhdmVcbiAgICAgICAgICAgICAgICDlronoo4Xpl67popjvvJpcbiAgICAgICAgICAgICAgICAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjI5NTMyMDYvZ3VscC1pc3N1ZXMtd2l0aC1jYXJpby1pbnN0YWxsLWNvbW1hbmQtbm90LWZvdW5kLXdoZW4tdHJ5aW5nLXRvLWluc3RhbGxpbmctY2FudmFcbiAgICAgICAgICAgICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL25vZGUtY2FudmFzL2lzc3Vlcy80MTVcbiAgICAgICAgICAgICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL25vZGUtY2FudmFzL3dpa2kvX3BhZ2VzXG5cbiAgICAgICAgICAgICAgICBQU++8mm5vZGUtY2FudmFzIOeahOWuieijhei/h+eoi+WunuWcqOaYr+Wkque5geeQkOS6hu+8jOaJgOS7peS4jeaUvuWFpSBwYWNrYWdlLmpzb24g55qEIGRlcGVuZGVuY2llc+OAglxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YXIgQ2FudmFzID0gbW9kdWxlLnJlcXVpcmUoJ2NhbnZhcycpXG4gICAgICAgICAgICBjYW52YXMgPSBuZXcgQ2FudmFzKClcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjdHggPSBjYW52YXMgJiYgY2FudmFzLmdldENvbnRleHQgJiYgY2FudmFzLmdldENvbnRleHQoXCIyZFwiKVxuICAgICAgICBpZiAoIWNhbnZhcyB8fCAhY3R4KSByZXR1cm4gJydcblxuICAgICAgICBpZiAoIXNpemUpIHNpemUgPSB0aGlzLnBpY2sodGhpcy5fYWRTaXplKVxuICAgICAgICB0ZXh0ID0gdGV4dCAhPT0gdW5kZWZpbmVkID8gdGV4dCA6IHNpemVcblxuICAgICAgICBzaXplID0gc2l6ZS5zcGxpdCgneCcpXG5cbiAgICAgICAgdmFyIHdpZHRoID0gcGFyc2VJbnQoc2l6ZVswXSwgMTApLFxuICAgICAgICAgICAgaGVpZ2h0ID0gcGFyc2VJbnQoc2l6ZVsxXSwgMTApLFxuICAgICAgICAgICAgYmFja2dyb3VuZCA9IHRoaXMuX2JyYW5kQ29sb3JzW3RoaXMucGljayh0aGlzLl9icmFuZE5hbWVzKCkpXSxcbiAgICAgICAgICAgIGZvcmVncm91bmQgPSAnI0ZGRicsXG4gICAgICAgICAgICB0ZXh0X2hlaWdodCA9IDE0LFxuICAgICAgICAgICAgZm9udCA9ICdzYW5zLXNlcmlmJztcblxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aFxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0XG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJ1xuICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSdcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGJhY2tncm91bmRcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBmb3JlZ3JvdW5kXG4gICAgICAgIGN0eC5mb250ID0gJ2JvbGQgJyArIHRleHRfaGVpZ2h0ICsgJ3B4ICcgKyBmb250XG4gICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LCAod2lkdGggLyAyKSwgKGhlaWdodCAvIDIpLCB3aWR0aClcbiAgICAgICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpXG4gICAgfVxufSJdfQ==