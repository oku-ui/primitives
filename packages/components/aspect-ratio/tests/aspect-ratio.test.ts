import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import type { Component } from 'vue'
import { h } from 'vue'
import { axe } from 'vitest-axe'
import { OkuAspectRatio } from '../src'

const component = {
  setup(props, { attrs, slots }) {
    return () => h(OkuAspectRatio, { ...attrs }, slots)
  },
} as Component

describe('OkuAspectRatio', () => {
  enableAutoUnmount(afterEach)

  it('renders the component correctly', () => {
    const wrapper = mount(component)
    expect(wrapper.exists()).toBe(true)
  })

  /**
  * @vitest-environment jsdom
  */
  it('should have no accessibility violations', async () => {
    const _wrapper = mount(component)
    const results = await axe(_wrapper.element)
    // https:// github.com/capricorn86/happy-dom/issues/978
    // TODO:77 https://github.com/chaance/vitest-axe/issues/7
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(results).toHaveNoViolations()
  })

  it('component render', async () => {
    const wrapper = mount(component)
    expect(wrapper.element).toMatchSnapshot()
  })
})
