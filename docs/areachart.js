
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
      data.push(random(5, 10))
    }
    this.interval = window.setInterval(() => {
      data = [
        ...data.slice(1),
        random(5, 10)
      ]
      this.area.render(data)
    }, 250)
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount () {
    window.clearInterval(this.interval)
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    const {area} = this.refs
    // get width from parent of svg container
    const width = area.parentNode.getBoundingClientRect().width
    this.area.resize(width)
  }

  render () {
    return (
      <div style={{display: 'flex', alignItems: 'center', margin: 20, height: 200}}>
        <div style={{flex: 1}}>
          <svg ref='area' style={{maxWidth: '100%'}} />
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
    )
  }
}
