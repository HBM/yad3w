
import React from 'react'
import {Sparkbar} from '../src/index.js'
import {random} from './utils'

const goldenRatio = 1.61803398875
const height = 25
const width = height * goldenRatio * 3

let bar = []
for (let i = 0; i < 20; i++) {
  bar.push(random())
}

let then
const fps = 5
const fpsInterval = 1000 / fps

export default class SparkbarComponent extends React.Component {
  componentDidMount () {
    // sparkbar
    this.sparkbar = new Sparkbar({
      canvas: this.refs.sparkbar
    })
    this.sparkbar.render(bar)

    then = window.performance.now()
    this.tick()
  }

  componentWillUnmount () {
    window.cancelAnimationFrame(this.raf)
  }

  tick = (newtime) => {
    this.raf = window.requestAnimationFrame(this.tick)

    const now = newtime
    const elapsed = now - then
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval)

      bar.shift()
      bar.push(random())
      this.sparkbar.render(bar)
    }
  }

  render () {
    return (
      <div style={{display: 'flex', alignItems: 'center', margin: 20}}>
        <span style={{width: 80}}>dax</span>
        <canvas height={height} width={width} ref='sparkbar' />
      </div>
    )
  }
}
