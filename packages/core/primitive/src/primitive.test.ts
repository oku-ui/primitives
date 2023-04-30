import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Primitive } from './index'

describe('Primitive', () => {
  it('should render correctly', () => {
    const wrapper = mount(Primitive.div)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('renders an anchor with href attribute', () => {
    const wrapper = mount(Primitive.a, {
      attrs: {
        href: 'https://example.com',
      },
      slots: {
        default: 'Visit Example.com',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('https://example.com')
    expect(wrapper.text()).toBe('Visit Example.com')
  })
})
