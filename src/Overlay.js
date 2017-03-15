
import React from 'react'
import {mouse, customEvent} from 'd3-selection'

export default class Overlay extends React.Component {
  onMouseMove = (event) => {
    var [x, y] = mouse(this.rect)
    var x0 = this.props.xScale.invert(x)
    var y0 = this.props.yScale.invert(y)
    this.props.onMouseMove({
      mouse: [x, y],
      data: [x0, y0]
    })
  }

  render () {
    var {width, height} = this.props

    var style = {
      fill: 'none',
      pointerEvents: 'all'
    }

    return (
      <rect
        ref={c => { this.rect = c }}
        width={width}
        height={height}
        style={style}
        onMouseMove={(event) => {
          customEvent(event.nativeEvent, this.onMouseMove)
        }}
      />
    )
  }
}
