import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import { h } from 'vue'
import { OkuPortal } from '../'

const component = {
  setup(props, { attrs, slots }) {
    return () => h(OkuPortal, { ...attrs }, slots)
  },
} as Component

describe('okuPortal', () => {
  it('teleports content to the specified container', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const wrapper = mount(component, {
      props: {
        container,
      },
      slots: {
        default: 'Portal Content',
      },
    })

    await wrapper.vm.$nextTick()

    expect(container.innerHTML).toContain('Portal Content')
  })

  it('uses document body as the default container', async () => {
    const wrapper = mount(component, {
      slots: {
        default: 'Portal Content',
      },
    })

    await wrapper.vm.$nextTick()

    expect(document.body.innerHTML).toContain('Portal Content')
  })

  it('renders content as a child when asChild prop is provided', async () => {
    const wrapper = mount(component, {
      props: {
        asChild: true,
      },
      slots: {
        default: 'Portal Content',
      },
    })

    await wrapper.vm.$nextTick()

    expect(document.body.innerHTML).toContain('Portal Content')
  })
})
