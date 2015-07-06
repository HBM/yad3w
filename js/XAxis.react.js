'use strict';

var React = require('react');
// var d3 = require('d3');


var styles = {
  d: {
    shapeRendering: 'crispEdges',
    stroke: '#000',
    fill: 'none',
    strokeWidth: '1'
  }
};



/**
 * Axis Class
 */
class XAxis extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var {data, width, height, outerTickSize, xScale} = this.props;

    var children = React.Children.map(this.props.children, child =>
      React.addons.cloneWithProps(child, {data, xScale})
    );

    // var test = d3.svg.axis().scale(xScale);

    return (
      <g transform={'translate(0, ' + height + ')'}>
        {children}
        <path
          d={'M0,' + outerTickSize + 'V0H' + width + 'V' + outerTickSize}
          style={styles.d}
        />
      </g>
    );
  }

}



/**
 * Property types.
 */
XAxis.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  outerTickSize: React.PropTypes.number
};



/**
 * Default properties.
 */
XAxis.defaultProps = {
  outerTickSize: 6
};



module.exports = XAxis;
