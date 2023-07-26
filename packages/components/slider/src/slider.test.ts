import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { OkuSlider } from './Slider'
import { OkuSliderThumb } from './SliderThumb'

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

    // check the slider element
    const slider = wrapper.find('[role="slider"]')
    expect(slider.attributes('aria-valuenow')).toBe('0')
    expect(slider.attributes('aria-valuemin')).toBe('0')
    expect(slider.attributes('aria-valuemax')).toBe('100')

    // change modelValue and check the slider element
    await wrapper.setProps({ modelValue: 2 })
    await wrapper.trigger('keydown', { key: 'ArrowRight' })

    expect(slider.attributes('aria-valuenow')).toBe('2')
  })

  it('should be bound to the slider component', async () => {
    const value = ref(0)
    const onValueChange = vi.fn()

    const wrapper = mount(OkuSlider, {
      props: {
        modelValue: value.value,
        name: 'sliderChange',
        onValueChange,
      },
    })

    const KEYS = [
      'ArrowRight',
      'ArrowUp',
      'ArrowLeft',
      'ArrowDown',
      'End',
      'Home',
      'PageUp',
      'PageDown',
    ]

    const slider = wrapper.find('[role="slider"]')

    // make sure all keys have been bound to the slider component
    for (const key of KEYS)
      await slider.trigger('keydown', { key })

    expect(onValueChange).toBeCalledTimes(8)
  })

  it('should disable the slider when the disabled prop is true', async () => {
    const value = ref(0)

    const wrapper = mount(OkuSlider, {
      props: {
        modelValue: value.value,
        name: 'sliderInput',
        onValueChange: vi.fn(),
        disabled: true,
      },
    })

    // disabled slider
    const slider = wrapper.find('[role="slider"]')
    expect(slider.attributes('aria-disabled')).toBe('true')
    expect(slider.attributes('data-disabled')).toBe('')
  })

  it('should have default min max value', async () => {
    const value = ref(0)

    const wrapper = mount(OkuSlider, {
      props: {
        modelValue: value.value,
        name: 'sliderInput',
        onValueChange: vi.fn(),
      },
    })

    const slider = wrapper.find('[role="slider"]')
    expect(slider.attributes('aria-valuemin')).toBe('0')
    expect(slider.attributes('aria-valuemax')).toBe('100')
  })

  it('shouldn\'t change when disabled attribute has been set', async () => {
    const modelValue = ref(0)
    const htmlTemplate = `
      <OkuSlider v-model="modelValue" :disabled="disabled">
        <OkuSliderThumb />
      </OkuSlider>
    `

    const wrapper = mount({
      components: {
        OkuSlider,
        OkuSliderThumb,
      },
      template: htmlTemplate,
      setup() {
        return { modelValue, disabled: true }
      },
    })

    const thumb = wrapper.find('[role="sliderThumb"]')

    await thumb.trigger('keydown', { key: 'ArrowRight' })
    expect(modelValue.value).toBe(0)
    await thumb.trigger('keydown', { key: 'End' })
    expect(modelValue.value).toBe(0)
    await thumb.trigger('keydown', { key: 'Home' })
    expect(modelValue.value).toBe(0)
  })

  it('should update value when key press', async () => {
    const modelValue = ref(0)
    const htmlTemplate = `
      <OkuSlider v-model="modelValue">
        <OkuSliderThumb />
      </OkuSlider>
    `

    const wrapper = mount({
      components: {
        OkuSlider,
        OkuSliderThumb,
      },
      template: htmlTemplate,
      setup() {
        return { modelValue }
      },
    })

    const thumb = wrapper.find('[role="sliderThumb"]')

    await thumb.trigger('keydown', { key: 'ArrowRight' })
    expect(modelValue.value).toBe(1)
    await thumb.trigger('keydown', { key: 'ArrowUp' })
    expect(modelValue.value).toBe(2)
    await thumb.trigger('keydown', { key: 'ArrowLeft' })
    expect(modelValue.value).toBe(1)
    await thumb.trigger('keydown', { key: 'ArrowDown' })
    expect(modelValue.value).toBe(0)
    await thumb.trigger('keydown', { key: 'PageUp' })
    expect(modelValue.value).toBe(1)
    await thumb.trigger('keydown', { key: 'PageDown' })
    expect(modelValue.value).toBe(0)
    await thumb.trigger('keydown', { key: 'End' })
    expect(modelValue.value).toBe(100)
    await thumb.trigger('keydown', { key: 'Home' })
    expect(modelValue.value).toBe(0)
  })
  it('should work with float step', async () => {
    const modelValue = ref(0)
    const floatStep = 0.2
    const htmlTemplate = `
      <OkuSlider v-model="modelValue" :step="floatStep">
        <OkuSliderThumb />
      </OkuSlider>
    `

    const wrapper = mount({
      components: {
        OkuSlider,
        OkuSliderThumb,
      },
      template: htmlTemplate,
      setup() {
        return { modelValue, floatStep }
      },
    })

    const thumb = wrapper.find('[role="sliderThumb"]')

    await thumb.trigger('keydown', { key: 'ArrowRight' })
    expect(modelValue.value).toBe(1 * floatStep)
    await thumb.trigger('keydown', { key: 'ArrowUp' })
    expect(modelValue.value).toBe(2 * floatStep)
    await thumb.trigger('keydown', { key: 'ArrowLeft' })
    expect(modelValue.value).toBe(1 * floatStep)
    await thumb.trigger('keydown', { key: 'ArrowDown' })
    expect(modelValue.value).toBe(0 * floatStep)
    await thumb.trigger('keydown', { key: 'PageUp' })
    expect(modelValue.value).toBe(1 * floatStep)
    await thumb.trigger('keydown', { key: 'PageDown' })
    expect(modelValue.value).toBe(0 * floatStep)
    await thumb.trigger('keydown', { key: 'End' })
    expect(modelValue.value).toBe(100)
    await thumb.trigger('keydown', { key: 'Home' })
    expect(modelValue.value).toBe(0)
  })

  it('should have correct range', async () => {
    const modelValue = ref(0)
    const min = 10
    const max = 20
    const htmlTemplate = `
      <OkuSlider v-model="modelValue" :min="min" :max="max">
        <OkuSliderThumb />
      </OkuSlider>
    `

    const wrapper = mount({
      components: {
        OkuSlider,
        OkuSliderThumb,
      },
      template: htmlTemplate,
      setup() {
        return { modelValue, min, max }
      },
    })

    const thumb = wrapper.find('[role="sliderThumb"]')

    await thumb.trigger('keydown', { key: 'End' })
    expect(modelValue.value).toBe(max)
    await thumb.trigger('keydown', { key: 'Home' })
    expect(modelValue.value).toBe(min)
  })
})
