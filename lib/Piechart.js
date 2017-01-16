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

var Piechart = function (_React$Component) {
  _inherits(Piechart, _React$Component);

  function Piechart() {
    _classCallCheck(this, Piechart);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Piechart).apply(this, arguments));
  }

  _createClass(Piechart, [{
    key: 'render',
    value: function render() {
      // var radius = Math.min(this.props.width, this.props.height) / 2
      var _props = this.props;
      var width = _props.width;
      var height = _props.height;
      var innerRadius = _props.innerRadius;
      var outerRadius = _props.outerRadius;

      // construct new arc generator
      // https://github.com/mbostock/d3/wiki/SVG-Shapes#arc

      var arc = (0, _d3Shape.arc)().padRadius(outerRadius).innerRadius(innerRadius);

      // get values from Arc components
      var values = [];
      _react2.default.Children.forEach(this.props.children, function (c) {
        values.push(c.props.value);
      });

      // construct new pie function
      // return function
      // https://github.com/mbostock/d3/wiki/Pie-Layout#_pie
      var pie = (0, _d3Shape.pie)().padAngle(0.02).sort(null);

      // evaluate pie function on array of values
      // return array of arc descriptors
      var descriptors = pie(values);

      var children = _react2.default.Children.map(this.props.children, function (child, index) {
        return _react2.default.cloneElement(child, {
          descriptor: descriptors[index],
          arc: arc,
          outerRadius: outerRadius
        });
      });

      return _react2.default.createElement(
        'svg',
        { width: width, height: height },
        _react2.default.createElement(
          'g',
          { transform: 'translate(' + width / 2 + ',' + height / 2 + ')' },
          children
        )
      );
    }
  }]);

  return Piechart;
}(_react2.default.Component);

Piechart.propTypes = {
  width: _react2.default.PropTypes.number,
  height: _react2.default.PropTypes.number
};
Piechart.defaultProps = {
  width: 960,
  height: 500
};
exports.default = Piechart;