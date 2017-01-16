'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Selection = require('d3-selection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Overlay = function (_React$Component) {
  _inherits(Overlay, _React$Component);

  function Overlay() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Overlay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Overlay)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onMouseMove = function (event) {
      var _mouse = (0, _d3Selection.mouse)(_this.rect);

      var _mouse2 = _slicedToArray(_mouse, 2);

      var x = _mouse2[0];
      var y = _mouse2[1];

      var x0 = _this.props.xScale.invert(x);
      var y0 = _this.props.yScale.invert(y);
      _this.props.onMouseMove({
        mouse: [x, y],
        data: [x0, y0]
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Overlay, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var width = _props.width;
      var height = _props.height;


      var style = {
        fill: 'none',
        pointerEvents: 'all'
      };

      return _react2.default.createElement('rect', {
        ref: function ref(c) {
          _this2.rect = c;
        },
        width: width,
        height: height,
        style: style,
        onMouseMove: function onMouseMove(event) {
          (0, _d3Selection.customEvent)(event.nativeEvent, _this2.onMouseMove);
        }
      });
    }
  }]);

  return Overlay;
}(_react2.default.Component);

exports.default = Overlay;