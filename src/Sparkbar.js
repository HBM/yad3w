
import {scaleBand, scaleLinear} from 'd3-scale'
import {extent} from 'd3-array'
import retinafy from './retinafy'

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

    // get width and height for d3 before applying retina fix
    this.width = this.canvas.width - this.margin.left - this.margin.right
    this.height = this.canvas.height - this.margin.top - this.margin.bottom

    // make canvas look nice on retina displays
    this.canvas = retinafy(this.canvas)

    this.x = scaleBand()
      .rangeRound([0, this.width])
      .padding(this.padding)

    this.y = scaleLinear()
      .rangeRound([this.height, 0])

    this.context = this.canvas.getContext('2d')
    this.context.translate(this.margin.left, this.margin.top)
  }

  render (data) {
    const {x, y, canvas, context, fillStyle} = this
    x.domain(data.map((d, i) => i))
    y.domain(extent(data))

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = fillStyle
    data.forEach((d, i) => {
      context.fillRect(x(i), y(Math.max(0, d)), x.bandwidth(), Math.abs(y(d) - y(0)))
    })
  }

}
