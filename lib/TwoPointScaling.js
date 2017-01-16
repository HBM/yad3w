'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d3Selection = require('d3-selection');

var _d3Scale = require('d3-scale');

var _d3Axis = require('d3-axis');

var _d3Shape = require('d3-shape');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
  width: 400,
  height: 400,
  margin: {
    top: 20,
    // add some space for x axis label
    right: 60,
    bottom: 20,
    left: 40
  },
  // axis tick size
  tickSize: 5,
  // number of x-axis ticks
  xTicks: 3,
  // number of y-axis ticks
  yTicks: 5,

  // on click event for crosshair lines
  clickX: function clickX() {},
  clickY: function clickY() {}
};

var TwoPointScaling = function () {
  function TwoPointScaling(config) {
    _classCallCheck(this, TwoPointScaling);

    Object.assign(this, defaults, config);
    this.init();
  }

  _createClass(TwoPointScaling, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var target = this.target;
      var width = this.width;
      var height = this.height;
      var margin = this.margin;
      var tickSize = this.tickSize;
      var xTicks = this.xTicks;
      var yTicks = this.yTicks;


      var w = width - margin.left - margin.right;
      var h = height - margin.top - margin.bottom;

      this.chart = (0, _d3Selection.select)(target).attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

      this.x = (0, _d3Scale.scaleLinear)().range([0, w]);

      this.y = (0, _d3Scale.scaleLinear)().range([h, 0]);

      this.xAxis = (0, _d3Axis.axisBottom)(this.x).ticks(xTicks).tickPadding(8).tickSize(tickSize);

      this.yAxis = (0, _d3Axis.axisLeft)(this.y).ticks(yTicks).tickPadding(8).tickSize(tickSize);

      this.chart.append('g').attr('class', 'TwoPointScaling x axis');

      this.chart.append('g').attr('class', 'TwoPointScaling y axis');

      this.line = (0, _d3Shape.line)().x(function (d) {
        return _this.x(d.x);
      }).y(function (d) {
        return _this.y(d.y);
      });

      this.chart.append('path').attr('class', 'TwoPointScaling line');

      // add x axis label
      this.chart.append('text').attr('text-anchor', 'start').attr('alignment-baseline', 'central').attr('class', 'label x').attr('x', w + 10).attr('y', this.y(0)).text('V');

      // add y axis label
      this.chart.append('text').attr('text-anchor', 'middle').attr('class', 'label y').attr('x', this.x(0)).attr('y', -10).text('rpm');
    }
  }, {
    key: 'renderAxis',
    value: function renderAxis(data) {
      var chart = this.chart;
      var xAxis = this.xAxis;
      var yAxis = this.yAxis;


      chart.select('.x.axis')
      // move axis to origin
      .attr('transform', 'translate(0, ' + this.y(0) + ')').call(xAxis);
      chart.select('.y.axis')
      // move axis right into origin
      .attr('transform', 'translate(' + this.x(0) + ', 0)').call(yAxis);

      // add x axis label
      this.chart.select('.label.x').attr('y', this.y(0));

      // add y axis label
      this.chart.select('.label.y').attr('x', this.x(0));
    }
  }, {
    key: 'renderLine',
    value: function renderLine(data) {
      var chart = this.chart;
      var line = this.line;

      chart.select('.line').transition().attr('d', line(data));
    }
  }, {
    key: 'renderDots',
    value: function renderDots(data) {
      var _this2 = this;

      var nodes = this.chart.selectAll('g.node').data(data);

      var nodesEnter = nodes.enter().append('g').attr('transform', function (d) {
        return 'translate(' + _this2.x(d.x) + ', ' + _this2.y(d.y) + ')';
      }).attr('class', 'node');

      nodesEnter.append('circle').attr('class', 'TwoPointScaling dot').attr('r', 5);

      nodesEnter.append('text').text(function (d, i) {
        return i === 0 ? 'P' : 'Q';
      }).attr('alignment-baseline', 'central').attr('text-anchor', 'middle').attr('dy', '-10px').attr('dx', '-10px');

      nodes.transition().attr('transform', function (d) {
        return 'translate(' + _this2.x(d.x) + ', ' + _this2.y(d.y) + ')';
      });
    }
  }, {
    key: 'renderHelperLines',
    value: function renderHelperLines(data) {
      var _this3 = this;

      // draw line from point to x and y axis
      var crosshairX = this.chart.selectAll('.crosshair.x').data(data);

      // render crosshair lines from x axis to line
      // render line on first call
      crosshairX.enter().append('line').attr('class', function (d, i) {
        return 'TwoPointScaling crosshair x x' + (i + 1);
      }).attr('x1', function (d) {
        return _this3.x(d.x);
      }).attr('y1', this.y(0)).attr('x2', function (d) {
        return _this3.x(d.x);
      }).attr('y2', function (d) {
        return _this3.y(d.y);
      });

      // update line on second call
      crosshairX.transition().attr('x1', function (d) {
        return _this3.x(d.x);
      }).attr('y1', this.y(0)).attr('x2', function (d) {
        return _this3.x(d.x);
      }).attr('y2', function (d) {
        return _this3.y(d.y);
      });

      var crosshairY = this.chart.selectAll('.crosshair.y').data(data);

      // render crosshair lines from y axis to line
      crosshairY.enter().append('line').attr('class', function (d, i) {
        return 'TwoPointScaling crosshair y y' + (i + 1);
      }).attr('x1', this.x(0)).attr('y1', function (d) {
        return _this3.y(d.y);
      }).attr('x2', function (d) {
        return _this3.x(d.x);
      }).attr('y2', function (d) {
        return _this3.y(d.y);
      });

      crosshairY.transition().attr('x1', this.x(0)).attr('y1', function (d) {
        return _this3.y(d.y);
      }).attr('x2', function (d) {
        return _this3.x(d.x);
      }).attr('y2', function (d) {
        return _this3.y(d.y);
      });
    }
  }, {
    key: 'renderHints',
    value: function renderHints(data) {
      var _this4 = this;

      var clickX = this.clickX;
      var clickY = this.clickY;
      // add rects

      var rectWidth = 24;
      var rectAxisPadding = 5;
      var rectYAxisPadding = 7;

      // x axis
      var hintX = this.chart.selectAll('.hint.x').data(data);

      var that = this;

      var group = hintX.enter().append('g').attr('class', function (d, i) {
        return 'TwoPointScaling hint x x' + (i + 1);
      }).attr('transform', function (d) {
        // flip hint above x axis when y value is negative
        if (d.y < 0) {
          return 'translate(' + (_this4.x(d.x) - rectWidth / 2) + ', ' + (_this4.y(0) - rectAxisPadding - rectWidth) + ')';
        }
        // show hint below x axis
        return 'translate(' + (_this4.x(d.x) - rectWidth / 2) + ', ' + (_this4.y(0) + rectAxisPadding) + ')';
      }).on('click', clickX).on('mouseover', function (d, i) {
        // select line
        that.chart.select('.TwoPointScaling.crosshair.x' + (i + 1)).classed('is-hovered', true);
        // select hint
        (0, _d3Selection.select)(this).classed('is-hovered', true);
      }).on('mouseout', function (d, i) {
        that.chart.select('.TwoPointScaling.crosshair.x' + (i + 1)).classed('is-hovered', false);
        (0, _d3Selection.select)(this).classed('is-hovered', false);
      });

      group.append('rect').attr('rx', 2).attr('width', rectWidth).attr('height', rectWidth);

      group.append('text').attr('text-anchor', 'middle').attr('alignment-baseline', 'middle').attr('x', rectWidth / 2).attr('y', rectWidth / 2).text(function (d) {
        return d.x;
      });

      // transition
      var transitionSelection = hintX.transition().attr('transform', function (d) {
        // flip hint above x axis when y value is negative
        if (d.y < 0) {
          return 'translate(' + (_this4.x(d.x) - rectWidth / 2) + ', ' + (_this4.y(0) - rectAxisPadding - rectWidth) + ')';
        }
        // show hint below x axis
        return 'translate(' + (_this4.x(d.x) - rectWidth / 2) + ', ' + (_this4.y(0) + rectAxisPadding) + ')';
      });

      transitionSelection.select('text').text(function (d) {
        return d.x;
      });

      // y axis
      var hintY = this.chart.selectAll('.hint.y').data(data);

      var groupY = hintY.enter().append('g').attr('class', function (d, i) {
        return 'TwoPointScaling hint y y' + (i + 1);
      }).attr('transform', function (d) {
        // flip hint to the right of y axis when x value is negative
        if (d.x < 0) {
          return 'translate(' + (_this4.x(0) + rectYAxisPadding) + ', ' + (_this4.y(d.y) - rectWidth / 2) + ')';
        }
        // show hint left of y axis
        return 'translate(' + (_this4.x(0) - rectWidth - rectYAxisPadding) + ', ' + (_this4.y(d.y) - rectWidth / 2) + ')';
      }).on('click', clickY).on('mouseover', function (d, i) {
        // select line
        that.chart.select('.TwoPointScaling.crosshair.y' + (i + 1)).classed('is-hovered', true);
        (0, _d3Selection.select)(this).classed('is-hovered', true);
      }).on('mouseout', function (d, i) {
        that.chart.select('.TwoPointScaling.crosshair.y' + (i + 1)).classed('is-hovered', false);
        (0, _d3Selection.select)(this).classed('is-hovered', false);
      });

      groupY.append('rect').attr('rx', 2).attr('width', rectWidth).attr('height', rectWidth);

      groupY.append('text').attr('text-anchor', 'middle').attr('alignment-baseline', 'middle').attr('x', rectWidth / 2).attr('y', rectWidth / 2).text(function (d) {
        return d.y;
      });

      // transition
      var transitionSelectionY = hintY.transition().attr('transform', function (d) {
        // flip hint to the right of y axis when x value is negative
        if (d.x < 0) {
          return 'translate(' + (_this4.x(0) + rectYAxisPadding) + ', ' + (_this4.y(d.y) - rectWidth / 2) + ')';
        }
        // show hint left of y axis
        return 'translate(' + (_this4.x(0) - rectWidth - rectYAxisPadding) + ', ' + (_this4.y(d.y) - rectWidth / 2) + ')';
      });

      transitionSelectionY.select('text').text(function (d) {
        return d.y;
      });
    }
  }, {
    key: 'render',
    value: function render(data) {
      // take incoming data with two points (x1, y1) and (x2, y2)
      var x1 = data[0].x;
      var y1 = data[0].y;
      var x2 = data[1].x;
      var y2 = data[1].y;
      // y = m * x + n
      // http://keisan.casio.com/exec/system/1223508685
      var m = (y2 - y1) / (x2 - x1);
      var n = (x2 * y1 - x1 * y2) / (x2 - x1);

      // get point further left / more negative
      var left = x1 < x2 ? x1 : x2;
      // make sure axis are always visible
      left = left < 0 ? left : -(left / 100 * 50);
      // get point further right / more positive
      var right = x1 > x2 ? x1 : x2;
      right = right > 0 ? right : right / 100 * 50;
      // get point further up / more positive
      var up = y1 > y2 ? y1 : y2;
      up = up > 0 ? up : up / 100 * 50;
      // get point further down / more negative
      var down = y1 < y2 ? y1 : y2;
      down = down < 0 ? down : -(down / 100 * 50);

      var leftWithPadding = left - Math.abs(left) / 100 * 10;
      var rightWithPadding = right + Math.abs(right) / 100 * 10;
      var upWithPadding = up + Math.abs(up) / 100 * 10;
      var downWithPadding = down - Math.abs(down) / 100 * 10;

      // update domains
      // create extra space at both ends
      this.x.domain([leftWithPadding, rightWithPadding]);
      this.y.domain([downWithPadding, upWithPadding]);

      var lineData = [{ x: leftWithPadding, y: m * leftWithPadding + n }, { x: rightWithPadding, y: m * rightWithPadding + n }];
      this.renderAxis(data);
      this.renderLine(lineData);
      this.renderHelperLines(data);
      this.renderDots(data);
      this.renderHints(data);
    }
  }, {
    key: 'focus',
    value: function focus(point) {
      this.chart.select('.TwoPointScaling.crosshair.' + point).classed('is-focused', true);
      this.chart.select('.TwoPointScaling.hint.' + point).classed('is-focused', true);
    }
  }, {
    key: 'blur',
    value: function blur(point) {
      this.chart.select('.TwoPointScaling.crosshair.' + point).classed('is-focused', false);
      this.chart.select('.TwoPointScaling.hint.' + point).classed('is-focused', false);
    }
  }]);

  return TwoPointScaling;
}();

exports.default = TwoPointScaling;