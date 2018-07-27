
import React from 'react'
import {Gauge} from '../src/index.js'

let min = 30
let max = 45

const rand = () => Math.random() * (max - min) + min

export default class GaugeComponent extends React.Component {
  componentDidMount () {
    const value = rand()
    this.gauge = new Gauge({
      target: this.refs.svg,
      unit: 'Nm',
      min,
      max,
      value,
      display: value.toFixed(2).replace('.', ',')
    })

    window.setInterval(() => {
      min = 30
      max = 50
      const value = rand()
      this.gauge.update({
        min,
        max,
        value,
        display: value.toFixed(2).replace('.', ',')
      })
    }, 3000)

    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    const {svg} = this.refs
    // get width from parent of svg container
    const rect = svg.parentNode.getBoundingClientRect()
    this.gauge.resize(rect.width, rect.height)
  }

  render () {
    return (
      <div style={{display: 'flex', alignItems: 'center', height: 200}}>
        <div style={{flex: 1}}>
          <svg ref='svg' style={{maxWidth: '100%'}} />
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
