'use strict';

var React = require('react');



var style = {
  shapeRendering: 'crispEdges'
};



/**
 * XGrid component
 */
class XGrid extends React.Component {



  static defaultProps = {
    ticks: 10
  };



  constructor(props) {
    super(props);
  }

  render() {

    var {width, yScale} = this.props;

    var lines = yScale.ticks(this.props.ticks).map((d, i) =>
      <line
        key={i}
        x1="0"
        y1={yScale(d)}
        x2={width}
        y2={yScale(d)}
        fill="none"
        stroke="lightgrey"
        strokeWidth="1"
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



module.exports = XGrid;
