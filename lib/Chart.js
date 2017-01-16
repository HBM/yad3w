'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Scale = require('d3-scale');

var _d3Array = require('d3-array');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chart = function (_React$Component) {
  _inherits(Chart, _React$Component);

  function Chart() {
    _classCallCheck(this, Chart);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Chart).apply(this, arguments));
  }

  _createClass(Chart, [{
    key: 'render',
    value: function render() {
      // get highest value from all data arrays
      var currentMax = 0;
      _react2.default.Children.forEach(this.props.children, function (child) {
        var m = (0, _d3Array.max)(child.props.data || []);
        if (m > currentMax) {
          currentMax = m;
        }
      });

      var margin = this.props.margin;
      var width = this.props.width - margin.left - margin.right;
      var height = this.props.height - margin.top - margin.bottom;
      var data = this.props.data;

      // x scale
      var xScale = (0, _d3Scale.scaleLinear)().domain([0, data.length - 1]).range([0, width]);

      // y scale
      var yScale = (0, _d3Scale.scaleLinear)().domain([0, currentMax]).range([height, 0]);

      var children = _react2.default.Children.map(this.props.children, function (child) {
        return _react2.default.cloneElement(child, {
          width: width,
          height: height,
          margin: margin,
          data: child.props.data || data,
          xScale: xScale,
          yScale: yScale
        });
      });

      return _react2.default.createElement(
        'svg',
        {
          width: this.props.width,
          height: this.props.height
        },
        _react2.default.createElement(
          'g',
          { transform: 'translate(' + margin.left + ', ' + margin.top + ')' },
          children
        )
      );
    }
  }]);

  return Chart;
}(_react2.default.Component);

Chart.propTypes = {
  width: _react2.default.PropTypes.number,
  height: _react2.default.PropTypes.number,
  margin: _react2.default.PropTypes.object
};
Chart.defaultProps = {
  width: 960,
  height: 500,
  margin: {
    top: 20,
    right: 10,
    bottom: 20,
    left: 10
  }
};
exports.default = Chart;