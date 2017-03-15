
import {select} from 'd3-selection'
import {scaleLinear} from 'd3-scale'
import {axisBottom, axisLeft} from 'd3-axis'
import {line} from 'd3-shape'

const defaults = {
  width: 640,
  height: 400,
  margin: {
    top: 20,
    right: 60,
    bottom: 20,
    left: 40
  },
  // number of x-axis ticks
  xTicks: 3,
  // number of y-axis ticks
  yTicks: 5
}

export default class LimitSwitch {
  constructor (config) {
    Object.assign(this, defaults, config)
    this.init()
  }

  init () {
    const {target, width, height, margin} = this
    const {xTicks, yTicks} = this

    this.w = width - margin.left - margin.right
    const h = (3 / 4) * height - margin.top - margin.bottom

    this.chart = select(target)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this.x = scaleLinear()
      .range([0, this.w])

    this.y = scaleLinear()
      .domain([0, 10])
      .range([h, 0])

    this.xAxis = axisBottom(this.x)
      .ticks(xTicks)

    this.yAxis = axisLeft(this.y)
      .ticks(yTicks)

    this.chart.append('g')
      .attr('class', 'LimitSwitch x axis')
      .attr('transform', `translate(0, ${this.y(0)})`)
      .call(this.xAxis)

    this.chart.append('g')
      .attr('class', 'LimitSwitch y axis')
      .call(this.yAxis)

    this.line = line()
      .x((d, i) => this.x(i))
      .y(d => this.y(d))

    this.chart.append('path')
      .attr('class', 'LimitSwitch line')

    // bottom chart
    this.hBottom = (1 / 4) * height - margin.top - margin.bottom

    this.chartBottom = select(target)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top + (3 / 4) * height})`)

    this.yBottom = scaleLinear()
      .range([this.hBottom, 0])
      .domain([0, 1])

    this.chartBottom.append('g')
      .attr('class', 'LimitSwitch x axis')
      .attr('transform', `translate(0, ${this.yBottom(0)})`)
      .call(this.xAxis)

    this.yAxisBottom = axisLeft(this.yBottom)
      .ticks(yTicks * 1 / 4)

    this.chart.append('g')
      .attr('class', 'LimitSwitch y axis')
      .attr('transform', `translate(0, ${(3 / 4) * height})`)
      .call(this.yAxisBottom)

    this.chartBottom.append('polyline')
      .attr('class', 'LimitSwitch trigger')
  }

  render (data) {
    const {x, y, chart, line} = this

    x.domain([0, data.length - 1])

    chart.select('.line')
      .attr('d', line(data))

    // draw line
    chart.append('line')
      .attr('class', 'LimitSwitch threshold')
      .attr('x1', x(0))
      .attr('y1', y(5))
      .attr('x2', x(data.length - 1))
      .attr('y2', y(5))

    // test path line intersections
    const svgLine = this.chart.select('.threshold')
    // const points = path_line_intersections(pathEl, svgLine)
    const points = this.data_line_intersections(data, svgLine)

    this.drawIntersections(points.pts)

    // add point from left edge to first intersection
    points.onOff.unshift({
      x: 0,
      y: points.onOff[0].y
    })

    // add point from last intersection to right edge
    points.onOff.push({
      x: this.w,
      y: points.onOff[points.onOff.length - 1].y
    })

    const polylines = points.onOff.map(d => `${d.x},${this.yBottom(d.y)}`)
    this.chartBottom.select('.trigger')
      .attr('points', polylines)
  }

  drawIntersections = (pts) => {
    var highlights = this.chart.append('g')

    pts.forEach(pt => {
      highlights.append('circle')
         .attr('cx', pt.x)
         .attr('cy', pt.y)
         .attr('r', 8)
         .attr('fill', 'none')
         .attr('stroke', 'steelblue')

      highlights.append('circle')
         .attr('cx', pt.x)
         .attr('cy', pt.y)
         .attr('r', 2)
         .attr('fill', 'steelblue')
         .attr('stroke', 'none')

      // draw line from top graph to bottom graph
      this.chart.append('line')
        .attr('class', 'LimitSwitch threshold')
        .attr('x1', pt.x)
        .attr('y1', this.y(5))
        .attr('x2', pt.x)
        .attr('y2', this.height - 2 * this.margin.bottom)
    })
  }

  dataLineIntersections = (data, line) => {
    var pts = []
    var onOff = []
    for (var i = 0; i < data.length; i++) {
      const pos1 = {
        x: this.x(i),
        y: this.y(data[i])
      }
      const pos2 = {
        x: this.x(i + 1),
        y: this.y(data[i + 1])
      }
      var line1 = {
        x1: pos1.x,
        x2: pos2.x,
        y1: pos1.y,
        y2: pos2.y
      }
      var line2 = {
        x1: line.attr('x1'),
        x2: line.attr('x2'),
        y1: line.attr('y1'),
        y2: line.attr('y2')
      }
      var pt = lineLineIntersect(line1, line2)
      // check if line is going down \ or up /
      // y is going top to bottom
      if (typeof (pt) !== 'string') {
        // check for up down
        if (pos1.y > pos2.y) {
          // up
          onOff.push({
            x: pt.x,
            y: 0
          })
          onOff.push({
            x: pt.x,
            y: 1
          })
        } else if (pos1.y < pos2.y) {
          // down
          onOff.push({
            x: pt.x,
            y: 1
          })
          onOff.push({
            x: pt.x,
            y: 0
          })
        }
        pts.push(pt)
      }
    }
    return {
      pts,
      onOff
    }
  }
}

function lineLineIntersect (line1, line2) {
  var x1 = line1.x1
  var x2 = line1.x2
  var x3 = line2.x1
  var x4 = line2.x2
  var y1 = line1.y1
  var y2 = line1.y2
  var y3 = line2.y1
  var y4 = line2.y2
  var ptDenom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
  var ptXNum = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)
  var ptYNum = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)
  if (ptDenom === 0) {
    return 'parallel'
  }
  var pt = {
    x: ptXNum / ptDenom,
    y: ptYNum / ptDenom
  }
  if (btwn(pt.x, x1, x2) && btwn(pt.y, y1, y2) && btwn(pt.x, x3, x4) && btwn(pt.y, y3, y4)) {
    return pt
  }
  return 'not in range'
}

function btwn (a, b1, b2) {
  if ((a >= b1) && (a <= b2)) { return true }
  if ((a >= b2) && (a <= b1)) { return true }
  return false
}
