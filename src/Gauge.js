
import {select} from 'd3-selection'
import {arc} from 'd3-shape'
import {scaleLinear} from 'd3-scale'

const defaults = {
  target: '#svg',
  width: 480,
  duration: 2000,
  unit: 'Nm',
  margin: 40,
  labelPadding: 10
}

const arcMin = -Math.PI / 2
const arcMax = Math.PI / 2

export default class Gauge {
  constructor (config) {
    Object.assign(this, defaults, config)

    // use width to calculate height.
    // use half the width since we only have half a donut chart.
    this.height = this.width / 2

    this.outerRadius = this.height - this.margin

    // thickness is a fixed ratio and depends on the chart size.
    this.thickness = this.outerRadius / 3

    this.init()
  }

  init () {
    const {target, width, height, thickness} = this

    const value = this.limit(this.value, this.min, this.max)

    this.scale = scaleLinear()
      .domain([this.min, this.max])
      .range([arcMin, arcMax])

    // set width and height of svg.
    // transform coordinate system to the bottom center of the svg.
    this.chart = select(target)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      // leave some space at the bottom to fix max and min numbers
      .attr('transform', `translate(${width / 2}, ${height - 10})`)

    // append the text to the svg
    this.text = this.chart.append('text')
      .html(`${this.display}&nbsp;<tspan class='gauge-unit'>${this.unit}</tspan>`)
      .attr('class', 'gauge-text')
      .attr('text-anchor', 'middle')
      .attr('y', -5)

    // arc generator
    this.myArc = arc()
      .outerRadius(this.outerRadius)
      .innerRadius(this.outerRadius - thickness)
      .startAngle(arcMin)

    // add grey background
    this.chart.append('path')
      .datum({endAngle: arcMax})
      .style('fill', '#ddd')
      .attr('class', 'gauge-background')
      .attr('d', this.myArc)

    // add orange foreground
    this.foreground = this.chart.append('path')
      .datum({endAngle: this.scale(value)})
      // .datum({endAngle: 0.85 * arcMax})
      .style('fill', 'orange')
      .attr('class', 'gauge-foreground')
      .attr('d', this.myArc)

    // arc tween to transition between values
    // this.arcTween = newAngle => d => {
    //   const i = interpolate(d.endAngle, newAngle)
    //   return t => {
    //     d.endAngle = i(t)
    //     return this.myArc(d)
    //   }
    // }

    this.appendTicks()

    // text tween to transition between values
    // this.tweenText = newValue => function() {
    //   const node = this
    //   const oldValue = parseFloat(node.textContent.replace(/\sNm/g, ''))
    //   const i = interpolate(oldValue, newValue)
    //   return t => {
    //     node.innerHTML = `${fmt(i(t))}&nbsp;<tspan class='gauge-unit' alignment-baseline='ideographic'>${unit}</tspan>`
    //   }
    // }
  }

  // limit makes sure value isn't bigger than max and smaller than min
  limit (value, min, max) {
    let val = value
    if (value < min) {
      val = min
    } else if (value > max) {
      val = max
    }
    return val
  }

  appendTicks () {
    this.chart.selectAll('.gauge-ticks')
      .data(this.scale.ticks(5))
      .enter()
      .append('text')
      .attr('class', 'gauge-ticks')
      .attr('alignment-baseline', 'middle')
      .style('text-anchor', 'middle')
      .attr('x', d => Math.cos(this.scale(d) + arcMin) * (this.outerRadius + this.labelPadding))
      .attr('y', d => Math.sin(this.scale(d) + arcMin) * (this.outerRadius + this.labelPadding))
      .text(d => d)
  }

  resize (width, height) {
    const {target} = this

    const size = width / 2

    this.outerRadius = size - this.margin
    this.thickness = this.outerRadius / 3

    select(target)
      .attr('width', width)
      .attr('height', size)
      .select('g')
      // leave some space at the bottom to fix max and min numbers
      .attr('transform', `translate(${size}, ${size - 10})`)

    this.myArc
      .outerRadius(this.outerRadius)
      .innerRadius(this.outerRadius - this.thickness)

    // add grey background
    this.chart.select('.gauge-background')
      .attr('d', this.myArc)

    // add orange foreground
    this.chart.select('.gauge-foreground')
      .attr('d', this.myArc)

    this.chart.selectAll('.gauge-ticks')
      .attr('x', d => Math.cos(this.scale(d) + arcMin) * (this.outerRadius + this.labelPadding))
      .attr('y', d => Math.sin(this.scale(d) + arcMin) * (this.outerRadius + this.labelPadding))
  }

  update (values) {
    const {min, max, value, display} = values

    // this.min = min
    // this.max = max
    this.scale.domain([min, max])

    // remove all old ticks
    this.chart.selectAll('.gauge-ticks')
      .remove()

    // add new ticks
    this.appendTicks()

    // update text value
    this.text
      .html(`${display}&nbsp;<tspan class='gauge-unit'>${this.unit}</tspan>`)

    // no transition for now since it costs too much performance
    // this.text
    //   .transition()
    //   .duration(this.duration)
    //   .tween('text', this.tweenText(value))
    //

    const val = this.limit(value, min, max)

    // update foreground arc
    this.foreground
      .datum({endAngle: this.scale(val)})
      .attr('d', this.myArc)

    // no transition for now since it costs too much performance
    // this.foreground
    //   .transition()
    //   .duration(this.duration)
    //   .attrTween('d', this.arcTween(this.scale(value)))
  }
}
