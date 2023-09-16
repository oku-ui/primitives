import { afterEach, beforeEach, describe, expect, it, test, vitest } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import {
  OkuPopper,
  OkuPopperAnchor,
  OkuPopperArrow,
  OkuPopperContent,
} from '../src'

import StyledVue from '../src/stories/Styled.vue'
import Animated from '../src/stories/Animated.vue'
import OneScroll from '../src/stories/OneScroll.vue'
import Transition from '../src/stories/Transition.vue'
import WithCustomArrow from '../src/stories/WithCustomArrow.vue'
import WithPortal from '../src/stories/WithPortal.vue'

enableAutoUnmount(afterEach)

describe('OkuPopper', () => {
  it('OkuPopper renders correctly', () => {
    const wrapper = mount(OkuPopper)
    expect(wrapper.html()).toBe('')
  })

  it('OkuPopperArrow renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuPopperArrow)
    expect(() => wrapper()).toThrowError('`OkuPopperArrow` must be used within `OkuPopperContent`')
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuPopperContent)" not found.')
  })

  it('OkuPopperAnchor renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuPopperAnchor)
    expect(() => wrapper()).toThrowError('`OkuPopperAnchor` must be used within `OkuPopper`')
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuPopper)" not found.')
  })

  it('OkuPopperAnchor renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuPopperContent)
    expect(() => wrapper()).toThrowError('`OkuPopperContent` must be used within `OkuPopper`')
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuPopper)" not found.')
  })

  describe('StyledVue', () => {
    let wrapper: VueWrapper<InstanceType<typeof StyledVue>>

    beforeEach(async () => {
      wrapper = mount(StyledVue, {
        attachTo: document.body,
      })

      const button = wrapper.find('[class="anchorClass"]')
      button.trigger('click')
      await nextTick()
    })

    /**
    * @vitest-environment jsdom
    */
    it('axe accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('renders correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should be able to close', async () => {
      const button = wrapper.find('button')
      button.trigger('click')
      await nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('Animated', () => {
    let wrapper: VueWrapper<InstanceType<typeof Animated>>

    beforeEach(async () => {
      wrapper = mount(Animated, {
        props: {
          container: document.body,
        },
        attachTo: document.body,
      })

      const button = wrapper.find('[class="anchorClass"]')
      button.trigger('click')
      await nextTick()
    })

    /**
    * @vitest-environment jsdom
    */
    it('axe accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    test('renders correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    test('document.body has correct html', () => {
      expect(document.body.innerHTML).toMatchSnapshot()
    })

    test('should be able to close', async () => {
      const button = document.querySelector('button')
      button?.dispatchEvent(new Event('click'))
      await nextTick()
      expect(document.body.innerHTML).toMatchSnapshot()
    })
  })

  describe('OneScroll', () => {
    let wrapper: VueWrapper<InstanceType<typeof OneScroll>>

    beforeEach(async () => {
      wrapper = mount(OneScroll, {
        attachTo: document.body,
      })
      const button = wrapper.find('[class="anchorClass small"]')
      button.trigger('click')
    })

    /**
    * @vitest-environment jsdom
    */
    it('axe accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    test('renders correctly', () => {
      expect(document.body.innerHTML).toMatchSnapshot()
    })

    test('should be able to close', async () => {
      const button = document.querySelector('button')
      button?.dispatchEvent(new Event('click'))
      await nextTick()
      expect(document.body.innerHTML).toMatchSnapshot()
    })
  })

  describe('Transition', () => {
    let wrapper: VueWrapper<InstanceType<typeof Transition>>

    beforeEach(async () => {
      wrapper = mount(Transition, {
        attachTo: document.body,
      })
      const button = wrapper.find('[class="anchorClass"]')
      button.trigger('click')
      await new Promise(resolve => setTimeout(resolve, 300))
      await nextTick()
    })

    /**
    * @vitest-environment jsdom
    */
    it('axe accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    test('renders correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    test('renders correctly', () => {
      expect(document.body.innerHTML).toMatchSnapshot()
    })

    test('should be able to close', async () => {
      const button = document.querySelector('button')
      button?.click()
      await nextTick()
      // TODO: fix this dont see close button
      expect(document.body.innerHTML).toMatchSnapshot()
    })
  })

  describe('WithCustomArrow', () => {
    let wrapper: VueWrapper<InstanceType<typeof WithCustomArrow>>

    beforeEach(async () => {
      wrapper = mount(WithCustomArrow, {
        attachTo: document.body,
      })
      const button = wrapper.find('[class="anchorClass"]')
      button.trigger('click')
    })

    /**
    * @vitest-environment jsdom
    */
    it('axe accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    test('renders correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('WithPortal', () => {
    let wrapper: VueWrapper<InstanceType<typeof WithPortal>>

    beforeEach(async () => {
      wrapper = mount(WithPortal, {
        attachTo: document.body,
      })

      const button = wrapper.find('[class="anchorClass"]')
      button.trigger('click')
    })

    /**
    * @vitest-environment jsdom
    */
    it('axe accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    test('renders correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
