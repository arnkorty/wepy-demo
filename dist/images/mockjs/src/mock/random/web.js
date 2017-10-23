'use strict';

/*
    ## Web
*/
module.exports = {
    /*
        随机生成一个 URL。
         [URL 规范](http://www.w3.org/Addressing/URL/url-spec.txt)
            http                    Hypertext Transfer Protocol 
            ftp                     File Transfer protocol 
            gopher                  The Gopher protocol 
            mailto                  Electronic mail address 
            mid                     Message identifiers for electronic mail 
            cid                     Content identifiers for MIME body part 
            news                    Usenet news 
            nntp                    Usenet news for local NNTP access only 
            prospero                Access using the prospero protocols 
            telnet rlogin tn3270    Reference to interactive sessions
            wais                    Wide Area Information Servers 
    */
    url: function url(protocol, host) {
        return (protocol || this.protocol()) + '://' + ( // protocol?
        host || this.domain()) + // host?
        '/' + this.word();
    },
    // 随机生成一个 URL 协议。
    protocol: function protocol() {
        return this.pick(
        // 协议簇
        'http ftp gopher mailto mid cid news nntp prospero telnet rlogin tn3270 wais'.split(' '));
    },
    // 随机生成一个域名。
    domain: function domain(tld) {
        return this.word() + '.' + (tld || this.tld());
    },
    /*
        随机生成一个顶级域名。
        国际顶级域名 international top-level domain-names, iTLDs
        国家顶级域名 national top-level domainnames, nTLDs
        [域名后缀大全](http://www.163ns.com/zixun/post/4417.html)
    */
    tld: function tld() {
        // Top Level Domain
        return this.pick((
        // 域名后缀
        'com net org edu gov int mil cn ' +
        // 国内域名
        'com.cn net.cn gov.cn org.cn ' +
        // 中文国内域名
        '中国 中国互联.公司 中国互联.网络 ' +
        // 新国际域名
        'tel biz cc tv info name hk mobi asia cd travel pro museum coop aero ' +
        // 世界各国域名后缀
        'ad ae af ag ai al am an ao aq ar as at au aw az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cf cg ch ci ck cl cm cn co cq cr cu cv cx cy cz de dj dk dm do dz ec ee eg eh es et ev fi fj fk fm fo fr ga gb gd ge gf gh gi gl gm gn gp gr gt gu gw gy hk hm hn hr ht hu id ie il in io iq ir is it jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md mg mh ml mm mn mo mp mq mr ms mt mv mw mx my mz na nc ne nf ng ni nl no np nr nt nu nz om qa pa pe pf pg ph pk pl pm pn pr pt pw py re ro ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr st su sy sz tc td tf tg th tj tk tm tn to tp tr tt tv tw tz ua ug uk us uy va vc ve vg vn vu wf ws ye yu za zm zr zw').split(' '));
    },
    // 随机生成一个邮件地址。
    email: function email(domain) {
        return this.character('lower') + '.' + this.word() + '@' + (domain || this.word() + '.' + this.tld());
        // return this.character('lower') + '.' + this.last().toLowerCase() + '@' + this.last().toLowerCase() + '.' + this.tld()
        // return this.word() + '@' + (domain || this.domain())
    },
    // 随机生成一个 IP 地址。
    ip: function ip() {
        return this.natural(0, 255) + '.' + this.natural(0, 255) + '.' + this.natural(0, 255) + '.' + this.natural(0, 255);
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwidXJsIiwicHJvdG9jb2wiLCJob3N0IiwiZG9tYWluIiwid29yZCIsInBpY2siLCJzcGxpdCIsInRsZCIsImVtYWlsIiwiY2hhcmFjdGVyIiwiaXAiLCJuYXR1cmFsIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7QUFHQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNiOzs7Ozs7Ozs7Ozs7Ozs7QUFnQkFDLFNBQUssYUFBU0MsUUFBVCxFQUFtQkMsSUFBbkIsRUFBeUI7QUFDMUIsZUFBTyxDQUFDRCxZQUFZLEtBQUtBLFFBQUwsRUFBYixJQUFnQyxLQUFoQyxLQUF3QztBQUMxQ0MsZ0JBQVEsS0FBS0MsTUFBTCxFQUROLElBQ3VCO0FBQzFCLFdBRkcsR0FFRyxLQUFLQyxJQUFMLEVBRlY7QUFHSCxLQXJCWTtBQXNCYjtBQUNBSCxjQUFVLG9CQUFXO0FBQ2pCLGVBQU8sS0FBS0ksSUFBTDtBQUNIO0FBQ0Esc0ZBQThFQyxLQUE5RSxDQUFvRixHQUFwRixDQUZHLENBQVA7QUFJSCxLQTVCWTtBQTZCYjtBQUNBSCxZQUFRLGdCQUFTSSxHQUFULEVBQWM7QUFDbEIsZUFBTyxLQUFLSCxJQUFMLEtBQWMsR0FBZCxJQUFxQkcsT0FBTyxLQUFLQSxHQUFMLEVBQTVCLENBQVA7QUFDSCxLQWhDWTtBQWlDYjs7Ozs7O0FBTUFBLFNBQUssZUFBVztBQUFFO0FBQ2QsZUFBTyxLQUFLRixJQUFMLENBQ0g7QUFDSTtBQUNBO0FBQ0E7QUFDQSxzQ0FGQTtBQUdBO0FBQ0EsNkJBSkE7QUFLQTtBQUNBLDhFQU5BO0FBT0E7QUFDQSxvc0JBVkosRUFXRUMsS0FYRixDQVdRLEdBWFIsQ0FERyxDQUFQO0FBY0gsS0F0RFk7QUF1RGI7QUFDQUUsV0FBTyxlQUFTTCxNQUFULEVBQWlCO0FBQ3BCLGVBQU8sS0FBS00sU0FBTCxDQUFlLE9BQWYsSUFBMEIsR0FBMUIsR0FBZ0MsS0FBS0wsSUFBTCxFQUFoQyxHQUE4QyxHQUE5QyxJQUVDRCxVQUNDLEtBQUtDLElBQUwsS0FBYyxHQUFkLEdBQW9CLEtBQUtHLEdBQUwsRUFIdEIsQ0FBUDtBQUtJO0FBQ0E7QUFDUCxLQWhFWTtBQWlFYjtBQUNBRyxRQUFJLGNBQVc7QUFDWCxlQUFPLEtBQUtDLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLElBQXVCLEdBQXZCLEdBQ0gsS0FBS0EsT0FBTCxDQUFhLENBQWIsRUFBZ0IsR0FBaEIsQ0FERyxHQUNvQixHQURwQixHQUVILEtBQUtBLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLENBRkcsR0FFb0IsR0FGcEIsR0FHSCxLQUFLQSxPQUFMLENBQWEsQ0FBYixFQUFnQixHQUFoQixDQUhKO0FBSUg7QUF2RVksQ0FBakIiLCJmaWxlIjoid2ViLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgICAjIyBXZWJcbiovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAvKlxuICAgICAgICDpmo/mnLrnlJ/miJDkuIDkuKogVVJM44CCXG5cbiAgICAgICAgW1VSTCDop4TojINdKGh0dHA6Ly93d3cudzMub3JnL0FkZHJlc3NpbmcvVVJML3VybC1zcGVjLnR4dClcbiAgICAgICAgICAgIGh0dHAgICAgICAgICAgICAgICAgICAgIEh5cGVydGV4dCBUcmFuc2ZlciBQcm90b2NvbCBcbiAgICAgICAgICAgIGZ0cCAgICAgICAgICAgICAgICAgICAgIEZpbGUgVHJhbnNmZXIgcHJvdG9jb2wgXG4gICAgICAgICAgICBnb3BoZXIgICAgICAgICAgICAgICAgICBUaGUgR29waGVyIHByb3RvY29sIFxuICAgICAgICAgICAgbWFpbHRvICAgICAgICAgICAgICAgICAgRWxlY3Ryb25pYyBtYWlsIGFkZHJlc3MgXG4gICAgICAgICAgICBtaWQgICAgICAgICAgICAgICAgICAgICBNZXNzYWdlIGlkZW50aWZpZXJzIGZvciBlbGVjdHJvbmljIG1haWwgXG4gICAgICAgICAgICBjaWQgICAgICAgICAgICAgICAgICAgICBDb250ZW50IGlkZW50aWZpZXJzIGZvciBNSU1FIGJvZHkgcGFydCBcbiAgICAgICAgICAgIG5ld3MgICAgICAgICAgICAgICAgICAgIFVzZW5ldCBuZXdzIFxuICAgICAgICAgICAgbm50cCAgICAgICAgICAgICAgICAgICAgVXNlbmV0IG5ld3MgZm9yIGxvY2FsIE5OVFAgYWNjZXNzIG9ubHkgXG4gICAgICAgICAgICBwcm9zcGVybyAgICAgICAgICAgICAgICBBY2Nlc3MgdXNpbmcgdGhlIHByb3NwZXJvIHByb3RvY29scyBcbiAgICAgICAgICAgIHRlbG5ldCBybG9naW4gdG4zMjcwICAgIFJlZmVyZW5jZSB0byBpbnRlcmFjdGl2ZSBzZXNzaW9uc1xuICAgICAgICAgICAgd2FpcyAgICAgICAgICAgICAgICAgICAgV2lkZSBBcmVhIEluZm9ybWF0aW9uIFNlcnZlcnMgXG4gICAgKi9cbiAgICB1cmw6IGZ1bmN0aW9uKHByb3RvY29sLCBob3N0KSB7XG4gICAgICAgIHJldHVybiAocHJvdG9jb2wgfHwgdGhpcy5wcm90b2NvbCgpKSArICc6Ly8nICsgLy8gcHJvdG9jb2w/XG4gICAgICAgICAgICAoaG9zdCB8fCB0aGlzLmRvbWFpbigpKSArIC8vIGhvc3Q/XG4gICAgICAgICAgICAnLycgKyB0aGlzLndvcmQoKVxuICAgIH0sXG4gICAgLy8g6ZqP5py655Sf5oiQ5LiA5LiqIFVSTCDljY/orq7jgIJcbiAgICBwcm90b2NvbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2soXG4gICAgICAgICAgICAvLyDljY/orq7nsIdcbiAgICAgICAgICAgICdodHRwIGZ0cCBnb3BoZXIgbWFpbHRvIG1pZCBjaWQgbmV3cyBubnRwIHByb3NwZXJvIHRlbG5ldCBybG9naW4gdG4zMjcwIHdhaXMnLnNwbGl0KCcgJylcbiAgICAgICAgKVxuICAgIH0sXG4gICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq5Z+f5ZCN44CCXG4gICAgZG9tYWluOiBmdW5jdGlvbih0bGQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud29yZCgpICsgJy4nICsgKHRsZCB8fCB0aGlzLnRsZCgpKVxuICAgIH0sXG4gICAgLypcbiAgICAgICAg6ZqP5py655Sf5oiQ5LiA5Liq6aG257qn5Z+f5ZCN44CCXG4gICAgICAgIOWbvemZhemhtue6p+Wfn+WQjSBpbnRlcm5hdGlvbmFsIHRvcC1sZXZlbCBkb21haW4tbmFtZXMsIGlUTERzXG4gICAgICAgIOWbveWutumhtue6p+Wfn+WQjSBuYXRpb25hbCB0b3AtbGV2ZWwgZG9tYWlubmFtZXMsIG5UTERzXG4gICAgICAgIFvln5/lkI3lkI7nvIDlpKflhahdKGh0dHA6Ly93d3cuMTYzbnMuY29tL3ppeHVuL3Bvc3QvNDQxNy5odG1sKVxuICAgICovXG4gICAgdGxkOiBmdW5jdGlvbigpIHsgLy8gVG9wIExldmVsIERvbWFpblxuICAgICAgICByZXR1cm4gdGhpcy5waWNrKFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgIC8vIOWfn+WQjeWQjue8gFxuICAgICAgICAgICAgICAgICdjb20gbmV0IG9yZyBlZHUgZ292IGludCBtaWwgY24gJyArXG4gICAgICAgICAgICAgICAgLy8g5Zu95YaF5Z+f5ZCNXG4gICAgICAgICAgICAgICAgJ2NvbS5jbiBuZXQuY24gZ292LmNuIG9yZy5jbiAnICtcbiAgICAgICAgICAgICAgICAvLyDkuK3mloflm73lhoXln5/lkI1cbiAgICAgICAgICAgICAgICAn5Lit5Zu9IOS4reWbveS6kuiBlC7lhazlj7gg5Lit5Zu95LqS6IGULue9kee7nCAnICtcbiAgICAgICAgICAgICAgICAvLyDmlrDlm73pmYXln5/lkI1cbiAgICAgICAgICAgICAgICAndGVsIGJpeiBjYyB0diBpbmZvIG5hbWUgaGsgbW9iaSBhc2lhIGNkIHRyYXZlbCBwcm8gbXVzZXVtIGNvb3AgYWVybyAnICtcbiAgICAgICAgICAgICAgICAvLyDkuJbnlYzlkITlm73ln5/lkI3lkI7nvIBcbiAgICAgICAgICAgICAgICAnYWQgYWUgYWYgYWcgYWkgYWwgYW0gYW4gYW8gYXEgYXIgYXMgYXQgYXUgYXcgYXogYmEgYmIgYmQgYmUgYmYgYmcgYmggYmkgYmogYm0gYm4gYm8gYnIgYnMgYnQgYnYgYncgYnkgYnogY2EgY2MgY2YgY2cgY2ggY2kgY2sgY2wgY20gY24gY28gY3EgY3IgY3UgY3YgY3ggY3kgY3ogZGUgZGogZGsgZG0gZG8gZHogZWMgZWUgZWcgZWggZXMgZXQgZXYgZmkgZmogZmsgZm0gZm8gZnIgZ2EgZ2IgZ2QgZ2UgZ2YgZ2ggZ2kgZ2wgZ20gZ24gZ3AgZ3IgZ3QgZ3UgZ3cgZ3kgaGsgaG0gaG4gaHIgaHQgaHUgaWQgaWUgaWwgaW4gaW8gaXEgaXIgaXMgaXQgam0gam8ganAga2Uga2cga2gga2kga20ga24ga3Aga3Iga3cga3kga3ogbGEgbGIgbGMgbGkgbGsgbHIgbHMgbHQgbHUgbHYgbHkgbWEgbWMgbWQgbWcgbWggbWwgbW0gbW4gbW8gbXAgbXEgbXIgbXMgbXQgbXYgbXcgbXggbXkgbXogbmEgbmMgbmUgbmYgbmcgbmkgbmwgbm8gbnAgbnIgbnQgbnUgbnogb20gcWEgcGEgcGUgcGYgcGcgcGggcGsgcGwgcG0gcG4gcHIgcHQgcHcgcHkgcmUgcm8gcnUgcncgc2Egc2Igc2Mgc2Qgc2Ugc2cgc2ggc2kgc2ogc2sgc2wgc20gc24gc28gc3Igc3Qgc3Ugc3kgc3ogdGMgdGQgdGYgdGcgdGggdGogdGsgdG0gdG4gdG8gdHAgdHIgdHQgdHYgdHcgdHogdWEgdWcgdWsgdXMgdXkgdmEgdmMgdmUgdmcgdm4gdnUgd2Ygd3MgeWUgeXUgemEgem0genIgencnXG4gICAgICAgICAgICApLnNwbGl0KCcgJylcbiAgICAgICAgKVxuICAgIH0sXG4gICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq6YKu5Lu25Zyw5Z2A44CCXG4gICAgZW1haWw6IGZ1bmN0aW9uKGRvbWFpbikge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFyYWN0ZXIoJ2xvd2VyJykgKyAnLicgKyB0aGlzLndvcmQoKSArICdAJyArXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgZG9tYWluIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMud29yZCgpICsgJy4nICsgdGhpcy50bGQoKSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC8vIHJldHVybiB0aGlzLmNoYXJhY3RlcignbG93ZXInKSArICcuJyArIHRoaXMubGFzdCgpLnRvTG93ZXJDYXNlKCkgKyAnQCcgKyB0aGlzLmxhc3QoKS50b0xvd2VyQ2FzZSgpICsgJy4nICsgdGhpcy50bGQoKVxuICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMud29yZCgpICsgJ0AnICsgKGRvbWFpbiB8fCB0aGlzLmRvbWFpbigpKVxuICAgIH0sXG4gICAgLy8g6ZqP5py655Sf5oiQ5LiA5LiqIElQIOWcsOWdgOOAglxuICAgIGlwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF0dXJhbCgwLCAyNTUpICsgJy4nICtcbiAgICAgICAgICAgIHRoaXMubmF0dXJhbCgwLCAyNTUpICsgJy4nICtcbiAgICAgICAgICAgIHRoaXMubmF0dXJhbCgwLCAyNTUpICsgJy4nICtcbiAgICAgICAgICAgIHRoaXMubmF0dXJhbCgwLCAyNTUpXG4gICAgfVxufSJdfQ==