'use strict';

var React = require('react');
var d3 = require('d3');



/**
 * Arc component
 */
class Arc extends React.Component {



  /**
   * Property types
   */
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
    })
  };



  /**
   * Render component
   */
  render() {

    let {descriptor, fill, arc, text} = this.props;
    var d = arc(descriptor);

    var style = {
      textAnchor: 'middle',
      alignmentBaseline: 'middle'
    };

    return (
      <g>
        <path ref="path" d={d} fill={fill} />
        <text
          dy="0.35em"
          style={style}
          transform={`translate(${arc.centroid(descriptor)})`}
        >
          {text}
        </text>
      </g>
    );
  }

}



/**
 * Export component
 */
module.exports = Arc;
