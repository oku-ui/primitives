import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Primitive } from './index'

describe('Primitive', () => {
  it('should render correctly', () => {
    const wrapper = mount(Primitive.div)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('div').exists()).toBe(true)
  })
})
