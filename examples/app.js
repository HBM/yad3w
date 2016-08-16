
import React from 'react'
import ReactDOM from 'react-dom'
import {LineChart} from '../'

class App extends React.Component {

  state = {
    data: [{x: 0, y: 0}, {x: 1, y: 1}]
  }

  componentDidMount () {
    this.a = new LineChart({
      target: this.a,
      onChange: (data) => {
        this.setState({data})
      }
    })

    this.a.render(this.state.data)
  }

  changeData = () => {
    const data = [{x: 0, y: 1}, {x: 1, y: 0}]
    this.a.update(data)
    this.setState({data})
  }

  render () {
    const x1 = this.state.data[0].x
    const y1 = this.state.data[0].y
    const x2 = this.state.data[1].x
    const y2 = this.state.data[1].y
    const m = (y2 - y1) / (x2 - x1)
    const n = (x2 * y1 - x1 * y2) / x2 - x1
    return (
      <div>
        <svg ref={c => { this.a = c }} />
        <button onClick={this.changeData}>
          Animate
        </button>
        <p>
          2 Punkt Skalierung: {`y=${m}*x + ${n}`}
        </p>
      </div>
    )
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('react')
)
