
import React from 'react'

const styles = {
  line: {
    shapeRendering: 'crispEdges',
    stroke: '#000',
    fill: 'none',
    strokeWidth: '1'
  },
  text: {
    textAnchor: 'middle'
  }
}

export default class XTicks extends React.Component {

  static propTypes = {
    data: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    xScale: React.PropTypes.func,
    innerTickSize: React.PropTypes.number,
    tickPadding: React.PropTypes.number
  }

  static defaultProps = {
    innerTickSize: 6,
    tickPadding: 3
  }

  render () {
    var {xScale, innerTickSize, tickPadding} = this.props
    var tickSpacing = Math.max(innerTickSize, 0) + tickPadding

    var ticks = this.props.data.map((d, i) =>
      <g key={i} transform={'translate(' + xScale(i) + ',0)'}>
        <line y2={innerTickSize} x2='0' style={styles.line}></line>
        <text dy='.71em' y={tickSpacing} x='0' style={styles.text}>{i}</text>
      </g>
    )

    return (
      <g>
        {ticks}
      </g>
    )
  }

}
