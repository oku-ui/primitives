import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import { h, ref } from 'vue'
import { OkuToggle } from './toggle'

const component = {
  setup(props, { attrs, slots }) {
    return () => h(OkuToggle, { ...attrs }, slots)
  },
} as Component

describe('okuToggle', () => {
  const wrapper = mount(component)

  it('renders correctly', () => {
    expect(wrapper.html()).toBe(`<button type="button" aria-pressed="false" data-state="off">
  <!---->
</button>`)
  })

  it('active state', () => {
    const wrapper = mount(component, {
      propsData: {
        defaultPressed: true,
      },
    })
    expect(wrapper.attributes('aria-pressed')).toBe('true')
  })

  it('inactive state', () => {
    const wrapper = mount(component, {
      propsData: {
        defaultPressed: false,
      },
    })
    expect(wrapper.attributes('aria-pressed')).toBe('false')
  })

  it('toggle state', async () => {
    const wrapper = mount(component, {
    })
    await wrapper.trigger('click')
    expect(wrapper.attributes('aria-pressed')).toBe('true')
    await wrapper.trigger('click')
    expect(wrapper.attributes('aria-pressed')).toBe('false')
  })

  it('v-model', async () => {
    const component = {
      template: `
          <OkuToggle v-model="value" />
        `,
      components: {
        OkuToggle,
      },
      setup() {
        const value = ref(false)
        return {
          value,
        }
      },
    }
    const wrapper = mount(component)
    await wrapper.trigger('click')
    expect(wrapper.attributes('aria-pressed')).toBe('true')
    await wrapper.trigger('click')
    expect(wrapper.attributes('aria-pressed')).toBe('false')
  })
})
