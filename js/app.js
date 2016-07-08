
import React from 'react'
import ReactDOM from 'react-dom'
import Chart from './Chart'
import Line from './Line'
import Circles from './Circles'
import XAxis from './XAxis'
import XTicks from './XTicks'
import YAxis from './YAxis'
import XGrid from './XGrid'
import YGrid from './YGrid'
import Overlay from './Overlay'
import Crosshair from './Crosshair'
import Area from './Area'
import Piechart from './Piechart'
import Arc from './Arc'
import {scaleOrdinal, schemeCategory10} from 'd3-scale'

var data = [10, 5, 20, 16, 30, 51, 40, 19, 50]

class App extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      mouse: [0, 0],
      active: false
    }
  }

  onMouseOver = (event) => {
    event.target.setAttribute('r', 12)
  }

  onMouseOut = (event) => {
    event.target.setAttribute('r', 10)
  }

  onMouseMove = (coords) => {
    this.setState({
      mouse: coords.mouse
    })
  }

  onMouseOverArc = () => {
    this.setState({
      active: true
    })
  }

  onMouseOutArc = () => {
    this.setState({
      active: false
    })
  }

  render () {
    var color = scaleOrdinal(schemeCategory10)

    var width = 960
    var height = 500
    var outerRadius = height / 2 - 20
    var innerRadius = outerRadius / 3

    return (
      <div>
        <Piechart width={width} height={height} innerRadius={innerRadius} outerRadius={outerRadius}>
          <Arc
            value={20}
            fill={color(0)}
            text='London'
            onMouseOver={this.onMouseOverArc}
            onMouseOut={this.onMouseOutArc}
            active={this.state.active}
          />
          <Arc value={10} fill={color(1)} text='Berlin' />
          <Arc value={50} fill={color(2)} text='Munich' />
        </Piechart>
        <Chart data={data}>
          <XGrid ticks='10' />
          <YGrid ticks='15' />
          <XAxis>
            <XTicks />
          </XAxis>
          <YAxis />
          <Line
            strokeWidth='2'
          />
          <Area />
          <Overlay
            onMouseMove={this.onMouseMove}
          />
          <Circles
            radius='10'
            fill='orange'
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
          />
          <Line
            data={[1, 10, 7, 30, 20, 60, 35]}
            stroke='red'
            strokeWidth='2'
          />
          <Crosshair
            x={this.state.mouse[0]}
            y={this.state.mouse[1]}
            horizontal
            vertical
          />
        </Chart>
      </div>
    )
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('react')
)
