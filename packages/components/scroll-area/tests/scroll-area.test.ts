import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'

import Basic from '../src/story/Basic.vue'
import Resizable from '../src/story/Resizable.vue'
import ContentChange from '../src/story/ContentChange.vue'
import Animated from '../src/story/Animated.vue'
import Chromatic from '../src/story/Chromatic.vue'
import ChromaticDynamicContent from '../src/story/ChromaticDynamicContent.vue'

enableAutoUnmount(afterEach)

describe('OkuScrollArea', () => {
  describe('Basic', () => {
    let wrapper: VueWrapper<InstanceType<typeof Basic>>

    beforeEach(async () => {
      wrapper = mount(Basic, {
        attachTo: document.body,
      })
    })

    /**
    * @vitest-environment jsdom
    */
    it('should pass accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should updates props when form changes', async () => {
      await wrapper.find('select[name="type"]').setValue('scroll')
      await wrapper.find('select[name="dir"]').setValue('rtl')
      await wrapper.find('input[name="scrollHideDelay"]').setValue(1000)

      await wrapper.find('form').trigger('change')

      expect((wrapper.vm as unknown as { props: any }).props).toMatchObject({ type: 'scroll', dir: 'rtl', scrollHideDelay: 1000 })
    })

    it('should converts scroll delay to number', async () => {
      await wrapper.find('input[name="scrollHideDelay"]').setValue('1000')
      await wrapper.find('form').trigger('change')

      await nextTick()

      expect((wrapper.vm as unknown as { props: any }).props.scrollHideDelay).toBe(1000)
    })

    it('passes props to ScrollAreaStory', async () => {
      await wrapper.find('select[name="type"]').setValue('scroll')
      await wrapper.find('input[name="scrollHideDelay"]').setValue(500)

      await wrapper.find('form').trigger('change')

      await nextTick()

      // const scrollAreaStory = wrapper.findComponent(ScrollAreaStory)

      // expect(scrollAreaStory.props()).toMatchObject((wrapper.vm as unknown as { props: any }).props)
      expect(document.body.innerHTML).toMatchSnapshot()
    })
  })

  describe('Resizable', () => {
    let wrapper: VueWrapper<InstanceType<typeof Resizable>>

    beforeEach(async () => {
      wrapper = mount(Resizable, {
        attachTo: document.body,
      })
    })

    /**
    * @vitest-environment jsdom
    */
    it('should pass accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('can be resized', async () => {
      const resizableElement = wrapper.find('[style*="resize: both"]').element as HTMLDivElement

      vi.spyOn(resizableElement, 'offsetWidth', 'get').mockReturnValue(200)
      vi.spyOn(resizableElement, 'offsetHeight', 'get').mockReturnValue(200)

      await nextTick()

      expect(resizableElement.offsetWidth).toBe(200)
      expect(resizableElement.offsetHeight).toBe(200)
    })
  })

  describe('ContentChange', () => {
    let wrapper: VueWrapper<InstanceType<typeof ContentChange>>

    beforeEach(async () => {
      wrapper = mount(ContentChange, {
        attachTo: document.body,
      })
    })

    /**
    * @vitest-environment jsdom
    */
    it('should pass accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should change thumb size', async () => {
      // const scrollbarXElement = wrapper.find('.scrollbar[data-orientation="vertical"]').element as HTMLDivElement
      // const scrollbarYElement = wrapper.find('.scrollbar[data-orientation="horizontal"]').element as HTMLDivElement

      // const initialThumbHeight = Number.parseFloat(window.getComputedStyle(scrollbarXElement).getPropertyValue('--oku-scroll-area-thumb-height'))
      // const initialThumbWidth = Number.parseFloat(window.getComputedStyle(scrollbarYElement).getPropertyValue('--oku-scroll-area-thumb-width'))

      for (let i = 0; i < 10; i++) {
        await wrapper.findAll('button').filter((button: { text: () => string }) => button.text() === 'Add vertical content').at(0)?.trigger('click')
        await wrapper.findAll('button').filter((button: { text: () => string }) => button.text() === 'Increase horizontal size').at(0)?.trigger('click')
      }

      await nextTick()

      // const finalThumbHeight = Number.parseFloat(window.getComputedStyle(scrollbarXElement).getPropertyValue('--oku-scroll-area-thumb-height'))
      // const finalThumbWidth = Number.parseFloat(window.getComputedStyle(scrollbarYElement).getPropertyValue('--oku-scroll-area-thumb-width'))

      // expect(initialThumbHeight).toBeGreaterThan(finalThumbHeight)
      // expect(initialThumbWidth).toBeGreaterThan(finalThumbWidth)

      expect(document.body.innerHTML).toMatchSnapshot()
    })
  })

  describe('Animated', () => {
    let wrapper: VueWrapper<InstanceType<typeof Animated>>

    beforeEach(async () => {
      wrapper = mount(Animated, {
        attachTo: document.body,
      })
    })

    /**
    * @vitest-environment jsdom
    */
    it('should pass accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('Chromatic', () => {
    let wrapper: VueWrapper<InstanceType<typeof Chromatic>>

    beforeEach(async () => {
      wrapper = mount(Chromatic, {
        attachTo: document.body,
      })
    })

    /**
    * @vitest-environment jsdom
    */
    it('should pass accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('ChromaticDynamicContent', () => {
    let wrapper: VueWrapper<InstanceType<typeof ChromaticDynamicContent>>
    beforeEach(async () => {
      wrapper = mount(ChromaticDynamicContent, {
        attachTo: document.body,
      })
    })

    /**
    * @vitest-environment jsdom
    */
    it('should pass accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
