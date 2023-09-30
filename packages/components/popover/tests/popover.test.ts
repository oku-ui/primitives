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
} from '../src'

import Animated from '../src/stories/Animated.vue'
import Boundary from '../src/stories/Boundary.vue'
import Controlled from '../src/stories/Controlled.vue'
import CustomAnchor from '../src/stories/CustomAnchor.vue'
import ForcedMount from '../src/stories/ForcedMount.vue'
import Modality from '../src/stories/Modality.vue'
import Nested from '../src/stories/Nested.vue'
import VControlled from '../src/stories/VControlled.vue'
import WithSlottedTrigger from '../src/stories/WithSlottedTrigger.vue'

enableAutoUnmount(afterEach)

describe('OkuPopper', () => {
  it('OkuPopover renders correctly', () => {
    const wrapper = mount(OkuPopover)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('OkuPopoverAnchor renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuPopoverAnchor)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toMatchSnapshot()
  })

  it('OkuPopoverArrow renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })

    const wrapper = () => mount(OkuPopoverArrow)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toMatchSnapshot()
  })

  it('OkuPopoverClose renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })

    const wrapper = () => mount(OkuPopoverClose)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toMatchSnapshot()
  })

  it('OkuPopoverContent renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })

    const wrapper = () => mount(OkuPopoverContent)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toMatchSnapshot()
  })

  it('OkuPopoverPortal renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })

    const wrapper = () => mount(OkuPopoverPortal)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toMatchSnapshot()
  })

  it('OkuPopoverTrigger renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })

    const wrapper = () => mount(OkuPopoverTrigger)
    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toMatchSnapshot()
  })

  describe('Animated', () => {
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

  describe('Boundary', () => {
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

  describe('Controlled', () => {
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

  describe('CustomAnchor', () => {
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

  describe('ForcedMount', () => {
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

  describe('Modality', () => {
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

  describe('Nested', () => {
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

  describe('VControlled', () => {
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

  describe('WithSlottedTrigger', () => {
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
