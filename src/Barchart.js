
import {select} from 'd3-selection'
import {scaleBand, scaleLinear} from 'd3-scale'
import {max} from 'd3-array'

const defaults = {

  target: '#chart',

  width: 500,

  height: 170,

  margin: {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  }

}

export default class Barchart {

  constructor (config) {
    Object.assign(this, defaults, config)

    const {target, width, height, margin} = this
    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom

    this.x = scaleBand()
      .rangeRound([0, w])
      .padding(0.1)

    this.y = scaleLinear()
      .rangeRound([h, 0])

    this.chart = select(target)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
  }

  render (data) {
    const {x, y, height, chart} = this

    x.domain(data.map((d, i) => i))
    y.domain([0, max(data)])

    chart.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x(i))
      .attr('y', d => y(d))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d))
  }

}
