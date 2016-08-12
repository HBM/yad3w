
import React from 'react'
import ReactDOM from 'react-dom'
import {LineChart} from '../'
// import {
//   Chart,
//   Line,
//   Circles,
//   XAxis,
//   XTicks,
//   YAxis,
//   XGrid,
//   YGrid,
//   Overlay,
//   Crosshair,
//   Area,
//   Piechart,
//   Arc
// } from '../'
// import {scaleOrdinal, schemeCategory10} from 'd3-scale'

// const data = [10, 5, 20, 16, 30, 51, 40, 19, 50]
// var newData = [9, 4, 19, 15, 29, 50, 39, 18, 49]

const gen = n => {
  const data = []

  for (var i = 0; i < n; i++) {
    data.push({
      time: new Date(Date.now() - (i * 3600000)),
      value: Math.max(250, Math.random() * 3000 | 0)
    })
  }

  return data
}

class App extends React.Component {

  componentDidMount () {
    this.a = new LineChart({
      target: this.a
    })

    this.a.render(gen(12))
  }

  changeData = () => {
    this.a.update(gen(12))
  }

  render () {
    return (
      <div>
        <svg ref={c => { this.a = c }} />
        <button onClick={this.changeData}>
          Animate
        </button>
      </div>
    )
  }

}

// class App extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       mouse: [0, 0],
//       active: false
//     }
//   }
//   onCircleMouseOver = (event) => {
//     event.target.setAttribute('r', 12)
//   }
//   onCircleMouseOut = (event) => {
//     event.target.setAttribute('r', 10)
//   }
//   onCircleDrag = () => {
//     console.log('drag')
//   }
//   onMouseMove = (coords) => {
//     this.setState({
//       mouse: coords.mouse
//     })
//   }
//   onMouseOverArc = () => {
//     this.setState({
//       active: true
//     })
//   }
//   onMouseOutArc = () => {
//     this.setState({
//       active: false
//     })
//   }
//   render () {
//     var color = scaleOrdinal(schemeCategory10)
//     var width = 960
//     var height = 500
//     var outerRadius = height / 2 - 20
//     var innerRadius = outerRadius / 3
//     return (
//       <div>
//         <Piechart width={width} height={height} innerRadius={innerRadius} outerRadius={outerRadius}>
//           <Arc
//             value={20}
//             fill={color(0)}
//             text='London'
//             onMouseOver={this.onMouseOverArc}
//             onMouseOut={this.onMouseOutArc}
//             active={this.state.active}
//           />
//           <Arc value={10} fill={color(1)} text='Berlin' />
//           <Arc value={50} fill={color(2)} text='Munich' />
//         </Piechart>
//         <Chart data={data}>
//           <XGrid ticks='10' />
//           <YGrid ticks='15' />
//           <XAxis>
//             <XTicks />
//           </XAxis>
//           <YAxis />
//           <Line
//             strokeWidth='2'
//           />
//           <Area />
//           <Overlay
//             onMouseMove={this.onMouseMove}
//           />
//           <Circles
//             radius='10'
//             fill='orange'
//             onMouseOver={this.onCircleMouseOver}
//             onMouseOut={this.onCircleMouseOut}
//             onDrag={this.onCircleDrag}
//           />
//           <Line
//             data={[1, 10, 7, 30, 20, 60, 35]}
//             stroke='red'
//             strokeWidth='2'
//           />
//           <Crosshair
//             x={this.state.mouse[0]}
//             y={this.state.mouse[1]}
//             horizontal
//             vertical
//           />
//         </Chart>
//       </div>
//     )
//   }
// }

ReactDOM.render(
  <App />,
  document.getElementById('react')
)
