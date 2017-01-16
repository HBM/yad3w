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
  d: {
    shapeRendering: 'crispEdges',
    stroke: '#000',
    fill: 'none',
    strokeWidth: '1'
  }
};

var XAxis = function (_React$Component) {
  _inherits(XAxis, _React$Component);

  function XAxis() {
    _classCallCheck(this, XAxis);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(XAxis).apply(this, arguments));
  }

  _createClass(XAxis, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var data = _props.data;
      var width = _props.width;
      var height = _props.height;
      var outerTickSize = _props.outerTickSize;
      var xScale = _props.xScale;


      var children = _react2.default.Children.map(this.props.children, function (child) {
        return _react2.default.cloneElement(child, { data: data, xScale: xScale });
      });

      return _react2.default.createElement(
        'g',
        { transform: 'translate(0, ' + height + ')' },
        children,
        _react2.default.createElement('path', {
          d: 'M0,' + outerTickSize + 'V0H' + width + 'V' + outerTickSize,
          style: styles.d
        })
      );
    }
  }]);

  return XAxis;
}(_react2.default.Component);

XAxis.propTypes = {
  width: _react2.default.PropTypes.number,
  height: _react2.default.PropTypes.number,
  outerTickSize: _react2.default.PropTypes.number
};
XAxis.defaultProps = {
  outerTickSize: 6
};
exports.default = XAxis;