
import React from 'react'
import {LimitSwitch} from '../src/index.js'
import {random} from './utils'

const goldenRatio = 1.61803398875
const height = 25
const width = height * goldenRatio * 3

export default class LimitSwitchComponent extends React.Component {
  componentDidMount () {
    this.limitSwitch = new LimitSwitch({
      target: this.refs.limitSwitch
    })
    let tmp = []
    for (let i = 0; i < 10; i++) {
      tmp.push(random(0, 10))
    }
    this.limitSwitch.render(tmp)
  }

  render () {
    return (
      <svg height={height} width={width} ref='limitSwitch' />
    )
  }
}
