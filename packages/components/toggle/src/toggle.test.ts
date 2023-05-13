import { describe, expect, it } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { OkuToggle } from './toggle'

describe('OkuToggle', () => {
  const wrapper = mount(OkuToggle)

  it('renders correctly', () => {
    expect(wrapper.html()).toBe('<button type="button" aria-pressed="false" data-state="off"></button>')
  })

  it('Active state', () => {
    const wrapper = shallowMount(OkuToggle, {
      propsData: {
        defaultPressed: true,
      },
    })
    expect(wrapper.attributes('aria-pressed')).toBe('true')
  })

  it('Inactive state', () => {
    const wrapper = shallowMount(OkuToggle, {
      propsData: {
        defaultPressed: false,
      },
    })
    expect(wrapper.attributes('aria-pressed')).toBe('false')
  })

  it('Toggle state', async () => {
    const wrapper = mount(OkuToggle, {
    })
    await wrapper.trigger('click')
    expect(wrapper.attributes('aria-pressed')).toBe('true')
    await wrapper.trigger('click')
    expect(wrapper.attributes('aria-pressed')).toBe('false')
  })
})
