'use strict';

var React = require('react');
var d3 = require('d3');



/**
 * Area component
 */
class Area extends React.Component {

  render() {

    var style = {
      fill: 'steelblue',
      opacity: 0.25
    };

    var area = d3.svg.area()
      .x((d, i) => this.props.xScale(i))
      .y0(this.props.height)
      .y1(d => this.props.yScale(d));

    return (
      <path
        style={style}
        d={area(this.props.data)}
      />
    );
  }

}



/**
 * Export component
 */
module.exports = Area;
