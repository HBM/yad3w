
import React from 'react'
import {area as d3area} from 'd3-shape'

export default class Area extends React.Component {
  render () {
    const style = {
      fill: 'steelblue',
      opacity: 0.25
    }

    var area = d3area()
      .x((d, i) => this.props.xScale(i))
      .y0(this.props.height)
      .y1(d => this.props.yScale(d))

    return (
      <path
        style={style}
        d={area(this.props.data)}
      />
    )
  }
}
