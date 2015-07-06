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

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  onMouseOver(event) {
    event.target.setAttribute('r', 12);
  }

  onMouseOut(event) {
    event.target.setAttribute('r', 10);
  }

  render() {
    return (
      <Chart data={data}>

        <XGrid
          ticks="10"
        />

        <YGrid
          ticks="15"
        />

        <XAxis>
          <XTicks />
        </XAxis>

        <YAxis>
        </YAxis>

        <Line
          strokeWidth="2"
        />

        <Circles
          radius="10"
          fill="orange"
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}
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
