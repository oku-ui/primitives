import type { VueWrapper } from '@vue/test-utils'
import { enableAutoUnmount, shallowMount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { OkuSeparator } from '../'

import Styled from '../stories/Styled.vue'

enableAutoUnmount(afterEach)

describe('okuSeparator', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(OkuSeparator, {
      attachTo: document.body,
    })
  })

  it('should render OkuSeparator correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()

    expect(shallowMount(OkuSeparator).html()).toMatchSnapshot()
  })

  /**
   * @vitest-environment jsdom
   */
  it('should have no accessibility violations', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  it('should render with a horizontal data-orientation attribute by default', () => {
    expect(wrapper.attributes('data-orientation')).toBe('horizontal')
  })

  it('should render with an undefined aria-orientation attribute by default', () => {
    expect(wrapper.attributes('aria-orientation')).toBe(undefined)
  })

  it('should render with a separator role attribute by default', () => {
    expect(wrapper.attributes('role')).toBe('separator')
  })

  it('should log an error when the orientation prop is invalid', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(vi.fn() as any)

    wrapper = shallowMount(OkuSeparator, {
      props: {
        orientation: 'invalid-orientation' as any,
      },
    })

    expect(spy).toMatchSnapshot()
  })

  describe('given a horizontal Separator', () => {
    beforeEach(() => {
      wrapper = shallowMount(OkuSeparator, {
        props: {
          orientation: 'horizontal',
        },
        attachTo: document.body,
      })
    })

    /**
     * @vitest-environment jsdom
     */
    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render with a data-orientation attribute', () => {
      expect(wrapper.attributes('data-orientation')).toBe('horizontal')
    })

    it('should render with an undefined aria-orientation attribute by default', () => {
      expect(wrapper.attributes('aria-orientation')).toBe(undefined)
    })
  })

  describe('given a vertical Separator', () => {
    beforeEach(() => {
      wrapper = shallowMount(OkuSeparator, {
        props: {
          orientation: 'vertical',
        },
        attachTo: document.body,
      })
    })

    /**
     * @vitest-environment jsdom
     */
    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render with a vertical data-orientation attribute', () => {
      expect(wrapper.attributes('data-orientation')).toBe('vertical')
    })

    it('should render with a vertical aria-orientation attribute by default', () => {
      expect(wrapper.attributes('aria-orientation')).toBe('vertical')
    })
  })

  describe('given a decorative  Separator', () => {
    beforeEach(() => {
      wrapper = shallowMount(OkuSeparator, {
        props: {
          decorative: true,
        },
        attachTo: document.body,
      })
    })

    /**
     * @vitest-environment jsdom
     */
    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render with a none role attribute', () => {
      expect(wrapper.attributes('role')).toBe('none')
    })
  })
})

describe('okuSeparator Stories', () => {
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
})
