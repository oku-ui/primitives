import { afterEach, beforeEach, describe, expect, it, vitest } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import {
  OkuPopper,
  OkuPopperAnchor,
  OkuPopperArrow,
  OkuPopperContent,
} from '@oku-ui/popper'

import StyledVue from '../stories/Styled.vue'
import Animated from '../stories/Animated.vue'
import OneScroll from '../stories/OneScroll.vue'
import Transition from '../stories/Transition.vue'
import WithCustomArrow from '../stories/WithCustomArrow.vue'
import WithPortal from '../stories/WithPortal.vue'

enableAutoUnmount(afterEach)

describe('okuPopper', () => {
  it('okuPopper renders correctly', () => {
    const wrapper = mount(OkuPopper)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('okuPopperArrow renders correctly', () => {
    const spy = vitest.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuPopperArrow)
    expect(() => wrapper()).toThrowError('`OkuPopperArrow` must be used within `OkuPopperContent`')
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuPopperContent)" not found.')
  })

  it('okuPopperAnchor renders correctly', () => {
    const spy = vitest.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuPopperAnchor)
    expect(() => wrapper()).toThrowError('`OkuPopperAnchor` must be used within `OkuPopper`')
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuPopper)" not found.')
  })

  it('okuPopperContent renders correctly', () => {
    const spy = vitest.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuPopperContent)
    expect(() => wrapper()).toThrowError('`OkuPopperContent` must be used within `OkuPopper`')
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuPopper)" not found.')
  })

  describe('styledVue', () => {
    let wrapper: VueWrapper<InstanceType<typeof StyledVue>>

    beforeEach(async () => {
      wrapper = mount(StyledVue, {
        attachTo: document.body,
      })

      await wrapper.find('[class="popper-anchor"]').trigger('click')
      await nextTick()
    })

    /**
     * @vitest-environment jsdom
     */
    it('axe accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('renders correctly', () => {
      expect(document.body).toMatchSnapshot()
    })

    it('should be able to close', async () => {
      const button = wrapper.find('button')
      await button.trigger('click')
      await nextTick()
      expect(document.body).toMatchSnapshot()
    })
  })

  describe('animated', () => {
    let wrapper: VueWrapper<InstanceType<typeof Animated>>

    beforeEach(async () => {
      wrapper = mount(Animated, {
        props: {
          container: document.body,
        },
        attachTo: document.body,
      })

      await wrapper.find('[class="popper-anchor"]').trigger('click')
      await nextTick()
    })

    /**
     * @vitest-environment jsdom
     */
    it('axe accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('renders correctly', () => {
      expect(document.body).toMatchSnapshot()
    })

    it('document.body has correct html', () => {
      expect(document.body).toMatchSnapshot()
    })

    it('should be able to close', async () => {
      const button = document.querySelector('button')
      button?.dispatchEvent(new Event('click'))
      await nextTick()
      expect(document.body).toMatchSnapshot()
    })
  })

  describe('oneScroll', () => {
    let wrapper: VueWrapper<InstanceType<typeof OneScroll>>

    beforeEach(async () => {
      wrapper = mount(OneScroll, {
        attachTo: document.body,
      })
      await wrapper.find('[class="popper-anchor small"]').trigger('click')
    })

    /**
     * @vitest-environment jsdom
     */
    it('axe accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('renders correctly', () => {
      expect(document.body.innerHTML).toMatchSnapshot()
    })

    it('should be able to close', async () => {
      const button = document.querySelector('button')
      button?.dispatchEvent(new Event('click'))
      await nextTick()
      expect(document.body.innerHTML).toMatchSnapshot()
    })
  })

  describe('transition', () => {
    let wrapper: VueWrapper<InstanceType<typeof Transition>>

    beforeEach(async () => {
      wrapper = mount(Transition, {
        attachTo: document.body,
      })
      await wrapper.find('[class="popper-anchor"]').trigger('click')

      await new Promise(resolve => setTimeout(resolve, 300))
      await nextTick()
    })

    /**
     * @vitest-environment jsdom
     */
    it('axe accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('renders correctly', () => {
      expect(document.body).toMatchSnapshot()
    })

    it('renders body innerHTML correctly', () => {
      expect(document.body.innerHTML).toMatchSnapshot()
    })

    it('should be able to close', async () => {
      const button = document.querySelector('button')
      button?.click()
      await nextTick()
      // TODO: fix this dont see close button
      expect(document.body.innerHTML).toMatchSnapshot()
    })
  })

  describe('withCustomArrow', () => {
    let wrapper: VueWrapper<InstanceType<typeof WithCustomArrow>>

    beforeEach(async () => {
      wrapper = mount(WithCustomArrow, {
        attachTo: document.body,
      })
      await wrapper.find('[class="popper-anchor"]').trigger('click')
    })

    /**
     * @vitest-environment jsdom
     */
    it('axe accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('renders correctly', () => {
      expect(document.body).toMatchSnapshot()
    })
  })

  describe('withPortal', () => {
    let wrapper: VueWrapper<InstanceType<typeof WithPortal>>

    beforeEach(async () => {
      wrapper = mount(WithPortal, {
        attachTo: document.body,
      })

      await wrapper.find('[class="popper-anchor"]').trigger('click')
    })

    /**
     * @vitest-environment jsdom
     */
    it('axe accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('renders correctly', () => {
      expect(document.body).toMatchSnapshot()
    })
  })
})
