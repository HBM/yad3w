
import {select} from 'd3-selection'
import {scaleBand, scaleLinear} from 'd3-scale'
import {extent} from 'd3-array'
import {axisBottom, axisLeft} from 'd3-axis'

const defaults = {

  target: '#chart',

  width: 500,

  height: 170,

  margin: {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  },

  xTicks: 0,

  yTicks: 5

}

export default class Barchart {
  constructor (config) {
    Object.assign(this, defaults, config)

    const {target, width, height, margin} = this
    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom

    const {xTicks, yTicks} = this

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

    this.xAxis = axisBottom(this.x)
      .ticks(xTicks)

    this.chart.append('g')
      .attr('class', 'x axis')

    this.yAxis = axisLeft(this.y)
      .ticks(yTicks)

    this.chart.append('g')
      .attr('class', 'y axis')
  }

  render (data) {
    const {x, y, xAxis, yAxis, chart} = this

    x.domain(data.map((d, i) => i))
    y.domain(extent(data))

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
}
