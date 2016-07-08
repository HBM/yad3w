
import React from 'react'
import {line as d3line} from 'd3-shape'

export default class Line extends React.Component {

  static defaultProps = {
    fill: 'none',
    strokeWidth: 1,
    stroke: 'steelblue'
  }

  render () {
    // line is not yet done
    // https://github.com/mbostock/d3/issues/2461
    var line = d3line()
      .x((d, i) => this.props.xScale(i))
      .y(d => this.props.yScale(d))

    return (
      <path
        d={line(this.props.data)}
        fill={this.props.fill}
        strokeWidth={this.props.strokeWidth}
        stroke={this.props.stroke}
      />
    )
  }

}
