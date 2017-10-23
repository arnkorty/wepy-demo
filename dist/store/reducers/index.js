'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('./../../npm/redux/lib/index.js');

var _counter = require('./counter.js');

var _counter2 = _interopRequireDefault(_counter);

var _records = require('./records.js');

var _records2 = _interopRequireDefault(_records);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  counter: _counter2.default,
  records: _records2.default
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNvdW50ZXIiLCJyZWNvcmRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWUsNEJBQWdCO0FBQzdCQSw0QkFENkI7QUFFN0JDO0FBRjZCLENBQWhCLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCdcclxuaW1wb3J0IGNvdW50ZXIgZnJvbSAnLi9jb3VudGVyJ1xyXG5pbXBvcnQgcmVjb3JkcyBmcm9tICcuL3JlY29yZHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21iaW5lUmVkdWNlcnMoe1xyXG4gIGNvdW50ZXIsXHJcbiAgcmVjb3Jkc1xyXG59KVxyXG4iXX0=