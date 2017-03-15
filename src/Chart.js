
import React from 'react'
import {scaleLinear} from 'd3-scale'
import {max} from 'd3-array'

export default class Chart extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    margin: React.PropTypes.object
  }

  static defaultProps = {
    width: 960,
    height: 500,
    margin: {
      top: 20,
      right: 10,
      bottom: 20,
      left: 10
    }
  }

  render () {
    // get highest value from all data arrays
    var currentMax = 0
    React.Children.forEach(this.props.children, child => {
      var m = max(child.props.data || [])
      if (m > currentMax) { currentMax = m }
    })

    var margin = this.props.margin
    var width = this.props.width - margin.left - margin.right
    var height = this.props.height - margin.top - margin.bottom
    var data = this.props.data

    // x scale
    var xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width])

    // y scale
    var yScale = scaleLinear()
      .domain([0, currentMax])
      .range([height, 0])

    var children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        width,
        height,
        margin,
        data: child.props.data || data,
        xScale,
        yScale
      })
    )

    return (
      <svg
        width={this.props.width}
        height={this.props.height}
      >
        <g transform={'translate(' + margin.left + ', ' + margin.top + ')'}>
          {children}
        </g>
      </svg>
    )
  }
}
