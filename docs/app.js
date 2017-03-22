
import React from 'react'
import ReactDOM from 'react-dom'
import {
  LimitSwitch
} from '../src/index.js'
import {HashRouter, Route, Link} from 'react-router-dom'
import LineChartComponent from './linechart'
import SparklineComponent from './sparkline'
import SparkbarComponent from './sparkbar'
import BarChartComponent from './barchart'
import TwoPointScalingComponent from './twoPointScaling'
import {random} from './utils'

const goldenRatio = 1.61803398875
const height = 25
const width = height * goldenRatio * 3

class App extends React.Component {
  componentDidMount () {
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
  }

  render () {
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
            <li>
              <Link to='/sparkbar'>Sparkbar</Link>
            </li>
            <li>
              <Link to='/barchart'>Bar chart</Link>
            </li>
            <li>
              <Link to='/twopointscaling'>Two point scaling</Link>
            </li>
          </ul>
          <Route path='/linechart' component={LineChartComponent} />
          <Route path='/sparkline' component={SparklineComponent} />
          <Route path='/sparkbar' component={SparkbarComponent} />
          <Route path='/barchart' component={BarChartComponent} />
          <Route path='/twopointscaling' component={TwoPointScalingComponent} />
          <div style={{display: 'flex', alignItems: 'center', margin: 100}}>
            <span style={{width: 80}}>limit switch</span>
            <svg height={height} width={width} ref='limitSwitch' />
          </div>
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react')
)
