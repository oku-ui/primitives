import { defineComponent } from 'vue'
import { enableAutoUnmount, mount, shallowMount } from '@vue/test-utils'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { OkuToggleGroup, OkuToggleGroupItem } from '../'

import Single from '../stories/Single.vue'
import Vertical from '../stories/Vertical.vue'
import Multiple from '../stories/Multiple.vue'
import Chromatic from '../stories/Chromatic.vue'

enableAutoUnmount(afterEach)

const onValueChange = vi.fn()

const ToggleGroupTest = defineComponent({
  components: {
    OkuToggleGroup,
    OkuToggleGroupItem,
  },
  props: {
    type: String,
  },
  setup() {
    return {
      onValueChange,
    }
  },
  template: `
    <OkuToggleGroup :type="type" @value-change="onValueChange">
      <OkuToggleGroupItem value="One">One</OkuToggleGroupItem>
      <OkuToggleGroupItem value="Two">Two</OkuToggleGroupItem>
      <OkuToggleGroupItem value="Three">Three</OkuToggleGroupItem>
    </OkuToggleGroup>
  `,
})

describe('okuToggleGroup', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(ToggleGroupTest, {
      attachTo: document.body,
    })
  })

  it('should render OkuToggleGroup correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()

    expect(shallowMount(OkuToggleGroup).html()).toMatchSnapshot()
  })

  it('should render OkuToggleGroupItem correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => shallowMount(OkuToggleGroupItem)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()

    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuToggleGroup)" not found.')
  })

  /**
   * @vitest-environment jsdom
   */
  it('should have no accessibility violations', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  it('should log a warning when the type prop is not provided', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => { })

    wrapper = shallowMount(OkuToggleGroup)

    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: Missing required prop: "type"')
  })

  describe('given a single ToggleGroup', () => {
    let wrapper: VueWrapper
    let one: DOMWrapper<Element>
    let two: DOMWrapper<Element>

    beforeEach(() => {
      wrapper = mount(ToggleGroupTest, {
        props: {
          type: 'single',
        },
        attachTo: document.body,
      })

      one = wrapper.findAll('button').filter(button => button.text() === 'One').at(0)!
      two = wrapper.findAll('button').filter(button => button.text() === 'Two').at(0)!
    })

    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    describe('when clicking `One`', () => {
      beforeEach(() => {
        one.trigger('click')
      })

      it('should have no accessibility violations', async () => {
        expect(await axe(wrapper.element)).toHaveNoViolations()
      })

      it('should change value to `One`', () => {
        expect(onValueChange).toHaveBeenCalledWith('One')
      })

      describe('then clicking `Two`', () => {
        beforeEach(() => {
          two.trigger('click')
        })

        it('should change value to `Two`', () => {
          expect(onValueChange).toHaveBeenCalledWith('Two')
        })

        describe('and clicking `Two` again`', () => {
          beforeEach(() => {
            two.trigger('click')
          })

          it('should change value to empty string', () => {
            expect(onValueChange).toHaveBeenCalledWith('')
          })
        })
      })
    })
  })

  describe('given a multiple ToggleGroup', () => {
    let wrapper: VueWrapper
    let one: DOMWrapper<Element>
    let two: DOMWrapper<Element>

    beforeEach(() => {
      wrapper = mount(ToggleGroupTest, {
        props: {
          type: 'multiple',
        },
        attachTo: document.body,
      })

      one = wrapper.findAll('button').filter(button => button.text() === 'One').at(0)!
      two = wrapper.findAll('button').filter(button => button.text() === 'Two').at(0)!
    })

    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    describe('when clicking `One`', () => {
      beforeEach(() => {
        one.trigger('click')
      })

      it('should have no accessibility violations', async () => {
        expect(await axe(wrapper.element)).toHaveNoViolations()
      })

      it('should change value to `One`', () => {
        expect(onValueChange).toHaveBeenCalledWith(['One'])
      })

      describe('and clicking `One` again`', () => {
        beforeEach(() => {
          one.trigger('click')
        })

        it('should change value to empty array', () => {
          expect(onValueChange).toHaveBeenCalledWith([])
        })
      })

      describe('then clicking `Two`', () => {
        beforeEach(() => {
          two.trigger('click')
        })

        it('should add `Two` to value', () => {
          expect(onValueChange).toHaveBeenCalledWith(['One', 'Two'])
        })

        describe('and clicking `Two` again`', () => {
          beforeEach(() => {
            two.trigger('click')
          })

          it('should change value to `One`', () => {
            expect(onValueChange).toHaveBeenCalledWith(['One'])
          })
        })
      })
    })
  })
})

describe('okuToggleGroup Stories', () => {
  describe('single', () => {
    let wrapper: VueWrapper<InstanceType<typeof Single>>

    beforeEach(async () => {
      wrapper = mount(Single, {
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

  describe('vertical', () => {
    let wrapper: VueWrapper<InstanceType<typeof Vertical>>

    beforeEach(async () => {
      wrapper = mount(Vertical, {
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

  describe('multiple', () => {
    let wrapper: VueWrapper<InstanceType<typeof Multiple>>

    beforeEach(async () => {
      wrapper = mount(Multiple, {
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
