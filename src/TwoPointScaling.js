
import {select} from 'd3-selection'
import {scaleLinear} from 'd3-scale'
import {axisBottom, axisLeft} from 'd3-axis'
import {line} from 'd3-shape'
import {transition} from 'd3-transition'

const defaults = {
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
  clickX: () => {},
  clickY: () => {}
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
      .attr('class', 'label x')
      .attr('x', w + 10)
      .attr('y', this.y(0))
      .text('V')

    // add y axis label
    this.chart.append('text')
      .attr('text-anchor', 'middle')
      .attr('class', 'label y')
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

    // add x axis label
    this.chart.select('.label.x')
      .attr('y', this.y(0))

    // add y axis label
    this.chart.select('.label.y')
      .attr('x', this.x(0))
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

    nodes.transition()
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

  renderHints (data) {
    const {clickX, clickY} = this
    // add rects
    const rectWidth = 24
    const rectAxisPadding = 5
    const rectYAxisPadding = 7

    // x axis
    const hintX = this.chart
      .selectAll('.hint.x')
      .data(data)

    const that = this

    const group = hintX
      .enter()
      .append('g')
      .attr('class', (d, i) => `TwoPointScaling hint x x${i + 1}`)
      .attr('transform', d => {
        // flip hint above x axis when y value is negative
        if (d.y < 0) {
          return `translate(${this.x(d.x) - (rectWidth / 2)}, ${this.y(0) - rectAxisPadding - rectWidth})`
        }
        // show hint below x axis
        return `translate(${this.x(d.x) - (rectWidth / 2)}, ${this.y(0) + rectAxisPadding})`
      })
      .on('click', clickX)
      .on('mouseover', function (d, i) {
        // select line
        that.chart.select(`.TwoPointScaling.crosshair.x${i + 1}`)
          .classed('is-hovered', true)
        // select hint
        select(this).classed('is-hovered', true)
      })
      .on('mouseout', function (d, i) {
        that.chart.select(`.TwoPointScaling.crosshair.x${i + 1}`)
          .classed('is-hovered', false)
        select(this).classed('is-hovered', false)
      })

    group.append('rect')
      .attr('rx', 2)
      .attr('width', rectWidth)
      .attr('height', rectWidth)

    group.append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('x', rectWidth / 2)
      .attr('y', rectWidth / 2)
      .text(d => d.x)

    // transition
    const transitionSelection = hintX.transition()
      .attr('transform', d => {
        // flip hint above x axis when y value is negative
        if (d.y < 0) {
          return `translate(${this.x(d.x) - (rectWidth / 2)}, ${this.y(0) - rectAxisPadding - rectWidth})`
        }
        // show hint below x axis
        return `translate(${this.x(d.x) - (rectWidth / 2)}, ${this.y(0) + rectAxisPadding})`
      })

    transitionSelection.select('text')
      .text(d => d.x)

    // y axis
    const hintY = this.chart
      .selectAll('.hint.y')
      .data(data)

    const groupY = hintY
      .enter()
      .append('g')
      .attr('class', (d, i) => `TwoPointScaling hint y y${i + 1}`)
      .attr('transform', d => {
        // flip hint to the right of y axis when x value is negative
        if (d.x < 0) {
          return `translate(${this.x(0) + rectYAxisPadding}, ${this.y(d.y) - (rectWidth / 2)})`
        }
        // show hint left of y axis
        return `translate(${this.x(0) - rectWidth - rectYAxisPadding}, ${this.y(d.y) - (rectWidth / 2)})`
      })
      .on('click', clickY)
      .on('mouseover', function (d, i) {
        // select line
        that.chart.select(`.TwoPointScaling.crosshair.y${i + 1}`)
          .classed('is-hovered', true)
        select(this).classed('is-hovered', true)
      })
      .on('mouseout', function (d, i) {
        that.chart.select(`.TwoPointScaling.crosshair.y${i + 1}`)
          .classed('is-hovered', false)
        select(this).classed('is-hovered', false)
      })

    groupY.append('rect')
      .attr('rx', 2)
      .attr('width', rectWidth)
      .attr('height', rectWidth)

    groupY.append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('x', rectWidth / 2)
      .attr('y', rectWidth / 2)
      .text(d => d.y)

    // transition
    const transitionSelectionY = hintY.transition()
      .attr('transform', d => {
        // flip hint to the right of y axis when x value is negative
        if (d.x < 0) {
          return `translate(${this.x(0) + rectYAxisPadding}, ${this.y(d.y) - (rectWidth / 2)})`
        }
        // show hint left of y axis
        return `translate(${this.x(0) - rectWidth - rectYAxisPadding}, ${this.y(d.y) - (rectWidth / 2)})`
      })

    transitionSelectionY.select('text')
      .text(d => d.y)
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

    // get point further left / more negative
    let left = x1 < x2 ? x1 : x2
    // make sure axis are always visible
    left = left < 0 ? left : -(left / 100 * 50)
    // get point further right / more positive
    let right = x1 > x2 ? x1 : x2
    right = right > 0 ? right : (right / 100 * 50)
    // get point further up / more positive
    let up = y1 > y2 ? y1 : y2
    up = up > 0 ? up : (up / 100 * 50)
    // get point further down / more negative
    let down = y1 < y2 ? y1 : y2
    down = down < 0 ? down : -(down / 100 * 50)

    const leftWithPadding = left - (Math.abs(left) / 100 * 10)
    const rightWithPadding = right + (Math.abs(right) / 100 * 10)
    const upWithPadding = up + (Math.abs(up) / 100 * 10)
    const downWithPadding = down - (Math.abs(down) / 100 * 10)

    // update domains
    // create extra space at both ends
    this.x.domain([leftWithPadding, rightWithPadding])
    this.y.domain([downWithPadding, upWithPadding])

    const lineData = [
      {x: leftWithPadding, y: m * leftWithPadding + n},
      {x: rightWithPadding, y: m * rightWithPadding + n}
    ]
    this.renderAxis(data)
    this.renderLine(lineData)
    this.renderHelperLines(data)
    this.renderDots(data)
    this.renderHints(data)
  }

  focus (point) {
    this.chart.select(`.TwoPointScaling.crosshair.${point}`)
      .classed('is-focused', true)
    this.chart.select(`.TwoPointScaling.hint.${point}`)
      .classed('is-focused', true)
  }

  blur (point) {
    this.chart.select(`.TwoPointScaling.crosshair.${point}`)
      .classed('is-focused', false)
    this.chart.select(`.TwoPointScaling.hint.${point}`)
      .classed('is-focused', false)
  }
}
