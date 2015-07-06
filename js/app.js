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

      </Chart>
    );
  }

}

React.render(
  <App />,
  document.body
);
