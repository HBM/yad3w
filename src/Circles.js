
import React from 'react'

export default class Circles extends React.Component {
  static defaultProps = {
    radius: 5,
    fill: '#000',
    stroke: '#000',
    strokeWidth: 0
  }

  onMouseOver = (event) => {
    this.props.onMouseOver(event)
  }

  onMouseOut = (event) => {
    this.props.onMouseOut(event)
  }

  render () {
    var {data, xScale, yScale} = this.props

    var circles = data.map((d, i) =>
      <circle
        key={i}
        r={this.props.radius}
        cx={xScale(i)}
        cy={yScale(d)}
        fill={this.props.fill}
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeWidth}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      />
    )

    return (
      <g>
        {circles}
      </g>
    )
  }
}
