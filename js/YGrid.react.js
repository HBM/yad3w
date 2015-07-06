'use strict';

var React = require('react');



/**
 * CSS
 */
var style = {
  shapeRendering: 'crispEdges'
};



/**
 * YGrid class
 */
class YGrid extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var {height, xScale, ticks} = this.props;

    var lines = xScale.ticks(ticks).map((d, i) =>
      <line
        key={i}
        x1={xScale(d)}
        y1="0"
        x2={xScale(d)}
        y2={height}
        fill={this.props.fill}
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeWidth}
        style={style}
      />
    );

    return (
      <g>
        {lines}
      </g>
    );

  }

}



/**
 * Default properties
 */
YGrid.defaultProps = {
  ticks: 10,
  fill: 'none',
  stroke: 'lightgrey',
  strokeWidth: '1'
};



module.exports = YGrid;
