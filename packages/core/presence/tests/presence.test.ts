import { beforeEach, describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'

import {
  OkuPresence,
} from '../src'

import Basic from '../src/stories/Basic.vue'
import WithDeferredMountAnimation from '../src/stories/WithDeferredMountAnimation.vue'
import WithMountAnimation from '../src/stories/WithMountAnimation.vue'
import WithMultipleMountAnimations from '../src/stories/WithMultipleMountAnimations.vue'
import WithMultipleOpenAndCloseAnimations from '../src/stories/WithMultipleOpenAndCloseAnimations.vue'
import WithOpenAndCloseAnimation from '../src/stories/WithOpenAndCloseAnimation.vue'
import WithUnmountAnimation from '../src/stories/WithUnmountAnimation.vue'

describe('OkuPresence', async () => {
  it('renders correctly', async () => {
    const wrapper = mount(OkuPresence)
    expect(wrapper.html()).matchSnapshot()
  })

  describe('Basic', async () => {
    let wrapper: VueWrapper<InstanceType<typeof Basic>>

    beforeEach(async () => {
      wrapper = mount(Basic, {
        attachTo: document.body,
      })
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
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('WithDeferredMountAnimation', async () => {
    let wrapper: VueWrapper<InstanceType<typeof WithDeferredMountAnimation>>

    beforeEach(async () => {
      wrapper = mount(WithDeferredMountAnimation, {
        attachTo: document.body,
      })
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

    it('should be able to mount click', async () => {
      const button = wrapper.find('[id="button1"]')

      // Open
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Close
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should be able to mount visibility', async () => {
      const button = wrapper.find('[id="button1"]')

      // Open
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Close visibility
      await wrapper.find('[id="button2"]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Open visibility
      await wrapper.find('[id="button2"]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('WithOpenAndCloseAnimation', async () => {
    let wrapper: VueWrapper<InstanceType<typeof WithOpenAndCloseAnimation>>

    beforeEach(async () => {
      wrapper = mount(WithOpenAndCloseAnimation, {
        attachTo: document.body,
      })
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

    it('should be able to mount click', async () => {
      const button = wrapper.find('[id="button1"]')

      // Open
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Close
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should be able to mount visibility', async () => {
      const button = wrapper.find('[id="button1"]')

      // Open
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Close visibility
      await wrapper.find('[id="button2"]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Open visibility
      await wrapper.find('[id="button2"]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('WithMountAnimation', async () => {
    let wrapper: VueWrapper<InstanceType<typeof WithMountAnimation>>

    beforeEach(async () => {
      wrapper = mount(WithMountAnimation, {
        attachTo: document.body,
      })
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

    it('should be able to mount click', async () => {
      const button = wrapper.find('[id="button1"]')

      // Open
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Close
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should be able to mount visibility', async () => {
      const button = wrapper.find('[id="button1"]')

      // Open
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Close visibility
      await wrapper.find('[id="button2"]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Open visibility
      await wrapper.find('[id="button2"]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('WithUnmountAnimation', async () => {
    let wrapper: VueWrapper<InstanceType<typeof WithUnmountAnimation>>

    beforeEach(async () => {
      wrapper = mount(WithUnmountAnimation, {
        attachTo: document.body,
      })
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

    it('should be able to mount click', async () => {
      const button = wrapper.find('[id="button1"]')

      // Open
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Close
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should be able to mount visibility', async () => {
      const button = wrapper.find('[id="button1"]')

      // Open
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Close visibility
      await wrapper.find('[id="button2"]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Open visibility
      await wrapper.find('[id="button2"]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('WithMultipleMountAnimations', async () => {
    let wrapper: VueWrapper<InstanceType<typeof WithMultipleMountAnimations>>

    beforeEach(async () => {
      wrapper = mount(WithMultipleMountAnimations, {
        attachTo: document.body,
      })
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

    it('should be able to mount click', async () => {
      const button = wrapper.find('[id="button1"]')

      // Open
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Close
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should be able to mount visibility', async () => {
      const button = wrapper.find('[id="button1"]')

      // Open
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Close visibility
      await wrapper.find('[id="button2"]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Open visibility
      await wrapper.find('[id="button2"]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('WithMultipleOpenAndCloseAnimations', async () => {
    let wrapper: VueWrapper<InstanceType<typeof WithMultipleOpenAndCloseAnimations>>

    beforeEach(async () => {
      wrapper = mount(WithMultipleOpenAndCloseAnimations, {
        attachTo: document.body,
      })
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

    it('should be able to mount click', async () => {
      const button = wrapper.find('[id="button1"]')

      // Open
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Close
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should be able to mount visibility', async () => {
      const button = wrapper.find('[id="button1"]')

      // Open
      await button.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Close visibility
      await wrapper.find('[id="button2"]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()

      // Open visibility
      await wrapper.find('[id="button2"]').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
