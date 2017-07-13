
import React from 'react'
import {Barchart} from '../src/index.js'
import {random} from './utils'

export default class BarChartComponent extends React.Component {
  state = {
    bar: []
  }

  componentDidMount () {
    // svg barchart
    const {barchart} = this.refs
    const width = this.refs.barchart.parentNode.getBoundingClientRect().width
    this.barchart = new Barchart({
      target: barchart,
      width
    })
    this.barchart.render(this.state.bar)
    window.setInterval(this.tick, 1000)
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
    const [...bar] = this.state.bar
    if (bar.length === 20) {
      bar.shift()
    }
    bar.push({timestamp: Date.now(), value: random()})
    this.setState({
      bar
    })
    this.barchart.render(bar)
  }

  render () {
    return (
      <div style={{display: 'flex', alignItems: 'center', margin: 20, height: 200}}>
        <div style={{flex: 1}}>
          <svg ref='barchart' style={{maxWidth: '100%'}} />
          <p>
            values: {this.state.bar.length},
            new value: {this.state.bar.length ? this.state.bar[this.state.bar.length - 1].value : ''}
          </p>
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
