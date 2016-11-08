
import {scaleLinear} from 'd3-scale'
import {line, curveBasis} from 'd3-shape'
import {min, max} from 'd3-array'
import retinafy from './retinafy'

const defaults = {

  lineWidth: 1,

  strokeStyle: 'steelblue',

  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

}

export default class Sparkline {

  constructor (config) {
    Object.assign(this, defaults, config)

    this.context = this.canvas.getContext('2d')

    const width = this.canvas.width - this.margin.left - this.margin.right
    const height = this.canvas.height - this.margin.top - this.margin.bottom

    // make canvas look nice on retina displays
    this.canvas = retinafy(this.canvas)

    this.x = scaleLinear()
      .range([0, width])

    this.y = scaleLinear()
      .range([height, 0])

    this.line = line()
      .x((d, i) => this.x(i))
      .y(d => this.y(d))
      .curve(curveBasis)
      .context(this.context)

    this.context.translate(this.margin.left, this.margin.top)
  }

  render (data) {
    const {x, y, canvas, context, line} = this

    x.domain([0, data.length - 1])
    y.domain([min(data), max(data)])

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath()
    line(data)
    context.lineWidth = this.lineWidth
    context.strokeStyle = this.strokeStyle
    context.stroke()
  }

}
