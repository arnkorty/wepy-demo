"use strict";

/*
    ## Constant

    常量集合。
 */
/*
    RE_KEY
        'name|min-max': value
        'name|count': value
        'name|min-max.dmin-dmax': value
        'name|min-max.dcount': value
        'name|count.dmin-dmax': value
        'name|count.dcount': value
        'name|+step': value

        1 name, 2 step, 3 range [ min, max ], 4 drange [ dmin, dmax ]

    RE_PLACEHOLDER
        placeholder(*)

    [正则查看工具](http://www.regexper.com/)

    #26 生成规则 支持 负数，例如 number|-100-100
*/
module.exports = {
    GUID: 1,
    RE_KEY: /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/,
    RE_RANGE: /([\+\-]?\d+)-?([\+\-]?\d+)?/,
    RE_PLACEHOLDER: /\\*@([^@#%&()\?\s]+)(?:\((.*?)\))?/g
    // /\\*@([^@#%&()\?\s\/\.]+)(?:\((.*?)\))?/g
    // RE_INDEX: /^index$/,
    // RE_KEY: /^key$/
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN0YW50LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJHVUlEIiwiUkVfS0VZIiwiUkVfUkFOR0UiLCJSRV9QTEFDRUhPTERFUiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNiQyxVQUFNLENBRE87QUFFYkMsWUFBUSw4REFGSztBQUdiQyxjQUFVLDZCQUhHO0FBSWJDLG9CQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFQYSxDQUFqQiIsImZpbGUiOiJjb25zdGFudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gICAgIyMgQ29uc3RhbnRcblxuICAgIOW4uOmHj+mbhuWQiOOAglxuICovXG4vKlxuICAgIFJFX0tFWVxuICAgICAgICAnbmFtZXxtaW4tbWF4JzogdmFsdWVcbiAgICAgICAgJ25hbWV8Y291bnQnOiB2YWx1ZVxuICAgICAgICAnbmFtZXxtaW4tbWF4LmRtaW4tZG1heCc6IHZhbHVlXG4gICAgICAgICduYW1lfG1pbi1tYXguZGNvdW50JzogdmFsdWVcbiAgICAgICAgJ25hbWV8Y291bnQuZG1pbi1kbWF4JzogdmFsdWVcbiAgICAgICAgJ25hbWV8Y291bnQuZGNvdW50JzogdmFsdWVcbiAgICAgICAgJ25hbWV8K3N0ZXAnOiB2YWx1ZVxuXG4gICAgICAgIDEgbmFtZSwgMiBzdGVwLCAzIHJhbmdlIFsgbWluLCBtYXggXSwgNCBkcmFuZ2UgWyBkbWluLCBkbWF4IF1cblxuICAgIFJFX1BMQUNFSE9MREVSXG4gICAgICAgIHBsYWNlaG9sZGVyKCopXG5cbiAgICBb5q2j5YiZ5p+l55yL5bel5YW3XShodHRwOi8vd3d3LnJlZ2V4cGVyLmNvbS8pXG5cbiAgICAjMjYg55Sf5oiQ6KeE5YiZIOaUr+aMgSDotJ/mlbDvvIzkvovlpoIgbnVtYmVyfC0xMDAtMTAwXG4qL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgR1VJRDogMSxcbiAgICBSRV9LRVk6IC8oLispXFx8KD86XFwrKFxcZCspfChbXFwrXFwtXT9cXGQrLT9bXFwrXFwtXT9cXGQqKT8oPzpcXC4oXFxkKy0/XFxkKikpPykvLFxuICAgIFJFX1JBTkdFOiAvKFtcXCtcXC1dP1xcZCspLT8oW1xcK1xcLV0/XFxkKyk/LyxcbiAgICBSRV9QTEFDRUhPTERFUjogL1xcXFwqQChbXkAjJSYoKVxcP1xcc10rKSg/OlxcKCguKj8pXFwpKT8vZ1xuICAgIC8vIC9cXFxcKkAoW15AIyUmKClcXD9cXHNcXC9cXC5dKykoPzpcXCgoLio/KVxcKSk/L2dcbiAgICAvLyBSRV9JTkRFWDogL15pbmRleCQvLFxuICAgIC8vIFJFX0tFWTogL15rZXkkL1xufSJdfQ==