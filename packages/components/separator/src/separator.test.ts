import { describe, expect, it } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { OkuSeparator } from './separator'

describe('OkuSeparator', () => {
  const wrapper = shallowMount(OkuSeparator)

  it('renders correctly', async () => {
    expect(wrapper).toMatchSnapshot()
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
})
