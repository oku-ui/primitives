import { defineComponent, ref, watchEffect } from 'vue'
import { enableAutoUnmount, mount, shallowMount } from '@vue/test-utils'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { OkuCheckbox, OkuCheckboxIndicator } from '../src'

import Styled from '../stories/Styled.vue'
import Controlled from '../stories/Controlled.vue'
import Indeterminate from '../stories/Indeterminate.vue'
import WithinForm from '../stories/WithinForm.vue'
import Animated from '../stories/Animated.vue'
import Chromatic from '../stories/Chromatic.vue'

enableAutoUnmount(afterEach)

const CHECKBOX_ROLE = 'checkbox'
const INDICATOR_TEST_ID = 'checkbox-indicator'

const onCheckedChange = vi.fn()

const CheckboxTest = defineComponent({
  components: {
    OkuCheckbox,
    OkuCheckboxIndicator,
  },
  props: {
    defaultChecked: Boolean,
    checked: Boolean,
    disabled: Boolean,
  },
  setup() {
    const containerRef = ref<HTMLDivElement | null>(null)
    watchEffect(() => {
      // We use the `hidden` attribute to hide the nested input from both sighted users and the
      // accessibility tree. This is perfectly valid so long as users don't override the display of
      // `hidden` in CSS. Unfortunately axe doesn't recognize this, so we get a violation because the
      // input doesn't have a label. This adds an additional `aria-hidden` attribute to the input to
      // get around that.
      // https://developer.paciellogroup.com/blog/2012/05/html5-accessibility-chops-hidden-and-aria-hidden/
      containerRef.value?.querySelector('input')?.setAttribute('aria-hidden', 'true')
    })

    return {
      containerRef,
      INDICATOR_TEST_ID,
      onCheckedChange,
    }
  },
  template: `
    <div ref="containerRef">
      <OkuCheckbox aria-label="basic checkbox" v-bind="$attrs" @checked-change="onCheckedChange">
        <OkuCheckboxIndicator :data-testid="INDICATOR_TEST_ID" />
      </OkuCheckbox>
    </div>
  `,
})

globalThis.ResizeObserver = class ResizeObserver {
  cb: any
  constructor(cb: any) {
    this.cb = cb
  }

  observe() {
    this.cb([{ borderBoxSize: { inlineSize: 0, blockSize: 0 } }])
  }

  unobserve() {}
  disconnect() {}
}

describe('okuCheckbox', () => {
  let wrapper: VueWrapper
  let checkbox: DOMWrapper<Element>
  // let indicator: DOMWrapper<Element>

  beforeEach(() => {
    wrapper = mount(CheckboxTest, {
      attachTo: document.body,
    })

    checkbox = wrapper.find(`[role="${CHECKBOX_ROLE}"]`)
    // indicator = wrapper.find(`[data-testid="${INDICATOR_TEST_ID}"]`)
  })

  it('should render OkuCheckbox correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()

    expect(shallowMount(OkuCheckbox).html()).toMatchSnapshot()
  })

  it('should render OkuCheckboxIndicator correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => shallowMount(OkuCheckboxIndicator)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()

    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuCheckbox)" not found.')
  })

  /**
   * @vitest-environment jsdom
   */
  it('should have no accessibility violations', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('when clicking the checkbox', () => {
    beforeEach(async () => {
      checkbox.trigger('click')
      // indicator = wrapper.find(`[data-testid="${INDICATOR_TEST_ID}"]`)
    })

    it('should render a visible indicator', () => {
      // expect(indicator.exists()).toBe(true)
      // indicator.exists() ? expect(indicator.isVisible()).toBe(true) : console.error('Indicator not found.')
      expect(wrapper.find(`[data-testid="${INDICATOR_TEST_ID}"]`).isVisible()).toBe(true)
    })

    describe('and clicking the checkbox again', () => {
      beforeEach(async () => {
        checkbox.trigger('click')
      })

      it('should remove the indicator', () => {
        // expect(indicator.exists()).toBe(false)
        // expect(wrapper.find(`[data-testid="${INDICATOR_TEST_ID}"]`).isVisible()).toBe(false)
        expect(wrapper.find(`[data-testid="${INDICATOR_TEST_ID}"]`).exists()).toBe(false)
      })
    })
  })

  describe('given a disabled Checkbox', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
      wrapper = mount(CheckboxTest, {
        props: {
          disabled: false,
        },
        attachTo: document.body,
      })
    })

    /**
     * @vitest-environment jsdom
     */
    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })

  describe('given an uncontrolled `checked` Checkbox', () => {
    let wrapper: VueWrapper
    let checkbox: DOMWrapper<Element>
    let indicator: DOMWrapper<Element>

    // const onCheckedChange = vi.fn()

    beforeEach(() => {
      wrapper = mount(CheckboxTest, {
        props: {
          defaultChecked: true,
        },
        attachTo: document.body,
      })

      checkbox = wrapper.find(`[role="${CHECKBOX_ROLE}"]`)
      indicator = wrapper.find(`[data-testid="${INDICATOR_TEST_ID}"]`)
    })

    /**
     * @vitest-environment jsdom
     */
    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    describe('when clicking the checkbox', () => {
      beforeEach(async () => {
        checkbox.trigger('click')
      })

      it('should remove the indicator', () => {
        expect(indicator.exists()).toBe(false)
      })

      it('should call `onCheckedChange` event', () => {
        expect(onCheckedChange).toHaveBeenCalled()
      })
    })

    describe('given a controlled `checked` Checkbox', () => {
      let wrapper: VueWrapper
      let checkbox: DOMWrapper<Element>

      // const onCheckedChange = vi.fn()

      beforeEach(() => {
        wrapper = mount(CheckboxTest, {
          props: {
            checked: true,
          },
          attachTo: document.body,
        })

        checkbox = wrapper.find(`[role="${CHECKBOX_ROLE}"]`)
      })

      describe('when clicking the checkbox', () => {
        beforeEach(() => {
          checkbox.trigger('click')
        })

        it('should call `onCheckedChange` event', () => {
          expect(onCheckedChange).toHaveBeenCalled()
        })
      })
    })
  })
})

describe('okuCheckbox Stories', () => {
  describe('styled', () => {
    let wrapper: VueWrapper<InstanceType<typeof Styled>>

    beforeEach(async () => {
      wrapper = shallowMount(Styled, {
        attachTo: document.body,
      })
    })

    /**
     * @vitest-environment jsdom
     */
    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('controlled', () => {
    let wrapper: VueWrapper<InstanceType<typeof Controlled>>

    beforeEach(async () => {
      wrapper = shallowMount(Controlled, {
        attachTo: document.body,
      })
    })

    /**
     * @vitest-environment jsdom
     */
    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('indeterminate', () => {
    let wrapper: VueWrapper<InstanceType<typeof Indeterminate>>

    beforeEach(async () => {
      wrapper = shallowMount(Indeterminate, {
        attachTo: document.body,
      })
    })

    /**
     * @vitest-environment jsdom
     */
    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('withinForm', () => {
    let wrapper: VueWrapper<InstanceType<typeof WithinForm>>

    beforeEach(async () => {
      wrapper = shallowMount(WithinForm, {
        attachTo: document.body,
      })
    })

    /**
     * @vitest-environment jsdom
     */
    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('animated', () => {
    let wrapper: VueWrapper<InstanceType<typeof Animated>>

    beforeEach(async () => {
      wrapper = shallowMount(Animated, {
        attachTo: document.body,
      })
    })

    /**
     * @vitest-environment jsdom
     */
    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('chromatic', () => {
    let wrapper: VueWrapper<InstanceType<typeof Chromatic>>

    beforeEach(async () => {
      wrapper = shallowMount(Chromatic, {
        attachTo: document.body,
      })
    })

    /**
     * @vitest-environment jsdom
     */
    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
