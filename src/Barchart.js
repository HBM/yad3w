
import {select} from 'd3-selection'
import {scaleBand, scaleLinear} from 'd3-scale'
import {axisBottom, axisLeft} from 'd3-axis'
import {extent} from 'd3-array'

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
  yTicks: 5,
  tickFormat: d => '-' + ((Date.now() - d) / 1000).toFixed(1) + ' s'
}

export default class Barchart {
  constructor (config) {
    Object.assign(this, defaults, config)

    const {target, width, height, margin} = this
    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom

    const {yTicks} = this

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

    this.chart.append('g')
      .attr('class', 'x axis')

    this.yAxis = axisLeft(this.y)
      .ticks(yTicks)

    this.chart.append('g')
      .attr('class', 'y axis')
  }

  render (data) {
    const {x, y, xAxis, yAxis, chart, tickFormat} = this

    y.domain(extent(data, v => v.value))

    const domain = data.map(d => d.timestamp)
    x.domain(domain)

    xAxis
      .tickValues(domain.filter((d, i) => (i - 1) % 4 === 0))
      .tickFormat(tickFormat)

    chart.select('.x.axis')
      .attr('transform', `translate(0, ${y(0)})`)
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
      .attr('x', d => x(d.timestamp))
      .attr('y', d => y(Math.max(0, d.value)))
      .attr('width', x.bandwidth())
      .attr('height', d => Math.abs(y(d.value) - y(0)))

    // exit selection
    bars
      .exit()
      .remove()
  }

  resize = (width) => {
    const {target, chart, margin} = this

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
      .attr('x', d => this.x(d.timestamp))
      .attr('width', this.x.bandwidth())
  }
}
