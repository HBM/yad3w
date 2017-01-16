'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d3Scale = require('d3-scale');

var _d3Shape = require('d3-shape');

var _d3Array = require('d3-array');

var _retinafy = require('./retinafy');

var _retinafy2 = _interopRequireDefault(_retinafy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {

  lineWidth: 1,

  strokeStyle: 'steelblue',

  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

};

var Sparkline = function () {
  function Sparkline(config) {
    var _this = this;

    _classCallCheck(this, Sparkline);

    Object.assign(this, defaults, config);

    this.context = this.canvas.getContext('2d');

    var width = this.canvas.width - this.margin.left - this.margin.right;
    var height = this.canvas.height - this.margin.top - this.margin.bottom;

    // make canvas look nice on retina displays
    this.canvas = (0, _retinafy2.default)(this.canvas);

    this.x = (0, _d3Scale.scaleLinear)().range([0, width]);

    this.y = (0, _d3Scale.scaleLinear)().range([height, 0]);

    this.line = (0, _d3Shape.line)().x(function (d, i) {
      return _this.x(i);
    }).y(function (d) {
      return _this.y(d);
    }).curve(_d3Shape.curveBasis).context(this.context);

    this.context.translate(this.margin.left, this.margin.top);
  }

  _createClass(Sparkline, [{
    key: 'render',
    value: function render(data) {
      var x = this.x;
      var y = this.y;
      var canvas = this.canvas;
      var context = this.context;
      var line = this.line;


      x.domain([0, data.length - 1]);
      y.domain((0, _d3Array.extent)(data));

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      line(data);
      context.lineWidth = this.lineWidth;
      context.strokeStyle = this.strokeStyle;
      context.stroke();
    }
  }]);

  return Sparkline;
}();

exports.default = Sparkline;