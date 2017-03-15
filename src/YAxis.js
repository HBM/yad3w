
import React from 'react'

const style = {
  shapeRendering: 'crispEdges'
}

export default class YAxis extends React.Component {
  static defaultProps = {
    outerTickSize: 6,
    stroke: '#000',
    fill: 'none',
    strokeWidth: '1'
  }

  render () {
    var {height, outerTickSize} = this.props

    return (
      <g>
        <path
          d={'M' + -outerTickSize + ',0H0V' + height + 'H' + -outerTickSize}
          stroke={this.props.stroke}
          fill={this.props.fill}
          strokeWidth={this.props.strokeWidth}
          style={style}
        />
      </g>
    )
  }
}
