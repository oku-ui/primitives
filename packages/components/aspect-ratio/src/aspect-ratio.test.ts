import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { OkuAspectRatio } from './aspect-ratio'

describe('OkuAspectRatio', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(OkuAspectRatio)
    expect(wrapper.exists()).toBe(true)
  })

  it('should have no accessibility violations', async () => {
    const _wrapper = mount(OkuAspectRatio)

    const results = await axe(_wrapper.element)
    // @ts-expect-error toHaveNoViolations add types project
    expect(results).toHaveNoViolations()
  })
})
