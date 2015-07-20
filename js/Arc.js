'use strict';

var React = require('react');
var {Spring} = require('react-motion');



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
    }),
    onMouseOver: React.PropTypes.func,
    onMouseOut: React.PropTypes.func
  };



  /**
   * Render component
   */
  render() {

    let {descriptor, fill, arc, text, outerRadius, active} = this.props;

    var style = {
      textAnchor: 'middle',
      alignmentBaseline: 'middle'
    };

    return (
      <Spring endValue={{val: active ? outerRadius : outerRadius - 20}}>
        {interpolated => {
          descriptor.outerRadius = interpolated.val;
          return (
            <g onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut}>
              <path d={arc(descriptor)} fill={fill} />
              <text
                dy="0.35em"
                style={style}
                transform={`translate(${arc.centroid(descriptor)})`}
              >
                {text}
              </text>
            </g>
          );
        }}
      </Spring>

    );
  }

}



/**
 * Export component
 */
module.exports = Arc;
