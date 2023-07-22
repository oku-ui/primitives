import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { OkuVisuallyHidden } from '.'

describe('OkuVisuallyHidden', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(OkuVisuallyHidden)
    expect(wrapper.exists()).toBe(true)

    expect(wrapper.element.tagName.toLowerCase()).toBe('span')

    const style = wrapper.element.getAttribute('style')
    expect(style).toBe(
      'position: absolute; border: 0px; padding: 0px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; word-wrap: normal;',
    )

    // The component should have a ref named 'innerRef'
    expect(wrapper.vm.innerRef).toBeDefined()
    expect(wrapper.vm.innerRef.tagName.toLowerCase()).toBe('span')
  })

  it('applies ref correctly', () => {
    const wrapper = mount(OkuVisuallyHidden)
    expect(wrapper.vm.innerRef).toBeDefined()
    expect(wrapper.vm.innerRef.tagName.toLowerCase()).toBe('span')
  })

  it('renders correctly with custom style', () => {
    const style = {
      background: 'red',
      color: 'white',
    }

    const wrapper = mount(OkuVisuallyHidden, {
      attrs: {
        style,
      },
    })

    const inlineStyle = wrapper.element.getAttribute('style')
    expect(inlineStyle).toContain('position: absolute;')
    expect(inlineStyle).toContain('border: 0px;')
    expect(inlineStyle).toContain('overflow: hidden;')
    expect(inlineStyle).toContain('white-space: nowrap;')
    expect(inlineStyle).toContain('word-wrap: normal;')
    expect(inlineStyle).toContain('background: red;')
    expect(inlineStyle).toContain('color: white;')
  })
})
