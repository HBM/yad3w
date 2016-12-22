/* global describe, it, expect */

// import React from 'react'
// import {mount} from 'enzyme'
import assert from 'assert'
import jsdom from 'jsdom'
import {TwoPointScaling} from '../'

describe('two point scaling', () => {
  it('should work', () => {
    assert(1, 1)
  })

  it('awesome', (done) => {
    jsdom.env({
      html: '<html><body><svg height="100" width="100" id="app"></svg></body></html>',
      done: (err, window) => {
        if (err) {throw err}
        const tps = new TwoPointScaling({
          target: '#app'
        })
        const data = [{x: 0.1, y: 0.2}, {x: 0.5, y: 0.7}]
        tps.render(data)
        console.log(window.document.documentElement.innerHTML)
        done()
      }
    })
  })
})
