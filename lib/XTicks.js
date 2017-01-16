'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  line: {
    shapeRendering: 'crispEdges',
    stroke: '#000',
    fill: 'none',
    strokeWidth: '1'
  },
  text: {
    textAnchor: 'middle'
  }
};

var XTicks = function (_React$Component) {
  _inherits(XTicks, _React$Component);

  function XTicks() {
    _classCallCheck(this, XTicks);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(XTicks).apply(this, arguments));
  }

  _createClass(XTicks, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var xScale = _props.xScale;
      var innerTickSize = _props.innerTickSize;
      var tickPadding = _props.tickPadding;

      var tickSpacing = Math.max(innerTickSize, 0) + tickPadding;

      var ticks = this.props.data.map(function (d, i) {
        return _react2.default.createElement(
          'g',
          { key: i, transform: 'translate(' + xScale(i) + ',0)' },
          _react2.default.createElement('line', { y2: innerTickSize, x2: '0', style: styles.line }),
          _react2.default.createElement(
            'text',
            { dy: '.71em', y: tickSpacing, x: '0', style: styles.text },
            i
          )
        );
      });

      return _react2.default.createElement(
        'g',
        null,
        ticks
      );
    }
  }]);

  return XTicks;
}(_react2.default.Component);

XTicks.propTypes = {
  data: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object]),
  xScale: _react2.default.PropTypes.func,
  innerTickSize: _react2.default.PropTypes.number,
  tickPadding: _react2.default.PropTypes.number
};
XTicks.defaultProps = {
  innerTickSize: 6,
  tickPadding: 3
};
exports.default = XTicks;