import { defineComponent, ref, watchEffect } from 'vue'
import { enableAutoUnmount, mount, shallowMount } from '@vue/test-utils'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { OkuRadioGroup, OkuRadioGroupIndicator, OkuRadioGroupItem } from '../src'

import Styled from '../src/stories/Styled.vue'
import Controlled from '../src/stories/Controlled.vue'
import Unset from '../src/stories/Unset.vue'
import WithinForm from '../src/stories/WithinForm.vue'
import Animated from '../src/stories/Animated.vue'
import Chromatic from '../src/stories/Chromatic.vue'

enableAutoUnmount(afterEach)

const INDICATOR_TEST_ID_1 = 'radiogroup-indicator-1'
const INDICATOR_TEST_ID_2 = 'radiogroup-indicator-2'

const onValueChange = vi.fn()

const RadioGroupTest = defineComponent({
  components: {
    OkuRadioGroup,
    OkuRadioGroupItem,
    OkuRadioGroupIndicator,
  },
  props: {
    defaultValue: String,
    value: String,
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
      INDICATOR_TEST_ID_1,
      INDICATOR_TEST_ID_2,
      onValueChange,
    }
  },
  template: `
    <div ref="containerRef">
      <OkuRadioGroup v-bind="$attrs" @value-change="onValueChange">
        <OkuRadioGroupItem aria-label="basic radiogroup" value="1">
          <OkuRadioGroupIndicator :data-testid="INDICATOR_TEST_ID_1" />
        </OkuRadioGroupItem>
        <OkuRadioGroupItem aria-label="basic radiogroup" value="2">
          <OkuRadioGroupIndicator :data-testid="INDICATOR_TEST_ID_2" />
        </OkuRadioGroupItem>
      </OkuRadioGroup>
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

  unobserve() { }
  disconnect() { }
}

describe('okuRadioGroup', () => {
  let wrapper: VueWrapper
  let radio_1: DOMWrapper<Element>
  let radio_2: DOMWrapper<Element>
  // let indicator_2: DOMWrapper<Element>

  beforeEach(() => {
    wrapper = mount(RadioGroupTest, {
      attachTo: document.body,
    })

    radio_1 = wrapper.find('[value="1"]')
    radio_2 = wrapper.find('[value="2"]')

    // indicator_2 = wrapper.find(`[data-testid="${INDICATOR_TEST_ID_2}"]`)
  })

  it('should render OkuRadioGroup correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()

    expect(shallowMount(OkuRadioGroup).html()).toMatchSnapshot()
  })

  it('should render OkuRadioGroupItem correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuRadioGroupItem)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()

    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuRadioGroup)" not found.')
  })

  it('should render OkuRadioGroupIndicator correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuRadioGroupIndicator)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()

    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuRadio)" not found.')
  })

  /**
   * @vitest-environment jsdom
   */
  it('should have no accessibility violations', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('when clicking the radio 2', () => {
    beforeEach(async () => {
      radio_2.trigger('click')
      // indicator_2 = wrapper.find(`[data-testid="${INDICATOR_TEST_ID_2}"]`)
    })

    it('should render a visible indicator', () => {
      expect(wrapper.find(`[data-testid="${INDICATOR_TEST_ID_2}"]`).isVisible()).toBe(true)
    })

    describe('and clicking the radio 1', () => {
      beforeEach(async () => {
        radio_1.trigger('click')
      })

      it('should remove the indicator', () => {
        expect(wrapper.find(`[data-testid="${INDICATOR_TEST_ID_2}"]`).exists()).toBe(false)
      })
    })
  })

  describe('given a disabled Radio', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
      wrapper = mount(RadioGroupTest, {
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

  describe('given an uncontrolled `checked` RadioGroup', () => {
    let wrapper: VueWrapper
    let radio_1: DOMWrapper<Element>
    let indicator_2: DOMWrapper<Element>

    beforeEach(() => {
      wrapper = mount(RadioGroupTest, {
        props: {
          defaultValue: '1',
        },
        attachTo: document.body,
      })

      radio_1 = wrapper.find('[value="1"]')
      radio_2 = wrapper.find('[value="2"]')

      indicator_2 = wrapper.find(`[data-testid="${INDICATOR_TEST_ID_2}"]`)
    })

    /**
     * @vitest-environment jsdom
     */
    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    describe('when clicking the radio', () => {
      beforeEach(async () => {
        radio_1.trigger('click')
      })

      it('should remove the indicator', () => {
        expect(indicator_2.exists()).toBe(false)
      })

      it('should call `onValueChange` event', () => {
        expect(onValueChange).toHaveBeenCalled()
      })
    })

    describe('given a controlled `checked` RadioGroup', () => {
      let wrapper: VueWrapper
      let radio_1: DOMWrapper<Element>

      beforeEach(() => {
        wrapper = mount(RadioGroupTest, {
          props: {
            value: '1',
          },
          attachTo: document.body,
        })

        radio_1 = wrapper.find('[value="1"]')
      })

      describe('when clicking the radio 1', () => {
        beforeEach(() => {
          radio_1.trigger('click')
        })

        it('should call `onValueChange` event', () => {
          expect(onValueChange).toHaveBeenCalled()
        })
      })
    })
  })
})

describe('okuRadioGroup Stories', () => {
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

  describe('unset', () => {
    let wrapper: VueWrapper<InstanceType<typeof Unset>>

    beforeEach(async () => {
      wrapper = shallowMount(Unset, {
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
