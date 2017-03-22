
import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Route, Link} from 'react-router-dom'
import LineChartComponent from './linechart'
import SparklineComponent from './sparkline'
import SparkbarComponent from './sparkbar'
import BarChartComponent from './barchart'
import TwoPointScalingComponent from './twoPointScaling'
import LimitSwitchComponent from './limitSwitch'

class App extends React.Component {
  render () {
    return (
      <HashRouter>
        <div style={{display: 'flex'}}>
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
            <li>
              <Link to='/limitswitch'>Limit switch</Link>
            </li>
          </ul>
          <div style={{marginLeft: 50, flex: 1}}>
            <Route exact path='/' component={() => <h1>yad3w</h1>} />
            <Route path='/linechart' component={LineChartComponent} />
            <Route path='/sparkline' component={SparklineComponent} />
            <Route path='/sparkbar' component={SparkbarComponent} />
            <Route path='/barchart' component={BarChartComponent} />
            <Route path='/twopointscaling' component={TwoPointScalingComponent} />
            <Route path='/limitswitch' component={LimitSwitchComponent} />
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
