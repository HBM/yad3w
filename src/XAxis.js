
import React from 'react'

const styles = {
  d: {
    shapeRendering: 'crispEdges',
    stroke: '#000',
    fill: 'none',
    strokeWidth: '1'
  }
}

export default class XAxis extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    outerTickSize: React.PropTypes.number
  }

  static defaultProps = {
    outerTickSize: 6
  }

  render () {
    var {data, width, height, outerTickSize, xScale} = this.props

    var children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {data, xScale})
    )

    return (
      <g transform={'translate(0, ' + height + ')'}>
        {children}
        <path
          d={'M0,' + outerTickSize + 'V0H' + width + 'V' + outerTickSize}
          style={styles.d}
        />
      </g>
    )
  }
}
