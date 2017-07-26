
import {select} from 'd3-selection'
import {scaleLinear} from 'd3-scale'
import {axisBottom, axisLeft} from 'd3-axis'
import {line, area} from 'd3-shape'
import {extent} from 'd3-array'
import {easeLinear} from 'd3-ease'

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
    const {target, width, height, margin, curve} = this
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

    this.chart.append('g')
      .attr('class', 'Area x axis')
      .attr('transform', `translate(0, ${this.y(0)})`)
      .call(this.xAxis)

    this.chart.append('g')
      .attr('class', 'Area y axis')
      .call(this.yAxis)

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
  }

  render (data) {
    const {x, y, xAxis, yAxis} = this

    x.domain([0, data.length - 1])
    y.domain(extent(data))

    this.chart.select('.x.axis')
      .attr('transform', `translate(0, ${this.y(0)})`)
      .call(xAxis)

    this.chart.select('.y.axis')
      .call(yAxis)

    this.chart.select('.line')
      .datum(data)
      .attr('d', this.line)

    this.chart.select('.area')
      .datum(data)
      .attr('d', this.area)
  }
}
