'use strict';

var React = require('react/addons');
var {linear} = require('d3-scale');
var {max} = require('d3-arrays');



/**
 * Chart component
 */
class Chart extends React.Component {



  /**
   * Property types
   */
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    margin: React.PropTypes.object
  };



  /**
   * Default properties
   */
  static defaultProps = {
    width: 960,
    height: 500,
    margin: {
      top: 20,
      right: 10,
      bottom: 20,
      left: 10
    }
  };



  /**
   * Constructor function
   */
  constructor(props) {
    super(props);
  }



  /**
   * Render component
   */
  render() {

    // get highest value from all data arrays
    var currentMax = 0;
    React.Children.forEach(this.props.children, child => {
      if (child.props.data) {
        var m = max(child.props.data);
        if (m > currentMax) {currentMax = m; }
      }
    });

    var margin = this.props.margin;
    var width = this.props.width - margin.left - margin.right;
    var height = this.props.height - margin.top - margin.bottom;
    var data = this.props.data;

    // x scale
    var xScale = linear()
      .domain([0, data.length])
      .range([0, width]);

    // y scale
    var yScale = linear()
      .domain([0, currentMax])
      .range([height, 0]);

    var children = React.Children.map(this.props.children, child =>
      React.addons.cloneWithProps(child, {
        width,
        height,
        margin,
        data: child.props.data || data,
        xScale,
        yScale
      })
    );

    return (
      <svg
        width={this.props.width}
        height={this.props.height}
      >
          <g transform={'translate(' + margin.left + ', ' + margin.top + ')'}>
            {children}
          </g>
      </svg>
    );
  }

}



/**
 * Export component
 */
module.exports = Chart;
