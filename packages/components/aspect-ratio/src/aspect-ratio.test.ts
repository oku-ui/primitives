import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { OkuAspectRatio } from './aspect-ratio'

describe('OkuAspectRatio', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(OkuAspectRatio)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('[data-radix-aspect-ratio-wrapper]').exists()).toBe(
      true,
    )
  })

  it('calculates the aspect ratio correctly', () => {
    const ratio = 16 / 9
    const wrapper = mount(OkuAspectRatio, {
      props: {
        ratio,
      },
    })

    const wrapperElement = wrapper.find('[data-radix-aspect-ratio-wrapper]')

    expect(wrapperElement.attributes('style')).toContain(
      `padding-bottom: ${100 / ratio}%`,
    )
  })

  it('updates aspect ratio when the prop changes', async () => {
    const wrapper = mount(OkuAspectRatio, {
      props: {
        ratio: 4 / 3,
      },
    })

    await wrapper.setProps({ ratio: 3 / 2 })

    const wrapperElement = wrapper.find('[data-radix-aspect-ratio-wrapper]')
    const computedStyle = wrapperElement.attributes('style')

    if (!computedStyle)
      throw new Error('No style attribute found')

    const actualRatio = Number.parseFloat(computedStyle.match(/padding-bottom: (.*)%/)?.[1] ?? '0')
    const expectedRatio = 66.6667

    expect(actualRatio).toBeCloseTo(expectedRatio, 4)
  })
})
