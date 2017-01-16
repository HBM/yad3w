
import React from 'react'
import ReactDOM from 'react-dom'
import {LineChart, Sparkline, Sparkbar, Barchart, TwoPointScaling} from '../src/'

const goldenRatio = 1.61803398875
const height = 25
const width = height * goldenRatio * 3

const random = () => {
  const min = 0
  const max = 10
  return window.Math.floor(window.Math.random() * (max - min + 1)) + min
}

let data1 = []
for (let i = 0; i < 50; i++) {
  data1.push(random())
}

let data2 = []
for (let i = 0; i < 50; i++) {
  data2.push(random())
}

let data3 = []
for (let i = 0; i < 50; i++) {
  data3.push(random())
}

let bar = []
for (let i = 0; i < 20; i++) {
  bar.push(random())
}

let then
const fps = 5
const fpsInterval = 1000 / fps

class App extends React.Component {

  state = {
    twoPointScaling: [{x: 0.1, y: 0.2}, {x: 0.5, y: 0.7}]
  }

  componentDidMount () {
    this.a = new LineChart({
      target: this.refs.a
    })
    let lineChartData = []
    for (let i = 0; i < 100; i++) {
      lineChartData.push(random())
    }
    this.interval = window.setInterval(() => {
      lineChartData = [
        ...lineChartData.slice(1),
        random()
      ]
      this.a.render(lineChartData)
    }, 250)

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
    // sparkbar
    this.sparkbar = new Sparkbar({
      canvas: this.refs.sparkbar
    })
    this.sparkbar.render(bar)

    // svg barchart
    this.barchart = new Barchart({
      target: this.refs.barchart
    })
    this.barchart.render([0, 1, 2, 3, 5, 3, 4, 2, 1])

    // two point scaling
    this.twoPointScaling = new TwoPointScaling({
      target: this.refs.twoPointScaling,
      clickX: this.onClickX,
      clickY: this.onClickY
    })
    const data = [{x: 0.1, y: 0.2}, {x: 0.5, y: 0.7}]
    this.twoPointScaling.render(data)

    then = window.performance.now()
    this.tick()
  }

  onClickX = (d, i, n) => {
    this.refs[`x${i + 1}`].focus()
  }

  onClickY = (d, i, n) => {
    this.refs[`y${i + 1}`].focus()
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

      bar.shift()
      bar.push(random())
      this.sparkbar.render(bar)
    }
  }

  onChangeTwoPointScaling = (event, index, key) => {
    const {twoPointScaling} = this.state
    twoPointScaling[index][key] = event.target.value
    this.setState({twoPointScaling})
  }

  onSubmit = (event) => {
    event.preventDefault()
    const old = this.state.twoPointScaling
    const v = [
      {
        x: parseFloat(old[0].x),
        y: parseFloat(old[0].y)
      },
      {
        x: parseFloat(old[1].x),
        y: parseFloat(old[1].y)
      }
    ]
    this.twoPointScaling.render(v)
  }

  onFocusTwoPointScaling = (event, point) => {
    this.twoPointScaling.focus(point)
  }

  onBlurTwoPointScaling = (event, point) => {
    this.twoPointScaling.blur(point)
  }

  render () {
    const {twoPointScaling} = this.state
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
        <div style={{display: 'flex', alignItems: 'center', margin: 20}}>
          <span style={{width: 80}}>dax</span>
          <canvas height={height} width={width} ref='sparkbar' />
        </div>
        <div style={{display: 'flex', alignItems: 'center', margin: 20}}>
          <span style={{width: 80}}>bar chart svg</span>
          <svg height={height} width={width} ref='barchart' />
        </div>
        <div style={{display: 'flex', alignItems: 'center', margin: 100}}>
          <span style={{width: 80}}>two point scaling</span>
          <svg height={height} width={width} ref='twoPointScaling' />
        </div>
        <form style={{marginLeft: 100}} onSubmit={this.onSubmit}>
          <div>
            <b>P </b><span>- x1</span>
            <input
              ref='x1'
              placeholder='x1'
              value={twoPointScaling[0].x}
              onChange={(e) => this.onChangeTwoPointScaling(e, 0, 'x')}
              onFocus={(e) => this.onFocusTwoPointScaling(e, 'x1')}
              onBlur={(e) => this.onBlurTwoPointScaling(e, 'x1')}
            />
            <span>
              y1
            </span>
            <input
              ref='y1'
              placeholder='y1'
              value={twoPointScaling[0].y}
              onChange={(e) => this.onChangeTwoPointScaling(e, 0, 'y')}
              onFocus={(e) => this.onFocusTwoPointScaling(e, 'y1')}
              onBlur={(e) => this.onBlurTwoPointScaling(e, 'y1')}
            />
          </div>
          <div>
            <b>Q </b><span>- x2</span>
            <input
              ref='x2'
              placeholder='x2'
              value={twoPointScaling[1].x}
              onChange={(e) => this.onChangeTwoPointScaling(e, 1, 'x')}
              onFocus={(e) => this.onFocusTwoPointScaling(e, 'x2')}
              onBlur={(e) => this.onBlurTwoPointScaling(e, 'x2')}
            />
            <span>
              y2
            </span>
            <input
              ref='y2'
              placeholder='y2'
              value={twoPointScaling[1].y}
              onChange={(e) => this.onChangeTwoPointScaling(e, 1, 'y')}
              onFocus={(e) => this.onFocusTwoPointScaling(e, 'y2')}
              onBlur={(e) => this.onBlurTwoPointScaling(e, 'y2')}
            />
          </div>
          <button type='submit' onClick={this.onSubmit}>
            submit
          </button>
        </form>
      </div>
    )
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('react')
)
