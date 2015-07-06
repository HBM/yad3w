
var React = require('react');



/**
 * CSS
 */
var style = {
  shapeRendering: 'crispEdges'
};



/**
 * YAxis
 */
class YAxis extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var {height, outerTickSize} = this.props;

    return (
      <g>
        <path
          d={'M' + -outerTickSize + ',0H0V' + height + 'H' + -outerTickSize}
          stroke={this.props.stroke}
          fill={this.props.fill}
          strokeWidth={this.props.strokeWidth}
          style={style}
        />
      </g>
    );

  }

}



/**
 * Default properties
 */
YAxis.defaultProps = {
  outerTickSize: 6,
  stroke: '#000',
  fill: 'none',
  strokeWidth: '1'
};



module.exports = YAxis;
