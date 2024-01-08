import { defineComponent } from 'vue'
import { enableAutoUnmount, mount, shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import {
  OkuToolbar,
  OkuToolbarButton,
  OkuToolbarLink,
  OkuToolbarSeparator,
  OkuToolbarToggleGroup,
  OkuToolbarToggleItem,
} from '../src'

import Styled from '../src/stories/Styled.vue'
import Chromatic from '../src/stories/Chromatic.vue'

enableAutoUnmount(afterEach)

const onClick = vi.fn()

const ToolbarTest = defineComponent({
  components: {
    OkuToolbar,
    OkuToolbarToggleGroup,
    OkuToolbarToggleItem,
  },
  setup() {
    return {
      onClick,
    }
  },
  template: `
    <OkuToolbar>
      <OkuToolbarToggleGroup type="single">
        <OkuToolbarToggleItem value="left" @click="onClick">
          Left
        </OkuToolbarToggleItem>
      </OkuToolbarToggleGroup>
    </OkuToolbar>
  `,
})

describe('okuToolbar', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(ToolbarTest, {
      attachTo: document.body,
    })
  })

  it('should render OkuToolbar correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()

    expect(shallowMount(OkuToolbar).html()).toMatchSnapshot()
  })

  it('should render OkuToolbarToggleItem correctly', () => {
    expect(shallowMount(OkuToolbarToggleItem).html()).toMatchSnapshot()
  })

  it('should render OkuToolbarButton correctly', () => {
    expect(shallowMount(OkuToolbarButton).html()).toMatchSnapshot()
  })

  it('should render OkuToolbarLink correctly', () => {
    expect(shallowMount(OkuToolbarLink).html()).toMatchSnapshot()
  })

  it('should log a warning when the type prop is not provided', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => shallowMount(OkuToolbarToggleGroup)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()

    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: Missing required prop: "type"')
  })

  it('should render OkuToolbarSeparator correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => shallowMount(OkuToolbarSeparator)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()

    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuToolbar)" not found.')
  })

  /**
   * @vitest-environment jsdom
   */
  it('should have no accessibility violations', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('given a default Toolbar', () => {
    beforeEach(() => {
      wrapper = mount(ToolbarTest, {
        attachTo: document.body,
      })
    })

    it('click event should be called just once', async () => {
      const button = wrapper.findAll('button').filter(button => button.text() === 'Left').at(0)!

      await button.trigger('click')

      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})

describe('okuToolbar Stories', () => {
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

  describe('chromatic', () => {
    let wrapper: VueWrapper<InstanceType<typeof Chromatic>>

    beforeEach(async () => {
      wrapper = shallowMount(Chromatic, {
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
