import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'

import {
  OkuScrollArea,
  OkuScrollAreaCorner,
  OkuScrollAreaCornerImpl,
  OkuScrollAreaScrollbar,
  OkuScrollAreaScrollbarAuto,
  OkuScrollAreaScrollbarHover,
  OkuScrollAreaScrollbarImpl,
  OkuScrollAreaScrollbarScroll,
  OkuScrollAreaScrollbarVisible,
  OkuScrollAreaScrollbarX,
  OkuScrollAreaScrollbarY,
  OkuScrollAreaThumb,
  OkuScrollAreaThumbImpl,
  OkuScrollAreaViewport,
} from '../src'

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
