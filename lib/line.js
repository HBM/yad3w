'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d3Selection = require('d3-selection');

var _d3Scale = require('d3-scale');

var _d3Axis = require('d3-axis');

var _d3Shape = require('d3-shape');

var _d3Transition = require('d3-transition');

var _d3Array = require('d3-array');

var _d3Ease = require('d3-ease');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Default config.
 */
var defaults = {

  // target element or selector to contain the svg
  target: '#chart',

  // width of chart
  width: 500,

  // height of chart
  height: 170,

  // margins
  margin: {
    top: 15,
    right: 20,
    bottom: 35,
    left: 60
  },

  // number of x-axis ticks
  xTicks: 5,

  // number of y-axis ticks
  yTicks: 3,

  // line interpolation
  curve: _d3Shape.curveLinear
};

/**
 * LineChart component.
 */

var LineChart = function () {

  /**
   * Construct with given `config`.
   */
  function LineChart(config) {
    _classCallCheck(this, LineChart);

    Object.assign(this, defaults, config);
    this.init();
  }

  /**
   * Initialize the chart.
   */


  _createClass(LineChart, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var target = this.target;
      var width = this.width;
      var height = this.height;
      var margin = this.margin;
      var curve = this.curve;
      var xTicks = this.xTicks;
      var yTicks = this.yTicks;

      var w = width - margin.left - margin.right;
      var h = height - margin.top - margin.bottom;

      this.chart = (0, _d3Selection.select)(target).attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

      this.chart.append('defs').append('clipPath').attr('id', 'clip').append('rect').attr('width', w).attr('height', h);

      this.x = (0, _d3Scale.scaleLinear)().range([0, w]);

      this.y = (0, _d3Scale.scaleLinear)().range([h, 0]);

      this.xAxis = (0, _d3Axis.axisBottom)(this.x).ticks(xTicks);

      this.yAxis = (0, _d3Axis.axisLeft)(this.y).ticks(yTicks);

      this.chart.append('g').attr('class', 'x axis').attr('transform', 'translate(0, ' + this.y(0) + ')').call(this.xAxis);

      this.chart.append('g').attr('class', 'y axis').call(this.yAxis);

      this.line = (0, _d3Shape.line)().x(function (d, i) {
        return _this.x(i);
      }).y(function (d) {
        return _this.y(d);
      }).curve(curve);

      this.chart.append('g').attr('clip-path', 'url(#clip)').append('path').attr('class', 'line');
    }
  }, {
    key: 'render',
    value: function render(data) {
      var x = this.x;
      var y = this.y;
      var xAxis = this.xAxis;
      var yAxis = this.yAxis;


      x.domain([0, data.length - 2]);
      y.domain([0, (0, _d3Array.max)(data)]);

      (0, _d3Selection.select)('.x.axis').call(xAxis);

      (0, _d3Selection.select)('.y.axis').call(yAxis);

      var t = (0, _d3Transition.transition)().ease(_d3Ease.easeLinear).duration(250);

      var that = this;

      (0, _d3Selection.select)('.line').datum(data).transition(t).on('start', function () {
        // redraw line
        (0, _d3Selection.select)(this).attr('d', that.line).attr('transform', null);

        // https://github.com/d3/d3-transition#active
        // returns the active transition on the specified node
        // slide to the left
        (0, _d3Transition.active)(this).attr('transform', 'translate(' + that.x(-1) + ', 0)').transition(t);
      });
    }
  }]);

  return LineChart;
}();

exports.default = LineChart;