import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { OkuDismissableLayer } from './DismissableLayer'

describe('DismissableLayer', () => {
  it('should render correctly', () => {
    const wrapper = mount(OkuDismissableLayer)
    expect(wrapper.exists()).toBe(true)
  })
})
