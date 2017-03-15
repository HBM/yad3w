
import {select} from 'd3-selection'
import {scaleLinear} from 'd3-scale'
import {axisBottom, axisLeft} from 'd3-axis'
import {line, curveLinear} from 'd3-shape'
import {transition, active} from 'd3-transition'
import {max} from 'd3-array'
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
  xTicks: 5,

  // number of y-axis ticks
  yTicks: 3,

  // line interpolation
  curve: curveLinear
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

    this.chart
      .append('defs').append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', w)
      .attr('height', h)

    this.x = scaleLinear()
      .range([0, w])

    this.y = scaleLinear()
      .range([h, 0])

    this.xAxis = axisBottom(this.x)
      .ticks(xTicks)

    this.yAxis = axisLeft(this.y)
      .ticks(yTicks)

    this.chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${this.y(0)})`)
      .call(this.xAxis)

    this.chart.append('g')
      .attr('class', 'y axis')
      .call(this.yAxis)

    this.line = line()
      .x((d, i) => this.x(i))
      .y(d => this.y(d))
      .curve(curve)

    this.chart.append('g')
      .attr('clip-path', 'url(#clip)')
      .append('path')
      .attr('class', 'line')
  }

  render (data) {
    const {x, y, xAxis, yAxis} = this

    x.domain([0, data.length - 2])
    y.domain([0, max(data)])

    select('.x.axis')
      .call(xAxis)

    select('.y.axis')
      .call(yAxis)

    const t = transition()
      .ease(easeLinear)
      .duration(250)

    const that = this

    select('.line')
      .datum(data)
      .transition(t)
      .on('start', function () {
        // redraw line
        select(this)
          .attr('d', that.line)
          .attr('transform', null)

        // https://github.com/d3/d3-transition#active
        // returns the active transition on the specified node
        // slide to the left
        active(this)
          .attr('transform', `translate(${that.x(-1)}, 0)`)
          .transition(t)
      })
  }
}
