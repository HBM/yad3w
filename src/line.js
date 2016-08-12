
import {select} from 'd3-selection'
import {scaleLinear, scaleTime} from 'd3-scale'
import {axisBottom, axisLeft} from 'd3-axis'
import {line, curveBasis} from 'd3-shape'
import {extent} from 'd3-array'
import {transition} from 'd3-transition'

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
    right: 0,
    bottom: 35,
    left: 60
  },

  // axis padding
  axisPadding: 5,

  // axis tick size
  tickSize: 0,

  // number of x-axis ticks
  xTicks: 5,

  // number of y-axis ticks
  yTicks: 3,

  // line interpolation
  curve: curveBasis
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
    const {target, width, height, margin, axisPadding, curve} = this
    const {tickSize, xTicks, yTicks} = this
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

    this.xAxis = axisBottom(this.x)
      .ticks(xTicks)
      .tickPadding(8)
      .tickSize(tickSize)

    this.yAxis = axisLeft(this.y)
      .ticks(yTicks)
      .tickPadding(8)
      .tickSize(tickSize)

    this.chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${h + axisPadding})`)
      .call(this.xAxis)

    this.chart.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${-axisPadding}, 0)`)
      .call(this.yAxis)

    this.line = line()
      .x(d => this.x(d.time))
      .y(d => this.y(d.value))
      .curve(curve)

    this.chart.append('path')
      .attr('class', 'line')
  }

  /**
   * Render axis.
   */
  renderAxis (data, options) {
    const {chart, x, y, xAxis, yAxis} = this

    x.domain(extent(data, d => d.time))
    y.domain(extent(data, d => d.value))

    const t = transition().duration(1000)

    const c = options.animate
      ? chart.transition(t)
      : chart

    c.select('.x.axis').call(xAxis)
    c.select('.y.axis').call(yAxis)
  }

  /**
   * Render line.
   */
  renderLine (data) {
    const t = transition().duration(1000)
    const chart = this.chart.transition(t)
    const {line} = this

    chart.select('.line')
      .attr('d', line(data))
  }

  /**
   * Render the chart with given `data`.
   */
  render (data, options = {}) {
    this.renderAxis(data, options)
    this.renderLine(data, options)
  }

  /**
   * Update the chart with given `data`.
   */
  update (data) {
    this.render(data, {
      animate: true
    })
  }

}
