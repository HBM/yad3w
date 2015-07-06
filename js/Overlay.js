'use strict';

var React = require('react');
var {mouse} = require('d3-selection');



/**
 * Overlay component
 */
class Overlay extends React.Component {



  /**
   * Handle mouse move event
   */
  onMouseMove(event) {
    var [x, y] = mouse(React.findDOMNode(this), event);
    var x0 = this.props.xScale.invert(x);
    var y0 = this.props.yScale.invert(y);
    this.props.onMouseMove({
      mouse: [x, y],
      data: [x0, y0]
    });
  }



  /**
   * Render component
   */
  render() {

    var {width, height} = this.props;

    var style = {
      fill: 'none',
      pointerEvents: 'all'
    };

    return (
      <rect
        width={width}
        height={height}
        style={style}
        onMouseMove={::this.onMouseMove}
      />
    );
  }

}



/**
 * Export component
 */
module.exports = Overlay;
