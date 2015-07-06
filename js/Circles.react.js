
var React = require('react');
var d3 = require('d3');



class Circles extends React.Component {

  constructor(props) {
    super(props);
  }

  onMouseOver(event) {
    this.props.onMouseOver(event);
  }

  onMouseOut(event) {
    this.props.onMouseOut(event);
  }

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
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
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
 * Default properties.
 */
Circles.defaultProps = {
  radius: 5,
  fill: '#000',
  stroke: '#000',
  strokeWidth: 0
};



module.exports = Circles;
