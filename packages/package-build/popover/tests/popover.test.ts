import { afterEach, beforeEach, describe, expect, it, vitest } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import {
  OkuPopover,
  OkuPopoverAnchor,
  OkuPopoverArrow,
  OkuPopoverClose,
  OkuPopoverContent,
  OkuPopoverPortal,
  OkuPopoverTrigger,
} from '@oku-ui/popover'

import Animated from '../stories/Animated.vue'
import Boundary from '../stories/Boundary.vue'
import Controlled from '../stories/Controlled.vue'
import CustomAnchor from '../stories/CustomAnchor.vue'
import ForcedMount from '../stories/ForcedMount.vue'
import Modality from '../stories/Modality.vue'
import Nested from '../stories/Nested.vue'
import VControlled from '../stories/VControlled.vue'
import WithSlottedTrigger from '../stories/WithSlottedTrigger.vue'

enableAutoUnmount(afterEach)

describe('okuPopper', () => {
  it('okuPopover renders correctly', () => {
    const wrapper = mount(OkuPopover)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('okuPopoverAnchor renders correctly', () => {
    const spy = vitest.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuPopoverAnchor)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toMatchSnapshot()
  })

  it('okuPopoverArrow renders correctly', () => {
    const spy = vitest.spyOn(globalThis.console, 'warn').mockImplementation(() => { })

    const wrapper = () => mount(OkuPopoverArrow)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toMatchSnapshot()
  })

  it('okuPopoverClose renders correctly', () => {
    const spy = vitest.spyOn(globalThis.console, 'warn').mockImplementation(() => { })

    const wrapper = () => mount(OkuPopoverClose)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toMatchSnapshot()
  })

  it('okuPopoverContent renders correctly', () => {
    const spy = vitest.spyOn(globalThis.console, 'warn').mockImplementation(() => { })

    const wrapper = () => mount(OkuPopoverContent)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toMatchSnapshot()
  })

  it('okuPopoverPortal renders correctly', () => {
    const spy = vitest.spyOn(globalThis.console, 'warn').mockImplementation(() => { })

    const wrapper = () => mount(OkuPopoverPortal)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toMatchSnapshot()
  })

  it('okuPopoverTrigger renders correctly', () => {
    const spy = vitest.spyOn(globalThis.console, 'warn').mockImplementation(() => { })

    const wrapper = () => mount(OkuPopoverTrigger)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toMatchSnapshot()
  })

  describe('animated', () => {
    let wrapper: VueWrapper<InstanceType<typeof Animated>>

    beforeEach(async () => {
      wrapper = mount(Animated, {
        attachTo: document.body,
      })

      await wrapper.find('[class="popover-trigger"]').trigger('click')
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

  describe('boundary', () => {
    let wrapper: VueWrapper<InstanceType<typeof Boundary>>

    beforeEach(async () => {
      wrapper = mount(Boundary, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
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

  describe('controlled', () => {
    let wrapper: VueWrapper<InstanceType<typeof Controlled>>

    beforeEach(async () => {
      wrapper = mount(Controlled, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
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

  describe('customAnchor', () => {
    let wrapper: VueWrapper<InstanceType<typeof CustomAnchor>>

    beforeEach(async () => {
      wrapper = mount(CustomAnchor, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
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

  describe('forcedMount', () => {
    let wrapper: VueWrapper<InstanceType<typeof ForcedMount>>

    beforeEach(async () => {
      wrapper = mount(ForcedMount, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
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

  describe('modality', () => {
    let wrapper: VueWrapper<InstanceType<typeof Modality>>

    beforeEach(async () => {
      wrapper = mount(Modality, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
      await nextTick()
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

  describe('nested', () => {
    let wrapper: VueWrapper<InstanceType<typeof Nested>>

    beforeEach(async () => {
      wrapper = mount(Nested, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
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

  describe('vControlled', () => {
    let wrapper: VueWrapper<InstanceType<typeof VControlled>>

    beforeEach(async () => {
      wrapper = mount(VControlled, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
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

  describe('withSlottedTrigger', () => {
    let wrapper: VueWrapper<InstanceType<typeof WithSlottedTrigger>>

    beforeEach(async () => {
      wrapper = mount(WithSlottedTrigger, {
        attachTo: document.body,
      })

      await wrapper.find('button').trigger('click')
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
})
