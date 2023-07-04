import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { OkuPopper } from './popper'

describe('OkuPopper', () => {
  it('renders correctly', () => {
    const wrapper = mount(OkuPopper)
    expect(wrapper.html()).toBe('')
  })

  // it('Active state', () => {
  //   const wrapper = shallowMount(OkuToggle, {
  //     propsData: {
  //       defaultPressed: true,
  //     },
  //   })
  //   expect(wrapper.attributes('aria-pressed')).toBe('true')
  // })

  // it('Inactive state', () => {
  //   const wrapper = shallowMount(OkuToggle, {
  //     propsData: {
  //       defaultPressed: false,
  //     },
  //   })
  //   expect(wrapper.attributes('aria-pressed')).toBe('false')
  // })

  // it('Toggle state', async () => {
  //   const wrapper = mount(OkuToggle, {
  //   })
  //   await wrapper.trigger('click')
  //   expect(wrapper.attributes('aria-pressed')).toBe('true')
  //   await wrapper.trigger('click')
  //   expect(wrapper.attributes('aria-pressed')).toBe('false')
  // })
})
