'use strict';

var React = require('react');
var Chart = require('./Chart.react');
var Line = require('./Line.react');
var Circles = require('./Circles.react');
var XAxis = require('./XAxis.react');
var XTicks = require('./XTicks.react.js');
var YAxis = require('./YAxis.react');
var XGrid = require('./XGrid.react.js');
var YGrid = require('./YGrid.react.js');
var Overlay = require('./Overlay');
var Crosshair = require('./Crosshair');

var data = [10, 5, 20, 16, 30, 51, 40, 19, 50];



/**
 * App component
 */
class App extends React.Component {



  /**
   * Constructor function
   */
  constructor(props) {
    super(props);

    this.state = {
      mouse: [0, 0]
    };
  }



  /**
   * Handle mouse over circle
   */
  onMouseOver(event) {
    event.target.setAttribute('r', 12);
  }



  /**
   * Handle mouse out circle
   */
  onMouseOut(event) {
    event.target.setAttribute('r', 10);
  }



  onMouseMove(coords) {
    this.setState({
      mouse: coords.mouse
    });
  }



  /**
   * Render component
   */
  render() {
    return (
      <Chart data={data}>

        <XGrid ticks="10"/>

        <YGrid ticks="15" />

        <XAxis>
          <XTicks />
        </XAxis>

        <YAxis />

        <Line
          strokeWidth="2"
        />

        <Overlay
          onMouseMove={::this.onMouseMove}
        />

        <Circles
          radius="10"
          fill="orange"
          onMouseOver={::this.onMouseOver}
          onMouseOut={::this.onMouseOut}
        />

        <Line
          data={[1, 10, 7, 30, 20, 60, 35]}
          stroke="red"
          strokeWidth="2">
        </Line>

        <Crosshair
          x={this.state.mouse[0]}
          y={this.state.mouse[1]}
          horizontal={true}
          vertical={true}
        />

      </Chart>
    );
  }

}



/**
 * Render app
 */
React.render(
  <App />,
  document.getElementById('react')
);
