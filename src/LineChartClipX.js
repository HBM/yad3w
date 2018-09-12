
import {select} from 'd3-selection'
import {scaleLinear, scaleTime} from 'd3-scale'
import {axisTop, axisLeft} from 'd3-axis'
import {line, curveStepAfter, area} from 'd3-shape'
import {extent} from 'd3-array'
import {timeFormat} from 'd3-time-format'

/**
 * Default config.
 */
const defaults = {

  // target element or selector to contain the svg
  target: '#chart',

  // width of chart
  width: 640,

  // height of chart
  height: 480,

  // margins
  margin: {
    top: 15,
    right: 20,
    bottom: 35,
    left: 60
  },

  // number of x-axis ticks
  xTicks: 3,

  // number of y-axis ticks
  yTicks: 3,

  // line interpolation
  curve: curveStepAfter
}

/**
 * LineChart component.
 */
export default class LineChart {
  /**
   * Construct with given `config`.
   */
  constructor (config) {
    Object.assign(this, defaults, config)
    this.init()
  }

  /**
   * Initialize the chart.
   */
  init () {
    const {target, width, height, margin, curve} = this
    const {xTicks, yTicks} = this
    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom

    this.chart = select(target)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this.x = scaleTime()
      .range([0, w])

    this.y = scaleLinear()
      .range([h, 0])

    this.xAxisCenter = axisTop(this.x)
      .ticks(0)
      .tickSizeOuter(0)

    this.xAxisBottom = axisTop(this.x)
      .tickSize(0)
      .ticks(xTicks)
      .tickFormat(timeFormat('%H:%M:%S'))

    this.yAxis = axisLeft(this.y)
      .ticks(yTicks)
      .tickSizeOuter(0)

    // add grid
    this.xGrid = axisTop(this.x)
      .tickSize(-h)
      .tickFormat('')

    this.chart
      .append('g')
      .attr('class', 'x grid')

    // add grid
    this.yGrid = axisLeft(this.y)
      .ticks(yTicks)
      .tickSize(-w)
      .tickFormat('')

    this.chart
      .append('g')
      .attr('class', 'y grid')

    this.chart.append('g')
      .attr('class', 'x axis center')
      // .attr('transform', `translate(0, ${this.y(0)})`)
      .call(this.xAxisCenter)

    this.chart.append('g')
      .attr('class', 'x axis bottom')
      .attr('transform', `translate(0, ${h})`)
      .call(this.xAxisBottom)

    this.chart.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${w}, 0)`)
      .call(this.yAxis)

    this.line = line()
      .x(d => this.x(d.ts))
      .y(d => this.y(d.value))
      .curve(curve)

    this.area = area()
      .x(d => this.x(d.ts))
      .y1(d => this.y(d.value))
      .curve(curve)

    this.chart
      .append('path')
      .attr('class', 'line')

    this.chart
      .append('path')
      .attr('class', 'area')
  }

  render (data) {
    // prevent NaN values in DOM when data is empty
    // extent returns [undefined, undefined] for an empty array
    // and y(0) returns NaN
    if (!data.length) {
      return
    }

    const {x, y, xAxisBottom, yAxis} = this

    x.domain(extent(data, d => d.ts))
    // y.domain(extent(data, d => d.value))

    const yExtent = extent(data, d => d.value)

    // yExtent[1] and yExtent[0] might have the same value, e.g. steady signal like test signal
    const yExtentDiff = 0.05 * (Math.abs(yExtent[1] - yExtent[0]) || yExtent[1])

    y.domain([yExtent[0] - yExtentDiff, yExtent[1] + yExtentDiff])

    this.area
      .y0(y(0))

    this.chart
      .select('.area')
      .datum(data)
      .attr('d', this.area)

    this.chart
      .select('.x.axis.center')
      .attr('transform', `translate(0, ${this.y(0)})`)
      .call(this.xAxisCenter)

    this.chart
      .select('.x.axis.bottom')
      .call(xAxisBottom)

    this.chart
      .select('.y.axis')
      .call(yAxis)

    this.chart
      .select('.line')
      .datum(data)
      .attr('d', this.line)

    this.chart
      .select('.x.grid')
      .call(this.xGrid)

    this.chart
      .select('.y.grid')
      .call(this.yGrid)
  }

  resize (width, height) {
    const {target, margin, chart} = this

    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom

    select(target)
      .attr('width', width)
      .attr('height', height)

    this.y
      .range([h, 0])

    this.x
      .range([0, w])

    chart.select('.y.axis')
      .attr('transform', `translate(${w}, 0)`)
      .call(this.yAxis)

    // adjust x axis
    chart.select('.x.axis.center')
      .call(this.xAxisCenter)

    // adjust x axis bottom
    chart.select('.x.axis.bottom')
      .attr('transform', `translate(0, ${h})`)
      .call(this.xAxisBottom)

    // adjust line
    chart.select('.line')
      .attr('d', this.line)

    // adjust area
    chart.select('.area')
      .attr('d', this.area)

    this.xGrid
      .tickSize(-h)

    this.yGrid
      .tickSize(-w)

    chart.select('.x.grid')
      .call(this.xGrid)

    chart.select('.y.grid')
      .call(this.yGrid)
  }
}
