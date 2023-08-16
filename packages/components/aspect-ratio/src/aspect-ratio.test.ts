import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import type { Component } from 'vue'
import { h } from 'vue'
import { OkuAspectRatio } from './aspect-ratio'

const component = {
  setup(props, { attrs, slots }) {
    return () => h(OkuAspectRatio, { ...attrs }, slots)
  },
} as Component

describe('OkuAspectRatio', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(component)
    expect(wrapper.exists()).toBe(true)
  })

  it('should have no accessibility violations', async () => {
    const _wrapper = mount(component)

    const results = await axe(_wrapper.element)
    // @ts-expect-error toHaveNoViolations add types project
    expect(results).toHaveNoViolations()
  })
})
