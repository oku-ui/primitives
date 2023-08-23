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

describe('OkuCheckbox', () => {
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

    expect(wrapper.html()).toContain('<button type="button" role="checkbox" data-state="unchecked">Label</button>')
  })

  it('can be checked', async () => {
    const wrapper = mount(componentVModel)
    expect(wrapper.html()).toContain(`<button type="button" role="checkbox" aria-checked="false" data-state="unchecked">
  <!---->
</button>`)

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.html()).toContain('<button type="button" role="checkbox" aria-checked="true" data-state="checked"><span data-state="checked" style="pointer-events: none;"><!----></span></button>')

    await button.trigger('click')

    expect(wrapper.html()).toContain(`<button type="button" role="checkbox" aria-checked="false" data-state="unchecked">
  <!---->
</button>`)
  })

  it('can be checked with checked prop', async () => {
    const wrapper = mount(componentChecked)
    expect(wrapper.html()).toContain(`<button type="button" role="checkbox" aria-checked="false" data-state="unchecked">
  <!---->
</button>`)

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.html()).toContain('<button type="button" role="checkbox" aria-checked="true" data-state="checked"><span data-state="checked" style="pointer-events: none;"><!----></span></button>')

    await button.trigger('click')

    expect(wrapper.html()).toContain(`<button type="button" role="checkbox" aria-checked="false" data-state="unchecked">
  <!---->
</button>`)
  })
})
