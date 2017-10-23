'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncInc = undefined;

var _counter = require('./../types/counter.js');

var _reduxActions = require('./../../npm/redux-actions/lib/index.js');

var asyncInc = exports.asyncInc = (0, _reduxActions.createAction)(_counter.ASYNC_INCREMENT, function () {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(1);
    }, 1000);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdW50ZXIuanMiXSwibmFtZXMiOlsiYXN5bmNJbmMiLCJQcm9taXNlIiwic2V0VGltZW91dCIsInJlc29sdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFTyxJQUFNQSw4QkFBVywwREFBOEIsWUFBTTtBQUMxRCxTQUFPLElBQUlDLE9BQUosQ0FBWSxtQkFBVztBQUM1QkMsZUFBVyxZQUFNO0FBQ2ZDLGNBQVEsQ0FBUjtBQUNELEtBRkQsRUFFRyxJQUZIO0FBR0QsR0FKTSxDQUFQO0FBS0QsQ0FOdUIsQ0FBakIiLCJmaWxlIjoiY291bnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTWU5DX0lOQ1JFTUVOVCB9IGZyb20gJy4uL3R5cGVzL2NvdW50ZXInXHJcbmltcG9ydCB7IGNyZWF0ZUFjdGlvbiB9IGZyb20gJ3JlZHV4LWFjdGlvbnMnXHJcblxyXG5leHBvcnQgY29uc3QgYXN5bmNJbmMgPSBjcmVhdGVBY3Rpb24oQVNZTkNfSU5DUkVNRU5ULCAoKSA9PiB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHJlc29sdmUoMSlcclxuICAgIH0sIDEwMDApXHJcbiAgfSlcclxufSlcclxuIl19