'use strict';

var React = require('react');



var styles = {
  d: {
    shapeRendering: 'crispEdges',
    stroke: '#000',
    fill: 'none',
    strokeWidth: '1'
  }
};



/**
 * Axis component
 */
class XAxis extends React.Component {



  /**
   * Property types
   */
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    outerTickSize: React.PropTypes.number
  };



  /**
   * Default properties
   */
  static defaultProps = {
    outerTickSize: 6
  };



  /**
   * Constructor function
   */
  constructor(props) {
    super(props);
  }



  /**
   * Render component
   */
  render() {

    var {data, width, height, outerTickSize, xScale} = this.props;

    var children = React.Children.map(this.props.children, child =>
      React.addons.cloneWithProps(child, {data, xScale})
    );

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



module.exports = XAxis;
