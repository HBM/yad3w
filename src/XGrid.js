
import React from 'react'

const style = {
  shapeRendering: 'crispEdges'
}

export default class XGrid extends React.Component {
  static defaultProps = {
    ticks: 10
  }

  render () {
    var {width, yScale} = this.props

    var lines = yScale.ticks(this.props.ticks).map((d, i) =>
      <line
        key={i}
        x1='0'
        y1={yScale(d)}
        x2={width}
        y2={yScale(d)}
        fill='none'
        stroke='lightgrey'
        strokeWidth='1'
        style={style}
      />
    )

    return (
      <g>
        {lines}
      </g>
    )
  }
}
