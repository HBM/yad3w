
var React = require('react');
var d3 = require('d3');



/**
 * Line Class
 */
class Line extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

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
 * Default properties
 */
Line.defaultProps = {
  fill: 'none',
  strokeWidth: 1,
  stroke: 'steelblue'
};



module.exports = Line;
