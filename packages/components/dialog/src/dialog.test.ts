import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import { h } from 'vue'
import { OkuLabel } from './dialog'

const component = {
  setup(props, { attrs, slots }) {
    return () => h(OkuLabel, { ...attrs }, slots)
  },
} as Component

describe('label', () => {
  it('tag', () => {
    const wrapper = mount(component, {})
    expect(wrapper.html()).equal(`<label>
  <!---->
</label>`)
  })

  it('tag attrs id', () => {
    const wrapper = mount(component, {
      attrs: {
        id: 'test',
      },
    })
    expect(wrapper.html()).equal(`<label id="test">
  <!---->
</label>`)
  })

  it('slot test', () => {
    const wrapper = mount(component, {
      slots: {
        default: 'test',
      },
    })
    expect(wrapper.html()).toContain('<label>test</label>')
  })
})
