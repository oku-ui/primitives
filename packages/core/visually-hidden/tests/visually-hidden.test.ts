import { h } from 'vue'
import { enableAutoUnmount, mount, shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { OkuVisuallyHidden } from '../src'

import Basic from '../src/stories/Basic.vue'

enableAutoUnmount(afterEach)

describe('okuVisuallyHidden', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(OkuVisuallyHidden)
  })

  it('should render OkuVisuallyHidden correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  /**
   * @vitest-environment jsdom
   */
  it('should have no accessibility violations', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  it('should render as a span element', () => {
    // wrapper = mount(OkuVisuallyHidden, {
    //   attachTo: document.body,
    // })
    wrapper = mount({
      setup() {
        return () => h(OkuVisuallyHidden)
      },
    })

    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('should have the default style', () => {
    // wrapper = mount(OkuVisuallyHidden, {
    //   attachTo: document.body,
    // })
    wrapper = mount({
      setup() {
        return () => h(OkuVisuallyHidden)
      },
    })

    expect(wrapper.attributes('style')).toBe(
      'position: absolute; border: 0px; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; word-wrap: normal;',
    )
  })
})

describe('okuVisuallyHidden Stories', () => {
  describe('basic', () => {
    let wrapper: VueWrapper<InstanceType<typeof Basic>>
    const TEXT_CHILD = 'Save the file'

    beforeEach(async () => {
      wrapper = mount(Basic, {
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

    it('should render OkuVisuallyHidden correctly', () => {
      expect(wrapper.findComponent(OkuVisuallyHidden).exists()).toBe(true)
    })

    it('should render OkuVisuallyHidden as a span element', () => {
      expect(wrapper.findComponent(OkuVisuallyHidden).element.tagName).toBe('SPAN')
    })

    it('should have default style for OkuVisuallyHidden', () => {
      expect(wrapper.findComponent(OkuVisuallyHidden).attributes('style')).toBe(
        'position: absolute; border: 0px; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; word-wrap: normal;',
      )
    })

    it('should render text inside OkuVisuallyHidden', () => {
      expect(wrapper.findComponent(OkuVisuallyHidden).text()).toBe(TEXT_CHILD)
    })

    it('should have correct attributes for the second span', () => {
      expect(wrapper.findAll('span')[1].exists()).toBe(true)
      expect(wrapper.findAll('span')[1].element.tagName).toBe('SPAN')
      expect(wrapper.findAll('span')[1].attributes('aria-hidden')).toBe('true')
    })
  })
})
