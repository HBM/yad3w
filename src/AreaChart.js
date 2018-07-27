
import {select} from 'd3-selection'
import {scaleLinear} from 'd3-scale'
import {axisBottom, axisLeft} from 'd3-axis'
import {line, area} from 'd3-shape'
import {max, min} from 'd3-array'

/**
 * Default config.
 */
const defaults = {

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
  xTicks: 0,

  // number of y-axis ticks
  yTicks: 3
}

export default class AreaChart {
  constructor (config) {
    Object.assign(this, defaults, config)
    this.init()
  }

  init () {
    const {target, width, height, margin} = this
    const {xTicks, yTicks} = this
    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom

    this.chart = select(target)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this.x = scaleLinear()
      .range([0, w])

    this.y = scaleLinear()
      .range([h, 0])

    this.xAxis = axisBottom(this.x)
      .ticks(xTicks)

    this.yAxis = axisLeft(this.y)
      .ticks(yTicks)
      // .tickFormat(format('.6f'))

    this.area = area()
      .x((d, i) => this.x(i))
      .y0(() => this.y(0))
      .y1(d => this.y(d))

    this.chart
      .append('path')
      .attr('class', 'Area area')

    this.line = line()
      .x((d, i) => this.x(i))
      .y(d => this.y(d))

    this.chart
      .append('path')
      .attr('class', 'Area line')

    this.chart.append('g')
      .attr('class', 'Area x axis')
      .attr('transform', `translate(0, ${this.y(0)})`)
      .call(this.xAxis)

    this.chart.append('g')
      .attr('class', 'Area y axis')
      .call(this.yAxis)
  }

  render (data) {
    const {chart, x, y, xAxis, yAxis} = this

    x.domain([0, data.length - 1])

    // set y domain depending on data to make sure x-axis is always visible
    const low = min(data)
    const high = max(data)
    if (low >= 0) {
      y.domain([0, high])
    } else if (low < 0 && high > 0) {
      y.domain([low, high])
    } else if (high <= 0) {
      y.domain([low, 0])
    }

    chart.select('.x.axis')
      .attr('transform', `translate(0, ${this.y(0)})`)
      .call(xAxis)

    chart.select('.y.axis')
      .call(yAxis)

    chart.select('.line')
      .datum(data)
      .attr('d', this.line)

    chart.select('.area')
      .datum(data)
      .attr('d', this.area)
  }

  resize = (width) => {
    const {target, chart, margin, xAxis, line} = this

    // change svg width
    select(target).attr('width', width)

    // calc new internal width
    const w = width - margin.left - margin.right

    // adjust horizontal range
    this.x.range([0, w])

    // adjust x axis
    chart.select('.x.axis')
      .call(xAxis)

    // adjust line
    chart.select('.line')
      .attr('d', line)

    // adjust area
    chart.select('.area')
      .attr('d', this.area)
  }
}
