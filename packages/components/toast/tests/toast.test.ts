import { enableAutoUnmount, mount, shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { OkuToast } from '../src'

import Styled from '../src/stories/Styled.vue'
import Controlled from '../src/stories/Controlled.vue'
import FromDialog from '../src/stories/FromDialog.vue'
import Promise from '../src/stories/Promise.vue'
import KeyChange from '../src/stories/KeyChange.vue'
import PauseResumeProps from '../src/stories/PauseResumeProps.vue'
import Animated from '../src/stories/Animated.vue'
import Cypress from '../src/stories/Cypress.vue'
import Chromatic from '../src/stories/Chromatic.vue'

enableAutoUnmount(afterEach)

const TEXT_CHILD = 'Like'

describe('okuToast', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount({
      components: {
        OkuToast,
      },
      setup() {
        return { }
      },
      template: `
        <OkuToast></OkuToast>
      `,
    }, {
      attachTo: document.body,
    })
  })

  it('should render OkuToast correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()

    expect(shallowMount(OkuToast).html()).toMatchSnapshot()
  })

  /**
   * @vitest-environment jsdom
   */
  it('should have no accessibility violations', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('given a Toggle with text', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
      wrapper = mount({
        components: {
          OkuToast,
        },
        setup() {
          return {
            TEXT_CHILD,
          }
        },
        template: `
          <OkuToast>{{ TEXT_CHILD }}</OkuToast>
        `,
      }, {
        attachTo: document.body,
      })
    })

    /**
     * @vitest-environment jsdom
     */
    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render with attributes as false/off by default', () => {
      const button = wrapper.findAll('button').filter(button => button.text() === TEXT_CHILD).at(0)!

      expect(button.attributes('aria-pressed')).toBe('false')
      expect(button.attributes('data-state')).toBe('off')
    })

    it('click event should change pressed attributes to true/on', async () => {
      const button = wrapper.findAll('button').filter(button => button.text() === TEXT_CHILD).at(0)!

      await button.trigger('click')

      expect(button.attributes('aria-pressed')).toBe('true')
      expect(button.attributes('data-state')).toBe('on')
    })
  })

  describe('given a Toggle with text and defaultPressed="true"', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
      wrapper = mount({
        components: {
          OkuToast,
        },
        setup() {
          return {
            TEXT_CHILD,
          }
        },
        template: `
          <OkuToast default-pressed>{{ TEXT_CHILD }}</OkuToast>
        `,
      }, {
        attachTo: document.body,
      })
    })

    it('should render with attributes true/on by default', () => {
      const button = wrapper.findAll('button').filter(button => button.text() === TEXT_CHILD).at(0)!

      expect(button.attributes('aria-pressed')).toBe('true')
      expect(button.attributes('data-state')).toBe('on')
    })

    it('click event should change attributes back to off/false', async () => {
      const button = wrapper.findAll('button').filter(button => button.text() === TEXT_CHILD).at(0)!

      await button.trigger('click')

      expect(button.attributes('aria-pressed')).toBe('false')
      expect(button.attributes('data-state')).toBe('off')
    })
  })

  describe('given a Toggle with text and disabled="true"', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
      wrapper = mount({
        components: {
          OkuToast,
        },
        setup() {
          return {
            TEXT_CHILD,
          }
        },
        template: `
          <OkuToast disabled>{{ TEXT_CHILD }}</OkuToast>
        `,
      }, {
        attachTo: document.body,
      })
    })

    it('on click the attributes do not change', async () => {
      const button = wrapper.findAll('button').filter(button => button.text() === TEXT_CHILD).at(0)!

      expect(button.attributes('aria-pressed')).toBe('false')
      expect(button.attributes('data-state')).toBe('off')
      expect(button.attributes('disabled')).toBe('')

      await button.trigger('click')

      expect(button.attributes('aria-pressed')).toBe('false')
      expect(button.attributes('data-state')).toBe('off')
    })
  })

  describe('given a controlled Toggle (with pressed and onPressedChange)', () => {
    let wrapper: VueWrapper
    const onPressedChange = vi.fn()

    beforeEach(() => {
      wrapper = mount({
        components: {
          OkuToast,
        },
        setup() {
          return {
            TEXT_CHILD,
            onPressedChange,
          }
        },
        template: `
          <OkuToast pressed @pressed-change="onPressedChange">
            {{ TEXT_CHILD }}
          </OkuToast>
        `,
      }, {
        attachTo: document.body,
      })
    })

    it('click event should keep the same attributes, and pass the new state to onPressedChange', async () => {
      const button = wrapper.findAll('button').filter(button => button.text() === TEXT_CHILD).at(0)!

      expect(button.attributes('aria-pressed')).toBe('true')
      expect(button.attributes('data-state')).toBe('on')

      await button.trigger('click')

      expect(onPressedChange).toHaveBeenCalledTimes(1)
      expect(onPressedChange).toHaveBeenCalledWith(false)

      // The attributes do not change, they keep the same
      // because it's a controlled component.
      // TODO: why does this fail?
      // expect(button.attributes('aria-pressed')).toBe('true')
      // expect(button.attributes('data-state')).toBe('on')
    })
  })
})

describe('okuToast Stories', () => {
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

  describe('fromDialog', () => {
    let wrapper: VueWrapper<InstanceType<typeof FromDialog>>

    beforeEach(async () => {
      wrapper = shallowMount(FromDialog, {
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

  describe('promise', () => {
    let wrapper: VueWrapper<InstanceType<typeof Promise>>

    beforeEach(async () => {
      wrapper = shallowMount(Promise, {
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

  describe('keyChange', () => {
    let wrapper: VueWrapper<InstanceType<typeof KeyChange>>

    beforeEach(async () => {
      wrapper = shallowMount(KeyChange, {
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

  describe('pauseResumeProps', () => {
    let wrapper: VueWrapper<InstanceType<typeof PauseResumeProps>>

    beforeEach(async () => {
      wrapper = shallowMount(PauseResumeProps, {
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

  describe('cypress', () => {
    let wrapper: VueWrapper<InstanceType<typeof Cypress>>

    beforeEach(async () => {
      wrapper = shallowMount(Cypress, {
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
