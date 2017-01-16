'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d3Selection = require('d3-selection');

var _d3Scale = require('d3-scale');

var _d3Array = require('d3-array');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {

  target: '#chart',

  width: 500,

  height: 170,

  margin: {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  }

};

var Barchart = function () {
  function Barchart(config) {
    _classCallCheck(this, Barchart);

    Object.assign(this, defaults, config);

    var target = this.target;
    var width = this.width;
    var height = this.height;
    var margin = this.margin;

    var w = width - margin.left - margin.right;
    var h = height - margin.top - margin.bottom;

    this.x = (0, _d3Scale.scaleBand)().rangeRound([0, w]).padding(0.1);

    this.y = (0, _d3Scale.scaleLinear)().rangeRound([h, 0]);

    this.chart = (0, _d3Selection.select)(target).attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
  }

  _createClass(Barchart, [{
    key: 'render',
    value: function render(data) {
      var x = this.x;
      var y = this.y;
      var height = this.height;
      var chart = this.chart;


      x.domain(data.map(function (d, i) {
        return i;
      }));
      y.domain([0, (0, _d3Array.max)(data)]);

      chart.selectAll('.bar').data(data).enter().append('rect').attr('class', 'bar').attr('x', function (d, i) {
        return x(i);
      }).attr('y', function (d) {
        return y(d);
      }).attr('width', x.bandwidth()).attr('height', function (d) {
        return height - y(d);
      });
    }
  }]);

  return Barchart;
}();

exports.default = Barchart;