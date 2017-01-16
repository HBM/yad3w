'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Shape = require('d3-shape');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Area = function (_React$Component) {
  _inherits(Area, _React$Component);

  function Area() {
    _classCallCheck(this, Area);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Area).apply(this, arguments));
  }

  _createClass(Area, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = {
        fill: 'steelblue',
        opacity: 0.25
      };

      var area = (0, _d3Shape.area)().x(function (d, i) {
        return _this2.props.xScale(i);
      }).y0(this.props.height).y1(function (d) {
        return _this2.props.yScale(d);
      });

      return _react2.default.createElement('path', {
        style: style,
        d: area(this.props.data)
      });
    }
  }]);

  return Area;
}(_react2.default.Component);

exports.default = Area;