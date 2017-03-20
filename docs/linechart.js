
import React from 'react'
import {LineChart} from '../src/index.js'
import {random} from './utils'

export default class LineChartComponent extends React.Component {
  componentDidMount () {
    this.lineChart = new LineChart({
      target: this.refs.lineChart
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
      this.lineChart.render(lineChartData)
    }, 250)
  }

  componentWillUnmount () {
    window.clearInterval(this.interval)
  }

  render () {
    return (
      <div>
        <svg ref='lineChart' />
      </div>
    )
  }
}

