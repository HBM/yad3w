'use strict';

var React = require('react');



/**
 * Circle component
 */
class Circles extends React.Component {



  /**
   * Default properties
   */
  static defaultProps = {
    radius: 5,
    fill: '#000',
    stroke: '#000',
    strokeWidth: 0
  };



  /**
   * Constructor function
   */
  constructor(props) {
    super(props);
  }



  /**
   * Handle mouse over event
   */
  onMouseOver(event) {
    this.props.onMouseOver(event);
  }



  /**
   * Handle mouse out event
   */
  onMouseOut(event) {
    this.props.onMouseOut(event);
  }



  /**
   * Render component
   */
  render() {

    var {data, xScale, yScale} = this.props;

    var circles = data.map((d, i) =>
      <circle
        key={i}
        r={this.props.radius}
        cx={xScale(i)}
        cy={yScale(d)}
        fill={this.props.fill}
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeWidth}
        onMouseOver={::this.onMouseOver}
        onMouseOut={::this.onMouseOut}
      />
    );

    return (
      <g>
        {circles}
      </g>
    );
  }

}



/**
 * Export component
 */
module.exports = Circles;
