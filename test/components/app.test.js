import App from '../../src/pages/brandCauses'
import React from 'react'
import { shallow } from 'enzyme'

it('App exists', () => {
  const wrapper = shallow(<BrandCauses />)
  expect(wrapper.contains(<h3>Brand Causes</h3>)).toEqual(true)
})
