
import React from 'react'

export default class Crosshair extends React.Component {
  static propTypes = {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    horizontal: React.PropTypes.bool,
    vertical: React.PropTypes.bool
  }

  render () {
    const style = {
      shapeRendering: 'crispEdges',
      stroke: '#000',
      fill: 'none',
      strokeWidth: '1'
    }

    var horizontal
    if (this.props.horizontal) {
      horizontal = (
        <line
          x1={0}
          y1={this.props.y}
          x2={this.props.width}
          y2={this.props.y}
          style={style}
        />
      )
    }

    var vertical
    if (this.props.vertical) {
      vertical = (
        <line
          x1={this.props.x}
          y1={0}
          x2={this.props.x}
          y2={this.props.height}
          style={style}
        />
      )
    }

    return (
      <g>
        {horizontal}
        {vertical}
      </g>
    )
  }
}
