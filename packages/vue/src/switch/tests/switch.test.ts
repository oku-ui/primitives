import { defineComponent } from 'vue'
import { enableAutoUnmount, mount, shallowMount } from '@vue/test-utils'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { OkuSwitch, OkuSwitchThumb } from '../'

import Styled from '..//stories/Styled.vue'
import Controlled from '../stories/Controlled.vue'
import WithinForm from '../stories/WithinForm.vue'
import Chromatic from '../stories/Chromatic.vue'

enableAutoUnmount(afterEach)

const SWITCH_ROLE = 'switch'
const THUMB_TEST_ID = 'switch-indicator'

const onCheckedChange = vi.fn()

const SwitchTest = defineComponent({
  components: {
    OkuSwitch,
    OkuSwitchThumb,
  },
  props: {
    defaultChecked: Boolean,
    checked: Boolean,
    disabled: Boolean,
  },
  setup() {
    return {
      THUMB_TEST_ID,
      onCheckedChange,
    }
  },
  template: `
    <OkuSwitch aria-label="basic switch" v-bind="$attrs" @checked-change="onCheckedChange">
      <OkuSwitchThumb :data-testid="THUMB_TEST_ID" />
    </OkuSwitch>
  `,
})

describe('okuSwitch', () => {
  let wrapper: VueWrapper
  let switcher: DOMWrapper<Element>
  let thumb: DOMWrapper<Element>

  beforeEach(() => {
    wrapper = mount(SwitchTest, {
      attachTo: document.body,
    })

    switcher = wrapper.find(`[role="${SWITCH_ROLE}"]`)
    thumb = wrapper.find(`[data-testid="${THUMB_TEST_ID}"]`)
  })

  it('should render OkuSwitch correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render OkuSwitchThumb correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuSwitchThumb)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()

    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuSwitch)" not found.')
  })

  /**
   * @vitest-environment jsdom
   */
  it('should have no accessibility violations', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('when clicking the switch', () => {
    beforeEach(async () => {
      switcher.trigger('click')
    })

    it('should render OkuSwitch correctly with the correct attributes', () => {
      expect(switcher.exists()).toBe(true)
      expect(switcher.element.tagName).toBe('BUTTON')
      expect(switcher.attributes('type')).toBe('button')
      expect(switcher.attributes('role')).toBe('switch')
      expect(switcher.attributes('aria-checked')).toBe('true')
      expect(switcher.attributes('data-state')).toBe('checked')
      expect(switcher.attributes('value')).toBe('on')
    })

    it('should render OkuSwitchThumb correctly with the correct attributes', () => {
      expect(thumb.exists()).toBe(true)
      expect(thumb.element.tagName).toBe('SPAN')
      expect(thumb.attributes('data-state')).toBe('checked')
    })

    it('should call `onCheckedChange` event', () => {
      expect(onCheckedChange).toHaveBeenCalled()
    })

    describe('and clicking the switch again', () => {
      beforeEach(async () => {
        switcher.trigger('click')
      })

      it('should render OkuSwitch correctly with the correct attributes', () => {
        expect(switcher.exists()).toBe(true)
        expect(switcher.element.tagName).toBe('BUTTON')
        expect(switcher.attributes('type')).toBe('button')
        expect(switcher.attributes('role')).toBe('switch')
        expect(switcher.attributes('aria-checked')).toBe('false')
        expect(switcher.attributes('data-state')).toBe('unchecked')
        expect(switcher.attributes('value')).toBe('on')
      })

      it('should render OkuSwitchThumb correctly with the correct attributes', () => {
        expect(thumb.exists()).toBe(true)
        expect(thumb.element.tagName).toBe('SPAN')
        expect(thumb.attributes('data-state')).toBe('unchecked')
      })
    })
  })

  describe('given a disabled Switch', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
      wrapper = mount(SwitchTest, {
        props: {
          disabled: false,
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
  })

  describe('given an uncontrolled `checked` Switch', () => {
    let wrapper: VueWrapper
    let switcher: DOMWrapper<Element>
    let thumb: DOMWrapper<Element>

    beforeEach(() => {
      wrapper = mount(SwitchTest, {
        props: {
          defaultChecked: true,
        },
        attachTo: document.body,
      })

      switcher = wrapper.find(`[role="${SWITCH_ROLE}"]`)
      thumb = wrapper.find(`[data-testid="${THUMB_TEST_ID}"]`)
    })

    /**
     * @vitest-environment jsdom
     */
    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    describe('when clicking the switch', () => {
      beforeEach(async () => {
        switcher.trigger('click')
      })

      it('should render OkuSwitch correctly with the correct attributes', () => {
        expect(switcher.exists()).toBe(true)
        expect(switcher.element.tagName).toBe('BUTTON')
        expect(switcher.attributes('type')).toBe('button')
        expect(switcher.attributes('role')).toBe('switch')
        expect(switcher.attributes('aria-checked')).toBe('true')
        expect(switcher.attributes('data-state')).toBe('checked')
        expect(switcher.attributes('value')).toBe('on')
      })

      it('should render OkuSwitchThumb correctly with the correct attributes', () => {
        expect(thumb.exists()).toBe(true)
        expect(thumb.element.tagName).toBe('SPAN')
        expect(thumb.attributes('data-state')).toBe('checked')
      })

      it('should call `onCheckedChange` event', () => {
        expect(onCheckedChange).toHaveBeenCalled()
      })
    })

    describe('given a controlled `checked` Switch', () => {
      let wrapper: VueWrapper
      let switcher: DOMWrapper<Element>

      beforeEach(() => {
        wrapper = mount(SwitchTest, {
          props: {
            checked: true,
          },
          attachTo: document.body,
        })

        switcher = wrapper.find(`[role="${SWITCH_ROLE}"]`)
      })

      describe('when clicking the switch', () => {
        beforeEach(() => {
          switcher.trigger('click')
        })

        it('should call `onCheckedChange` event', () => {
          expect(onCheckedChange).toHaveBeenCalled()
        })
      })
    })
  })
})

describe('switch v-model tests', () => {
  it('checked', async () => {
    const wrapper = mount(OkuSwitch, {
      props: {
        'onUpdate:checked': (e: boolean) => wrapper.setProps({ checked: e }),
      },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.props('checked')).toBe(true)

    await wrapper.find('button').trigger('click')
    expect(wrapper.props('checked')).toBe(false)
  })

  it('checked init true should be updated', async () => {
    const wrapper = mount(OkuSwitch, {

      props: {
        'checked': true,
        'onUpdate:checked': (e: boolean) => wrapper.setProps({ checked: e }),
      },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.props('checked')).toBe(false)

    await wrapper.find('button').trigger('click')
    expect(wrapper.props('checked')).toBe(true)
  })
})

describe('okuSwitch Stories', () => {
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

  describe('controlled', () => {
    let wrapper: VueWrapper<InstanceType<typeof Controlled>>

    beforeEach(async () => {
      wrapper = shallowMount(Controlled, {
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

  describe('withinForm', () => {
    let wrapper: VueWrapper<InstanceType<typeof WithinForm>>

    beforeEach(async () => {
      wrapper = shallowMount(WithinForm, {
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
