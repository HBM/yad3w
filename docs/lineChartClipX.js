
import React from 'react'
import {LineChartClipX} from '../src/index.js'
import {random} from './utils'

export default class LineChartClipXComponent extends React.Component {
  componentDidMount () {
    this.chart = new LineChartClipX({
      target: this.refs.svg
    })
    let data = []
    for (let i = 0; i < 20; i++) {
      // data.push(random())
      data.push({
        ts: Date.now() + i * 5 * 1000,
        // value: random()
        value: 5
      })
    }
    this.chart.render(data)

    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    const {svg} = this.refs
    // get width from parent of svg container
    const rect = svg.parentNode.getBoundingClientRect()
    this.chart.resize(rect.width, rect.height)
  }

  render () {
    return (
      <div style={{display: 'flex', alignItems: 'center', height: 500}}>
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
