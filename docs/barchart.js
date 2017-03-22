
import React from 'react'
import {Barchart} from '../src/index.js'
import {random} from './utils'

let bar = []
for (let i = 0; i < 20; i++) {
  bar.push(random())
}

let then
const fps = 5
const fpsInterval = 1000 / fps

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

    then = window.performance.now()
    this.tick()
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount () {
    window.cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    const {barchart} = this.refs
    // get width from parent of svg container
    const width = barchart.parentNode.getBoundingClientRect().width
    this.barchart.resize(width)
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
      this.barchart.render(bar)
    }
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
