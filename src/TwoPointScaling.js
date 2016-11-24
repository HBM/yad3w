
import {select} from 'd3-selection'
import {scaleLinear} from 'd3-scale'
import {axisBottom, axisLeft} from 'd3-axis'
import {line} from 'd3-shape'

const defaults = {
  width: 400,
  height: 400,
  margin: {
    top: 20,
    // add some space for x axis label
    right: 60,
    bottom: 20,
    left: 20
  },
  // axis tick size
  tickSize: 5,
  // number of x-axis ticks
  xTicks: 3,
  // number of y-axis ticks
  yTicks: 5
}

export default class TwoPointScaling {

  constructor (config) {
    Object.assign(this, defaults, config)
    this.init()
  }

  init () {
    const {target, width, height, margin} = this
    const {tickSize, xTicks, yTicks} = this

    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom

    this.chart = select(target)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this.x = scaleLinear()
      .domain([-1, 1])
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
      .attr('class', 'TwoPointScaling x axis')

    this.chart.append('g')
      .attr('class', 'TwoPointScaling y axis')

    this.line = line()
      .x(d => this.x(d.x))
      .y(d => this.y(d.y))

    this.chart.append('path')
      .attr('class', 'TwoPointScaling line')

    // add x axis label
    this.chart.append('text')
      .attr('text-anchor', 'start')
      .attr('alignment-baseline', 'central')
      .attr('x', w + 10)
      .attr('y', this.y(0))
      .text('V')

    // add y axis label
    this.chart.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', this.x(0))
      .attr('y', -10)
      .text('rpm')
  }

  renderAxis (data) {
    const {chart, xAxis, yAxis} = this

    chart.select('.x.axis')
      // move axis to origin
      .attr('transform', `translate(0, ${this.y(0)})`)
      .call(xAxis)
    chart.select('.y.axis')
      // move axis right into origin
      .attr('transform', `translate(${this.x(0)}, 0)`)
      .call(yAxis)
  }

  renderLine (data) {
    const {chart, line} = this
    chart.select('.line')
      .transition()
      .attr('d', line(data))
  }

  renderDots (data) {
    const nodes = this.chart
      .selectAll('g.node')
      .data(data)

    const nodesEnter = nodes.enter()
      .append('g')
      .attr('transform', d => `translate(${this.x(d.x)}, ${this.y(d.y)})`)
      .attr('class', 'node')

    nodesEnter
      .append('circle')
      .attr('class', 'TwoPointScaling dot')
      .attr('r', 5)

    nodesEnter
      .append('text')
      .text((d, i) => i === 0 ? 'P' : 'Q')
      .attr('alignment-baseline', 'central')
      .attr('text-anchor', 'middle')
      .attr('dy', '-10px')
      .attr('dx', '-10px')

    const nodesTransition = nodes.transition()
      .attr('transform', d => `translate(${this.x(d.x)}, ${this.y(d.y)})`)
  }

  renderHelperLines (data) {
    // draw line from point to x and y axis
    const crosshairX = this.chart
      .selectAll('.crosshair.x')
      .data(data)

    // render crosshair lines from x axis to line
    // render line on first call
    crosshairX.enter()
      .append('line')
      .attr('class', (d, i) => `TwoPointScaling crosshair x x${i + 1}`)
      .attr('x1', d => this.x(d.x))
      .attr('y1', this.y(0))
      .attr('x2', d => this.x(d.x))
      .attr('y2', d => this.y(d.y))

    // update line on second call
    crosshairX.transition()
      .attr('x1', d => this.x(d.x))
      .attr('y1', this.y(0))
      .attr('x2', d => this.x(d.x))
      .attr('y2', d => this.y(d.y))

    const crosshairY = this.chart
      .selectAll('.crosshair.y')
      .data(data)

    // render crosshair lines from y axis to line
    crosshairY.enter()
      .append('line')
      .attr('class', (d, i) => `TwoPointScaling crosshair y y${i + 1}`)
      .attr('x1', this.x(0))
      .attr('y1', d => this.y(d.y))
      .attr('x2', d => this.x(d.x))
      .attr('y2', d => this.y(d.y))

    crosshairY.transition()
      .attr('x1', this.x(0))
      .attr('y1', d => this.y(d.y))
      .attr('x2', d => this.x(d.x))
      .attr('y2', d => this.y(d.y))
  }

  render (data) {
    // take incoming data with two points (x1, y1) and (x2, y2)
    const x1 = data[0].x
    const y1 = data[0].y
    const x2 = data[1].x
    const y2 = data[1].y
    // y = m * x + n
    // http://keisan.casio.com/exec/system/1223508685
    const m = (y2 - y1) / (x2 - x1)
    const n = ((x2 * y1) - (x1 * y2)) / (x2 - x1)
    const lineData = [{x: -1, y: m * -1 + n}, {x: 1, y: m * 1 + n}]
    this.renderAxis(data)
    this.renderLine(lineData)
    this.renderHelperLines(data)
    this.renderDots(data)
  }

  focus (point) {
    this.chart.select(`.TwoPointScaling.crosshair.${point}`)
      .classed('is-focused', true)
  }

  blur (point) {
    this.chart.select(`.TwoPointScaling.crosshair.${point}`)
      .classed('is-focused', false)
  }

}
