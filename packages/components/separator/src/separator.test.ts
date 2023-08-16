import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import { h } from 'vue'
import { OkuSeparator } from './separator'

const component = {
  setup(props, { attrs, slots }) {
    return () => h(OkuSeparator, { ...attrs }, slots)
  },
} as Component

describe('OkuSeparator', () => {
  const wrapper = mount(component)

  it('renders correctly', async () => {
    expect(wrapper.html()).toBe(`<div role="separator" data-orientation="horizontal">
  <!---->
</div>`)
  })

  it('renders ref correctly', async () => {
    expect(wrapper.vm.$el.outerHTML).toBe('<div role="separator" data-orientation="horizontal"><!----></div>')
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
