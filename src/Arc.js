
import React from 'react'
import {Motion, spring} from 'react-motion'

export default class Arc extends React.Component {
  static propTypes = {
    value: React.PropTypes.number,
    fill: React.PropTypes.string,
    text: React.PropTypes.string,
    arc: React.PropTypes.func,
    descriptor: React.PropTypes.shape({
      value: React.PropTypes.number,
      startAngle: React.PropTypes.number,
      endAngle: React.PropTypes.number,
      padAngle: React.PropTypes.number,
      data: React.PropTypes.number
    }),
    onMouseOver: React.PropTypes.func,
    onMouseOut: React.PropTypes.func
  }

  render () {
    let {descriptor, fill, arc, text, outerRadius, active} = this.props

    const inline = {
      textAnchor: 'middle',
      alignmentBaseline: 'middle'
    }

    return (
      <Motion style={{val: active ? spring(outerRadius) : spring(outerRadius - 20)}}>
        {style => {
          descriptor.outerRadius = style.val
          return (
            <g onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut}>
              <path d={arc(descriptor)} fill={fill} />
              <text
                dy='0.35em'
                style={inline}
                transform={`translate(${arc.centroid(descriptor)})`}
              >
                {text}
              </text>
            </g>
          )
        }}
      </Motion>

    )
  }
}
