
import React from 'react'
import {mount} from 'enzyme'
import {Chart} from '../'

describe('Arc', () => {
  it('should work', () => {
    const data = [0, 1, 1, 2, 3, 5, 8]
    const wrapper = mount(<Chart data={data} />)
    expect(wrapper.find('svg').length).toBe(1)
  })
})
