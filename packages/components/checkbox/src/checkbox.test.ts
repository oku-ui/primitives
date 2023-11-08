import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import type { Component } from 'vue'
import { h, ref } from 'vue'
import { OkuCheckbox } from './checkbox'
import { OkuCheckboxIndicator } from './checkboxIndicator'
import type { CheckedState } from './utils'

const component = {
  setup(props, { attrs, slots }) {
    return () => h(OkuCheckbox, { ...attrs }, slots)
  },
} as Component

const componentVModel = {
  setup(props, { attrs }) {
    const checked = ref<CheckedState>(false)
    return () => h(OkuCheckbox, {
      ...attrs,
      'modelValue': checked.value,
      'onUpdate:modelValue': e => checked.value = e,
    }, {
      default: () => h(OkuCheckboxIndicator),
    })
  },
} as Component

const componentChecked = {
  setup(props, { attrs }) {
    const checked = ref<CheckedState>(false)
    return () => h(OkuCheckbox, {
      ...attrs,
      checked: checked.value,
      onCheckedChange: e => checked.value = e,
    }, {
      default: () => h(OkuCheckboxIndicator),
    })
  },
} as Component

describe('okuCheckbox', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(component)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the component correctly with a label', () => {
    const wrapper = mount(component, {
      slots: {
        default: 'Label',
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('can be checked', async () => {
    const wrapper = mount(componentVModel)
    expect(wrapper.element).toMatchSnapshot()

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.element).toMatchSnapshot()

    await button.trigger('click')

    expect(wrapper.element).toMatchSnapshot()
  })

  it('can be checked with checked prop', async () => {
    const wrapper = mount(componentChecked)
    expect(wrapper.element).toMatchSnapshot()

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.element).toMatchSnapshot()

    await button.trigger('click')

    expect(wrapper.element).toMatchSnapshot()
  })
})
