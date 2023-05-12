import { describe, expect, it } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { OkuSeparator } from './separator'

describe('OkuSeparator', () => {
  const wrapper = mount(OkuSeparator)

  it('renders correctly', async () => {
    expect(wrapper.html()).toBe(`<div role="separator" data-orientation="horizontal">
  <!---->
</div>`)
  })

  it('renders ref correctly', async () => {
    // TODO: outerHTML is not available on VueWrapper
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(wrapper.vm.innerRef.outerHTML).toBe('<div role="separator" data-orientation="horizontal"><!----></div>')
  })

  it('sets role as separator without decorative', async () => {
    expect(wrapper.attributes('role')).toBe('separator')
  })

  it('sets default orientation horizontal', async () => {
    expect(wrapper.attributes('data-orientation')).toBe('horizontal')
  })

  it('sets role as none on adding decorative', async () => {
    const wrapper = shallowMount(OkuSeparator, {
      propsData: {
        decorative: true,
      },
    })
    expect(wrapper.attributes('role')).toBe('none')
  })

  it('sets orientation vertical', async () => {
    const wrapper = shallowMount(OkuSeparator, {
      propsData: {
        orientation: 'vertical',
      },
    })
    expect(wrapper.attributes('data-orientation')).toBe('vertical')
  })
})
