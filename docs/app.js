
import React from 'react'
import ReactDOM from 'react-dom'
import {
  LineChart,
  Sparkline,
  Sparkbar,
  Barchart,
  TwoPointScaling,
  LimitSwitch
} from '../src/index.js'
import {HashRouter, Route, Link} from 'react-router-dom'
import LineChartComponent from './linechart'
import SparklineComponent from './sparkline'
import {random} from './utils'

const goldenRatio = 1.61803398875
const height = 25
const width = height * goldenRatio * 3

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
    // sparkbar
    this.sparkbar = new Sparkbar({
      canvas: this.refs.sparkbar
    })
    this.sparkbar.render(bar)

    // svg barchart
    const {barchart} = this.refs
    const width = this.refs.barchart.parentNode.getBoundingClientRect().width
    this.barchart = new Barchart({
      target: barchart,
      width
    })
    this.barchart.render(bar)

    // two point scaling
    this.twoPointScaling = new TwoPointScaling({
      target: this.refs.twoPointScaling,
      clickX: this.onClickX,
      clickY: this.onClickY
    })
    const data = [{x: 0.1, y: 0.2}, {x: 0.5, y: 0.7}]
    this.twoPointScaling.render(data)

    // limit switch
    this.limitSwitch = new LimitSwitch({
      target: this.refs.limitSwitch
    })
    // const tmp = range(1000).map(val => Math.sin(val / 100))
    let tmp = []
    for (let i = 0; i < 10; i++) {
      tmp.push(random())
    }
    this.limitSwitch.render(tmp)

    then = window.performance.now()
    this.tick()
    window.addEventListener('resize', this.resize)
  }

  onClickX = (d, i, n) => {
    this.refs[`x${i + 1}`].focus()
  }

  onClickY = (d, i, n) => {
    this.refs[`y${i + 1}`].focus()
  }

  resize = () => {
    const {barchart} = this.refs
    // get width from parent of svg container
    const width = barchart.parentNode.getBoundingClientRect().width
    this.barchart.resize(width)
  }

  componentWillUnmount () {
    window.cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.resize)
  }

  // single argument, a DOMHighResTimeStamp, which indicates the current time
  // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  tick = (newtime) => {
    this.raf = window.requestAnimationFrame(this.tick)

    const now = newtime
    const elapsed = now - then
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval)

      bar.shift()
      bar.push(random())
      this.sparkbar.render(bar)
      this.barchart.render(bar)
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
      <HashRouter>
        <div>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/linechart'>Line chart</Link>
            </li>
            <li>
              <Link to='/sparkline'>Sparkline</Link>
            </li>
          </ul>
          <Route path='/linechart' component={LineChartComponent} />
          <Route path='/sparkline' component={SparklineComponent} />
          <div style={{display: 'flex', alignItems: 'center', margin: 20}}>
            <span style={{width: 80}}>dax</span>
            <canvas height={height} width={width} ref='sparkbar' />
          </div>
          <div style={{display: 'flex', alignItems: 'center', margin: 20, height: 200}}>
            <span style={{width: 80}}>bar chart svg</span>
            <div style={{flex: 1}}>
              <svg ref='barchart' style={{maxWidth: '100%'}} />
            </div>
            <div style={{
              background: '#eee',
              height: '100%',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              flex container for responsive test
            </div>
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
            <div style={{display: 'flex', alignItems: 'center', margin: 100}}>
              <span style={{width: 80}}>limit switch</span>
              <svg height={height} width={width} ref='limitSwitch' />
            </div>
          </form>
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react')
)
