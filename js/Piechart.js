'use strict';

var React = require('react');
var d3 = require('d3');


/**
 * Piechart component
 */
class Piechart extends React.Component {



  /**
   * Property types
   */
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  };



  /**
   * Default properties
   */
  static defaultProps = {
    width: 960,
    height: 500
  };



  /**
   * Render component
   */
  render() {

    // var radius = Math.min(this.props.width, this.props.height) / 2;
    let {width, height, innerRadius, outerRadius} = this.props;

    // construct new arc generator
    var arc = d3.svg.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);

    // get values from Arc components
    var values = [];
    React.Children.forEach(this.props.children, c => {
      values.push(c.props.value);
    });

    // construct new pie function
    // return function
    var pie = d3.layout.pie()
      .sort(null);

    // evaluate pie function on array of values
    // return array of arc descriptors
    var descriptors = pie(values);

    var children = React.Children.map(this.props.children, (child, index) =>
      React.addons.cloneWithProps(child, {
        descriptor: descriptors[index],
        arc
      })
    );

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          {children}
        </g>
      </svg>
    );
  }

}



/**
 * Export component
 */
module.exports = Piechart;
