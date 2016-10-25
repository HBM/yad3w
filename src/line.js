
import {select} from 'd3-selection'
import {scaleLinear} from 'd3-scale'
import {axisBottom, axisLeft} from 'd3-axis'
import {line, curveBasis} from 'd3-shape'
import {transition, active} from 'd3-transition'
import {range} from 'd3-array'
import {easeLinear} from 'd3-ease'
import {randomNormal} from 'd3-random'

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
  axisPadding: 0,

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
    const {target, width, height, margin, axisPadding} = this
    const {tickSize, xTicks, yTicks} = this
    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom

    var n = 40
    var random = randomNormal(0, 0.2)
    var data = range(n).map(random)

    this.chart = select(target)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this.chart
      .append('defs').append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', width)
      .attr('height', height)

    this.x = scaleLinear()
      .domain([1, n - 2])
      .range([0, w])

    this.y = scaleLinear()
      .domain([-1, 1])
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
      .x((d, i) => this.x(i))
      .y(d => this.y(d))
      .curve(curveBasis)

    const t = transition()
      .duration(250)
      .ease(easeLinear)

    const that = this
    function tick () {
      data.push(random())

      // redraw line
      select(this)
        .attr('d', that.line)
        .attr('transform', null)

      // slide to the left
      active(this)
        .attr('transform', `translate(${that.x(0)}, 0)`)
        .transition(t)
        .on('start', tick)

      data.shift()
    }

    this.chart.append('g')
      .attr('clip-path', 'url(#clip)')
      .append('path')
      .datum(data)
      .attr('class', 'line')
      .transition(t)
      .on('start', tick)
  }

}
