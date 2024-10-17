import type { VueWrapper } from '@vue/test-utils'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { OkuToggle } from '../'

import Chromatic from '../stories/Chromatic.vue'
import Controlled from '../stories/Controlled.vue'
import Styled from '../stories/Styled.vue'

enableAutoUnmount(afterEach)

const TEXT_CHILD = 'Like'

describe('okuToggle', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount({
      components: {
        OkuToggle,
      },
      setup() {
        return {
          TEXT_CHILD,
        }
      },
      template: `
        <OkuToggle>{{ TEXT_CHILD }}</OkuToggle>
      `,
    }, {
      attachTo: document.body,
    })
  })

  it('should render OkuToggle correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  /**
   * @vitest-environment jsdom
   */
  it('should have no accessibility violations', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('given a Toggle with text', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
      wrapper = mount({
        components: {
          OkuToggle,
        },
        setup() {
          return {
            TEXT_CHILD,
          }
        },
        template: `
          <OkuToggle>{{ TEXT_CHILD }}</OkuToggle>
        `,
      }, {
        attachTo: document.body,
      })
    })

    /**
     * @vitest-environment jsdom
     */
    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render with attributes as false/off by default', () => {
      const button = wrapper.findAll('button').filter(button => button.text() === TEXT_CHILD).at(0)!

      expect(button.attributes('aria-pressed')).toBe('false')
      expect(button.attributes('data-state')).toBe('off')
    })

    it('click event should change pressed attributes to true/on', async () => {
      const button = wrapper.findAll('button').filter(button => button.text() === TEXT_CHILD).at(0)!

      await button.trigger('click')

      expect(button.attributes('aria-pressed')).toBe('true')
      expect(button.attributes('data-state')).toBe('on')
    })
  })

  describe('given a Toggle with text and defaultPressed="true"', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
      wrapper = mount({
        components: {
          OkuToggle,
        },
        setup() {
          return {
            TEXT_CHILD,
          }
        },
        template: `
          <OkuToggle default-pressed>{{ TEXT_CHILD }}</OkuToggle>
        `,
      }, {
        attachTo: document.body,
      })
    })

    it('should render with attributes true/on by default', () => {
      const button = wrapper.findAll('button').filter(button => button.text() === TEXT_CHILD).at(0)!

      expect(button.attributes('aria-pressed')).toBe('true')
      expect(button.attributes('data-state')).toBe('on')
    })

    it('click event should change attributes back to off/false', async () => {
      const button = wrapper.findAll('button').filter(button => button.text() === TEXT_CHILD).at(0)!

      await button.trigger('click')

      expect(button.attributes('aria-pressed')).toBe('false')
      expect(button.attributes('data-state')).toBe('off')
    })
  })

  describe('given a Toggle with text and disabled="true"', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
      wrapper = mount({
        components: {
          OkuToggle,
        },
        setup() {
          return {
            TEXT_CHILD,
          }
        },
        template: `
          <OkuToggle disabled>{{ TEXT_CHILD }}</OkuToggle>
        `,
      }, {
        attachTo: document.body,
      })
    })

    it('on click the attributes do not change', async () => {
      const button = wrapper.findAll('button').filter(button => button.text() === TEXT_CHILD).at(0)!

      expect(button.attributes('aria-pressed')).toBe('false')
      expect(button.attributes('data-state')).toBe('off')
      expect(button.attributes('disabled')).toBe('')

      await button.trigger('click')

      expect(button.attributes('aria-pressed')).toBe('false')
      expect(button.attributes('data-state')).toBe('off')
    })
  })

  describe('given a controlled Toggle (with pressed and onPressedChange)', () => {
    let wrapper: VueWrapper
    const onPressedChange = vi.fn()

    beforeEach(() => {
      wrapper = mount({
        components: {
          OkuToggle,
        },
        setup() {
          return {
            TEXT_CHILD,
            onPressedChange,
          }
        },
        template: `
          <OkuToggle pressed @pressed-change="onPressedChange">
            {{ TEXT_CHILD }}
          </OkuToggle>
        `,
      }, {
        attachTo: document.body,
      })
    })

    it('click event should keep the same attributes, and pass the new state to onPressedChange', async () => {
      const button = wrapper.findAll('button').filter(button => button.text() === TEXT_CHILD).at(0)!

      expect(button.attributes('aria-pressed')).toBe('true')
      expect(button.attributes('data-state')).toBe('on')

      await button.trigger('click')

      expect(onPressedChange).toHaveBeenCalledTimes(1)
      expect(onPressedChange).toHaveBeenCalledWith(false)

      // The attributes do not change, they keep the same
      // because it's a controlled component.
      expect(button.attributes('aria-pressed')).toBe('true')
      expect(button.attributes('data-state')).toBe('on')
    })
  })

  it('pressed should be updated', async () => {
    const wrapper = mount(OkuToggle, {

      props: {
        'onUpdate:pressed': (e: boolean) => wrapper.setProps({ pressed: e }),
      },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.props('pressed')).toBe(true)

    await wrapper.find('button').trigger('click')
    expect(wrapper.props('pressed')).toBe(false)
  })

  it('pressed init true should be updated', async () => {
    const wrapper = mount(OkuToggle, {

      props: {
        'pressed': true,
        'onUpdate:pressed': (e: boolean) => wrapper.setProps({ pressed: e }),
      },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.props('pressed')).toBe(false)

    await wrapper.find('button').trigger('click')
    expect(wrapper.props('pressed')).toBe(true)
  })
})

describe('okuToggle Stories', () => {
  describe('styled', () => {
    let wrapper: VueWrapper<InstanceType<typeof Styled>>

    beforeEach(async () => {
      wrapper = mount(Styled, {
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

  describe('controlled', () => {
    let wrapper: VueWrapper<InstanceType<typeof Controlled>>

    beforeEach(async () => {
      wrapper = mount(Controlled, {
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

  describe('chromatic', () => {
    let wrapper: VueWrapper<InstanceType<typeof Chromatic>>

    beforeEach(async () => {
      wrapper = mount(Chromatic, {
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
