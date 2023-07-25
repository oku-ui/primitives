import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { OkuSlider } from './Slider'

describe('OkuSlider', () => {
  it('should render correctly', async () => {
    const value = ref(0)

    const wrapper = mount(OkuSlider, {
      props: {
        modelValue: value.value,
        name: 'sliderInput',
        onValueChange: vi.fn(),
      },
    })

    const slider = wrapper.find('[role="slider"]')
    expect(slider.attributes('aria-valuenow')).toBe('0')
    expect(slider.attributes('aria-valuemin')).toBe('0')
    expect(slider.attributes('aria-valuemax')).toBe('100')
    expect(slider.attributes('aria-hidden')).toBe('false')

    await wrapper.setProps({ modelValue: 2 })
    await wrapper.trigger('input')

    expect(slider.attributes('aria-valuenow')).toBe('2')
  })

  it('should call the onSliderStart prop when the slider is inputed', async () => {
    const value = ref(0)
    const onValueChange = vi.fn()

    const wrapper = mount(OkuSlider, {
      props: {
        modelValue: value.value,
        name: 'sliderChange',
        onValueChange,
      },
    })

    const slider = wrapper.find('[role="slider"]')

    await slider.trigger('input')

    expect(onValueChange).toHaveBeenCalled()
  })
})
