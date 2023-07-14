import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { OkuToggle } from './toggle'

describe('OkuToggle', () => {
  const wrapper = mount(OkuToggle)

  it('renders correctly', () => {
    expect(wrapper.html()).toBe(`<button type="button" data-state="off">
  <!---->
</button>`)
  })

  it('Active state', () => {
    const wrapper: any = mount(OkuToggle, {
      props: {
        'pressed': true,
        'onUpdate:pressed': e => wrapper.setProps({ pressed: e }),
      },
    })

    expect(wrapper.attributes('aria-pressed')).toBe('true')
  })

  it('Inactive state', () => {
    const wrapper: any = mount(OkuToggle, {
      props: {
        'pressed': false,
        'onUpdate:pressed': e => wrapper.setProps({ pressed: e }),
      },
    })
    expect(wrapper.attributes('aria-pressed')).toBe('false')
  })

  it('Toggle state', async () => {
    const wrapper: any = mount(OkuToggle, {
      props: {
        'pressed': false,
        'onUpdate:pressed': e => wrapper.setProps({ pressed: e }),
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.attributes('aria-pressed')).toBe('true')
    await wrapper.trigger('click')
    expect(wrapper.attributes('aria-pressed')).toBe('false')
  })
})
