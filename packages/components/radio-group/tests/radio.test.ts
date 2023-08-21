import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import type { Component } from 'vue'
import { defineComponent, h } from 'vue'
import { OkuRadioGroup, OkuRadioGroupIndicator, OkuRadioGroupItem } from '../src/'

const testComponent = defineComponent({
  components: {
    OkuRadioGroup,
    OkuRadioGroupItem,
    OkuRadioGroupIndicator,
  },
  template: `
    <OkuRadioGroup default-value="1" class="root-class">

      <OkuRadioGroupItem value="1" class="item-class">
        <OkuRadioGroupIndicator class="indicator-class" />
      </OkuRadioGroupItem>

      <OkuRadioGroupItem value="2" class="item-class">
        <OkuRadioGroupIndicator class="indicator-class" />
      </OkuRadioGroupItem>

      <OkuRadioGroupItem value="3" class="item-class">
        <OkuRadioGroupIndicator class="indicator-class" />
      </OkuRadioGroupItem>

  </OkuRadioGroup>
  `,
})

const component = {
  setup(props, { attrs, slots }) {
    return () => h(OkuRadioGroup, { ...attrs }, slots)
  },
} as Component

describe('OkuRadioGroup', () => {
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
    const wrapper = mount(testComponent)
    expect(wrapper.element).toMatchSnapshot()

    const value2 = wrapper.find('[value="2"]')
    await value2.trigger('click')
    expect(wrapper.element).toMatchSnapshot()

    const value3 = wrapper.find('[value="3"]')
    await value3.trigger('click')
    expect(wrapper.element).toMatchSnapshot()
    expect(value3.classes()).toContain('checked')

    const value1 = wrapper.find('[value="1"]')
    await value1.trigger('click')
    expect(wrapper.element).toMatchSnapshot()
  })
})
