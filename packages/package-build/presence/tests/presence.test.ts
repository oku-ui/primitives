import { beforeEach, describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'

import {
  OkuPresence,
} from '../src'

import Basic from '../stories/Basic.vue'
import WithDeferredMountAnimation from '../stories/WithDeferredMountAnimation.vue'
import WithMountAnimation from '../stories/WithMountAnimation.vue'
import WithMultipleMountAnimations from '../stories/WithMultipleMountAnimations.vue'
import WithMultipleOpenAndCloseAnimations from '../stories/WithMultipleOpenAndCloseAnimations.vue'
import WithOpenAndCloseAnimation from '../stories/WithOpenAndCloseAnimation.vue'
import WithUnmountAnimation from '../stories/WithUnmountAnimation.vue'

describe('okuPresence', async () => {
  it('renders correctly', async () => {
    const wrapper = mount(OkuPresence)
    expect(wrapper.html()).matchSnapshot()
  })

  describe('basic', async () => {
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

  describe('withDeferredMountAnimation', async () => {
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

  describe('withOpenAndCloseAnimation', async () => {
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

  describe('withMountAnimation', async () => {
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

  describe('withUnmountAnimation', async () => {
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

  describe('withMultipleMountAnimations', async () => {
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

  describe('withMultipleOpenAndCloseAnimations', async () => {
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
