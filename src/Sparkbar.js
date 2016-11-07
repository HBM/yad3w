
import {scaleBand, scaleLinear} from 'd3-scale'
import {max} from 'd3-array'

const defaults = {

  padding: 0.1,

  fillStyle: 'steelblue',

  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

}

export default class Sparkbar {

  constructor (config) {
    Object.assign(this, defaults, config)

    this.context = this.canvas.getContext('2d')

    this.width = this.canvas.width - this.margin.left - this.margin.right
    this.height = this.canvas.height - this.margin.top - this.margin.bottom

    this.x = scaleBand()
      .rangeRound([0, this.width])
      .padding(this.padding)

    this.y = scaleLinear()
      .rangeRound([this.height, 0])

    this.context.translate(this.margin.left, this.margin.top)
  }

  render (data) {
    this.x.domain(data.map((d, i) => i))
    this.y.domain([0, max(data)])

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.fillStyle = this.fillStyle
    data.forEach((d, i) => {
      this.context.fillRect(this.x(i), this.y(d), this.x.bandwidth(), this.height - this.y(d))
    })
  }

}
