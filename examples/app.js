
import React from 'react'
import ReactDOM from 'react-dom'
import {LineChart, Sparkline} from '../'

const goldenRatio = 1.61803398875
const height = 25
const width = height * goldenRatio * 3

let data1 = []
for (let i = 0; i < 50; i++) {
  data1.push(random)
}

let data2 = []
for (let i = 0; i < 50; i++) {
  data2.push(random)
}

let data3 = []
for (let i = 0; i < 50; i++) {
  data3.push(random)
}

const random = () => {
  const min = 0
  const max = 10
  return window.Math.floor(window.Math.random() * (max - min + 1)) + min
}

let then
const fps = 5
const fpsInterval = 1000 / fps

class App extends React.Component {

  componentDidMount () {
    this.a = new LineChart({
      target: this.refs.a
    })
    this.bus1 = new Sparkline({
      canvas: this.refs.bus1
    })
    this.bus1.render(data1)

    this.bus2 = new Sparkline({
      canvas: this.refs.bus2
    })
    this.bus2.render(data2)

    this.bus3 = new Sparkline({
      canvas: this.refs.bus3
    })
    this.bus3.render(data3)

    then = window.performance.now()
    this.tick()
  }

  componentWillUnmount () {
    window.cancelAnimationFrame(this.raf)
  }

  // single argument, a DOMHighResTimeStamp, which indicates the current time
  // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  tick = (newtime) => {
    this.raf = window.requestAnimationFrame(this.tick)

    const now = newtime
    const elapsed = now - then
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval)

      data1.shift()
      data1.push(random())
      this.bus1.render(data1)

      data2.shift()
      data2.push(random())
      this.bus2.render(data2)

      data3.shift()
      data3.push(random())
      this.bus3.render(data3)
    }
  }

  render () {
    return (
      <div>
        <svg ref='a' />
        <div style={{display: 'flex', alignItems: 'center', margin: 20}}>
          <span style={{width: 80}}>dow jones</span>
          <canvas height={height} width={width} ref='bus1' />
        </div>
        <div style={{display: 'flex', alignItems: 'center', margin: 20}}>
          <span style={{width: 80}}>nasdaq</span>
          <canvas height={height} width={width} ref='bus2' />
        </div>
        <div style={{display: 'flex', alignItems: 'center', margin: 20}}>
          <span style={{width: 80}}>dax</span>
          <canvas height={height} width={width} ref='bus3' />
        </div>
      </div>
    )
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('react')
)
