
import React from 'react'
import {Barchart} from '../src/index.js'
import {random} from './utils'

let bar = []
for (let i = 0; i < 20; i++) {
  bar.push({timestamp: Date.now() - (19 - i) * 500, value: 0})
}

export default class BarChartComponent extends React.Component {
  componentDidMount () {
    // svg barchart
    const {barchart} = this.refs
    const width = this.refs.barchart.parentNode.getBoundingClientRect().width
    this.barchart = new Barchart({
      target: barchart,
      width
    })
    this.barchart.render(bar)
    window.setInterval(this.tick, 500)
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount () {
    window.clearInterval(this.tick)
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    const {barchart} = this.refs
    // get width from parent of svg container
    const width = barchart.parentNode.getBoundingClientRect().width
    this.barchart.resize(width)
  }

  tick = () => {
    bar.shift()
    bar.push({timestamp: Date.now(), value: random()})
    this.barchart.render(bar)
  }

  render () {
    return (
      <div style={{display: 'flex', alignItems: 'center', margin: 20, height: 200}}>
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
    )
  }
}
