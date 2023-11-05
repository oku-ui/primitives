import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import { h } from 'vue'
import { OkuSeparator } from '../src'

const component = {
  setup(props, { attrs, slots }) {
    return () => h(OkuSeparator, { ...attrs }, slots)
  },
} as Component

describe('okuSeparator', () => {
  const wrapper = mount(component)

  it('renders correctly', async () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('sets role as separator without decorative', async () => {
    expect(wrapper.attributes('role')).toBe('separator')
  })

  it('sets default orientation horizontal', async () => {
    expect(wrapper.attributes('data-orientation')).toBe('horizontal')
  })

  it('sets role as none on adding decorative', async () => {
    const wrapper = mount(component, {
      propsData: {
        decorative: true,
      },
    })
    expect(wrapper.attributes('role')).toBe('none')
  })

  it('sets orientation vertical', async () => {
    const wrapper = mount(component, {
      propsData: {
        orientation: 'vertical',
      },
    })
    expect(wrapper.attributes('data-orientation')).toBe('vertical')
  })
})
