import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { enableAutoUnmount, shallowMount } from '@vue/test-utils'
import { axe } from 'vitest-axe'

import {
  OkuMenu,
  OkuMenuAnchor,
  OkuMenuArrow,
  OkuMenuCheckboxItem,
  OkuMenuContent,
  OkuMenuContentImpl,
  OkuMenuGroup,
  OkuMenuItem,
  OkuMenuItemImpl,
  OkuMenuItemIndicator,
  OkuMenuLabel,
  OkuMenuPortal,
  OkuMenuRadioGroup,
  OkuMenuRadioItem,
  OkuMenuRootContentModal,
  OkuMenuRootContentNonModal,
  OkuMenuSeparator,
  OkuMenuSub,
  OkuMenuSubContent,
  OkuMenuSubTrigger,
} from '../src'

import Styled from '../stories/Styled.vue'
import Submenus from '../stories/Submenus.vue'
import WithLabels from '../stories/WithLabels.vue'
import Typeahead from '../stories/Typeahead.vue'
import CheckboxItems from '../stories/CheckboxItems.vue'
import RadioItems from '../stories/RadioItems.vue'
import Animated from '../stories/Animated.vue'

enableAutoUnmount(afterEach)

describe('okuMenu', () => {
  it('should render OkuMenu correctly', () => {
    const wrapper = shallowMount(OkuMenu)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render OkuMenuAnchor correctly', () => {
    const wrapper = shallowMount(OkuMenuAnchor)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render OkuMenuArrow correctly', () => {
    const wrapper = shallowMount(OkuMenuArrow)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render OkuMenuCheckboxItem correctly', () => {
    const wrapper = shallowMount(OkuMenuCheckboxItem)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render OkuMenuContent correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => shallowMount(OkuMenuContent)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuMenuPortal)" not found.')
    expect(spy.mock.calls[1][0]).toContain('[Vue warn]: injection "Symbol(OkuMenu)" not found.')
  })

  it('should render OkuMenuContentImpl correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => shallowMount(OkuMenuContentImpl)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuMenu)" not found.')
  })

  it('should render OkuMenuGroup correctly', () => {
    const wrapper = shallowMount(OkuMenuGroup)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render OkuMenuItemIndicator correctly', () => {
    const wrapper = shallowMount(OkuMenuItemIndicator)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render OkuMenuItem correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => shallowMount(OkuMenuItem)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuMenu)" not found.')
  })

  it('should render OkuMenuItemImpl correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => shallowMount(OkuMenuItemImpl)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuMenuContent)" not found.')
  })

  it('should render OkuMenuLabel correctly', () => {
    const wrapper = shallowMount(OkuMenuLabel)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render OkuMenuPortal correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => shallowMount(OkuMenuPortal)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuMenu)" not found.')
  })

  it('should render OkuMenuRadioGroup correctly', () => {
    const wrapper = shallowMount(OkuMenuRadioGroup)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render OkuMenuRadioItem correctly', () => {
    const wrapper = shallowMount(OkuMenuRadioItem)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render OkuMenuRootContentModal correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => shallowMount(OkuMenuRootContentModal)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuMenu)" not found.')
  })

  it('should render OkuMenuRootContentNonModal correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => shallowMount(OkuMenuRootContentNonModal)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuMenu)" not found.')
  })

  it('should render OkuMenuSeparator correctly', () => {
    const wrapper = shallowMount(OkuMenuSeparator)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render OkuMenuSub correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => shallowMount(OkuMenuSub)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuMenu)" not found.')
  })

  it('should render OkuMenuSubContent correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => shallowMount(OkuMenuSubContent)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuMenuPortal)" not found.')
    expect(spy.mock.calls[1][0]).toContain('[Vue warn]: injection "Symbol(OkuMenu)" not found.')
  })

  it('should render OkuMenuSubTrigger correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => shallowMount(OkuMenuSubTrigger)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuMenu)" not found.')
  })
})

describe('okuMenu Stories', () => {
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

  describe('submenus', () => {
    let wrapper: VueWrapper<InstanceType<typeof Submenus>>

    beforeEach(async () => {
      wrapper = shallowMount(Submenus, {
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

  describe('withLabels', () => {
    let wrapper: VueWrapper<InstanceType<typeof WithLabels>>

    beforeEach(async () => {
      wrapper = shallowMount(WithLabels, {
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

  describe('typeahead', () => {
    let wrapper: VueWrapper<InstanceType<typeof Typeahead>>

    beforeEach(async () => {
      wrapper = shallowMount(Typeahead, {
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

  describe('checkboxItems', () => {
    let wrapper: VueWrapper<InstanceType<typeof CheckboxItems>>

    beforeEach(async () => {
      wrapper = shallowMount(CheckboxItems, {
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

  describe('radioItems', () => {
    let wrapper: VueWrapper<InstanceType<typeof RadioItems>>
    beforeEach(async () => {
      wrapper = shallowMount(RadioItems, {
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

  describe('animated', () => {
    let wrapper: VueWrapper<InstanceType<typeof Animated>>
    beforeEach(async () => {
      wrapper = shallowMount(Animated, {
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
