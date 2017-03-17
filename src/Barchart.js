
import {select} from 'd3-selection'
import {scaleBand, scaleLinear} from 'd3-scale'
import {axisBottom, axisLeft} from 'd3-axis'

const defaults = {

  target: '#chart',

  width: 500,

  height: 170,

  margin: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  },

  xTicks: 0,

  yTicks: 5,

  minVal: -10,

  maxVal: 10

}

export default class Barchart {
  constructor (config) {
    Object.assign(this, defaults, config)

    const {target, width, height, margin} = this
    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom

    const {minVal, maxVal, xTicks, yTicks} = this

    this.chart = select(target)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this.x = scaleBand()
      .rangeRound([0, w])
      .padding(0.1)

    this.y = scaleLinear()
      .rangeRound([h, 0])
      .domain([minVal, maxVal])

    this.xAxis = axisBottom(this.x)
      .ticks(xTicks)

    this.chart.append('g')
      .attr('class', 'x axis')

    this.yAxis = axisLeft(this.y)
      .ticks(yTicks)

    this.chart.append('g')
      .attr('class', 'y axis')

    window.addEventListener('resize', this.resize)
  }

  destroy () {
    window.removeEventListener('resize', this.resize)
  }

  render (data) {
    const {x, y, xAxis, yAxis, chart} = this

    x.domain(data.map((d, i) => i))

    chart.select('.x.axis')
      .attr('transform', `translate(0, ${this.y(0)})`)
      .call(xAxis)

    chart.select('.y.axis')
      .call(yAxis)

    const bars = chart.selectAll('.bar')
      .data(data)

    // no special update selection required

    // enter selection
    // after merging entered elements with the update selection,
    // apply operations to both
    bars
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .merge(bars)
      .attr('x', (d, i) => x(i))
      .attr('y', d => y(Math.max(0, d)))
      .attr('width', x.bandwidth())
      .attr('height', d => Math.abs(y(d) - y(0)))

    // exit selection
    bars
      .exit()
      .remove()
  }

  resize = () => {
    const {target, chart, margin} = this

    // get width from parent of svg container
    const width = target.parentNode.getBoundingClientRect().width

    // change svg width
    select(target).attr('width', width)

    // calc new internal width
    const w = width - margin.left - margin.right

    // adjust horizontal range
    this.x.rangeRound([0, w])

    // adjust x axis
    chart.select('.x.axis')
      .call(this.xAxis)

    // adjust bars
    chart.selectAll('.bar')
      .attr('x', (d, i) => this.x(i))
      .attr('width', this.x.bandwidth())
  }
}
