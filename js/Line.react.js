'use strict';

var React = require('react');
var d3 = require('d3');



/**
 * Line component
 */
class Line extends React.Component {



  /**
   * Default properties
   */
  static defaultProps = {
    fill: 'none',
    strokeWidth: 1,
    stroke: 'steelblue'
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

    // line is not yet done
    // https://github.com/mbostock/d3/issues/2461
    var line = d3.svg.line()
      .x((d, i) => this.props.xScale(i))
      .y(d => this.props.yScale(d));

    return (
      <path
        d={line(this.props.data)}
        fill={this.props.fill}
        strokeWidth={this.props.strokeWidth}
        stroke={this.props.stroke}
      />
    );
  }

}



/**
 * Export component
 */
module.exports = Line;
