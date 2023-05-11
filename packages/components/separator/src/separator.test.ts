import { describe, expect, it } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { OkuSeparator } from './separator'

describe('OkuSeparator', () => {
  const wrapper = shallowMount(OkuSeparator)

  it('renders correctly', async () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('sets role as separator decorative', async () => {
    expect(wrapper.attributes('role')).toBe('separator')
  })
})
