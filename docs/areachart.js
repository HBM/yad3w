
import React from 'react'
import {AreaChart} from '../src/index.js'
import {random} from './utils'

export default class LineChartComponent extends React.Component {
  componentDidMount () {
    this.area = new AreaChart({
      target: this.refs.area
    })
    let data = []
    for (let i = 0; i < 100; i++) {
      data.push(random())
    }
    this.interval = window.setInterval(() => {
      data = [
        ...data.slice(1),
        random()
      ]
      this.area.render(data)
    }, 250)
  }

  componentWillUnmount () {
    window.clearInterval(this.interval)
  }

  render () {
    return (
      <svg ref='area' />
    )
  }
}
