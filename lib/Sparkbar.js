'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d3Scale = require('d3-scale');

var _d3Array = require('d3-array');

var _retinafy = require('./retinafy');

var _retinafy2 = _interopRequireDefault(_retinafy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {

  padding: 0.1,

  fillStyle: 'steelblue',

  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

};

var Sparkbar = function () {
  function Sparkbar(config) {
    _classCallCheck(this, Sparkbar);

    Object.assign(this, defaults, config);

    // get width and height for d3 before applying retina fix
    this.width = this.canvas.width - this.margin.left - this.margin.right;
    this.height = this.canvas.height - this.margin.top - this.margin.bottom;

    // make canvas look nice on retina displays
    this.canvas = (0, _retinafy2.default)(this.canvas);

    this.x = (0, _d3Scale.scaleBand)().rangeRound([0, this.width]).padding(this.padding);

    this.y = (0, _d3Scale.scaleLinear)().rangeRound([this.height, 0]);

    this.context = this.canvas.getContext('2d');
    this.context.translate(this.margin.left, this.margin.top);
  }

  _createClass(Sparkbar, [{
    key: 'render',
    value: function render(data) {
      var x = this.x;
      var y = this.y;
      var height = this.height;
      var canvas = this.canvas;
      var context = this.context;
      var fillStyle = this.fillStyle;

      x.domain(data.map(function (d, i) {
        return i;
      }));
      y.domain([0, (0, _d3Array.max)(data)]);

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = fillStyle;
      data.forEach(function (d, i) {
        context.fillRect(x(i), y(d), x.bandwidth(), height - y(d));
      });
    }
  }]);

  return Sparkbar;
}();

exports.default = Sparkbar;