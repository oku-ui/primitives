import { defineComponent, nextTick } from 'vue'
import { enableAutoUnmount, mount, shallowMount } from '@vue/test-utils'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { OkuCollapsible, OkuCollapsibleContent, OkuCollapsibleContentImpl, OkuCollapsibleTrigger } from '../src'

import Styled from '../src/stories/Styled.vue'
import Controlled from '../src/stories/Controlled.vue'
import Animated from '../src/stories/Animated.vue'
import AnimatedHorizontal from '../src/stories/AnimatedHorizontal.vue'
import Chromatic from '../src/stories/Chromatic.vue'

enableAutoUnmount(afterEach)

const TRIGGER_TEXT = 'Trigger'
const CONTENT_TEXT = 'Content'

const onOpenChange = vi.fn()

const CollapsibleTest = defineComponent({
  components: {
    OkuCollapsible,
    OkuCollapsibleContent,
    OkuCollapsibleContentImpl,
    OkuCollapsibleTrigger,
  },
  setup() {
    return {
      TRIGGER_TEXT,
      CONTENT_TEXT,
      onOpenChange,
    }
  },
  template: `
    <OkuCollapsible v-bind="$attrs" @open-change="onOpenChange">
      <OkuCollapsibleTrigger>{{ TRIGGER_TEXT }}</OkuCollapsibleTrigger>
      <OkuCollapsibleContent>{{ CONTENT_TEXT }}</OkuCollapsibleContent>
    </OkuCollapsible>
  `,
})

describe('okuCollapsible', () => {
  let wrapper: VueWrapper
  let trigger: DOMWrapper<HTMLElement>
  let content: DOMWrapper<HTMLElement> | null

  describe('given a default Collapsible', () => {
    beforeEach(() => {
      wrapper = mount(CollapsibleTest, {
        attachTo: document.body,
      })

      trigger = wrapper.findAll('button').filter((button: { text: () => string }) => button.text() === TRIGGER_TEXT).at(0)!
    })

    /**
     * @vitest-environment jsdom
     */
    it('should have no accessibility violations', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    // TODO: fix is undifind
    describe('when clicking the trigger', () => {
      beforeEach(async () => {
        trigger.trigger('click')
        // content = wrapper.findAll('div').filter((content: { text: () => string }) => content.text() === CONTENT_TEXT).at(0)!
      })

      it('should open the content', () => {
        content = wrapper.findAll('div').filter((content: { text: () => string }) => content.text() === CONTENT_TEXT).at(0)!

        expect(content?.isVisible()).toBe(true)
      })

      describe('and clicking the trigger again', () => {
        beforeEach(() => {
          trigger.trigger('click')
        })
        // TODO: fix test case
        it('should close the content', () => {
          content = wrapper.findAll('div').filter((content: { text: () => string }) => content.text() === CONTENT_TEXT).at(0)!

          // expect(content?.isVisible()).toBe(false)
        })
      })
    })
  })

  describe('given an open uncontrolled Collapsible', () => {
    beforeEach(() => {
      wrapper = mount(CollapsibleTest, {
        props: {
          defaultOpen: true,
        },
        attachTo: document.body,
      })
    })

    describe('when clicking the trigger', () => {
      beforeEach(async () => {
        trigger = wrapper.findAll('button').filter((button: { text: () => string }) => button.text() === TRIGGER_TEXT).at(0)!
        content = wrapper.findAll('div').filter((content: { text: () => string }) => content.text() === CONTENT_TEXT).at(0)!
        trigger.trigger('click')
      })

      it('should close the content', () => {
        expect(content?.isVisible()).toBe(false)
      })

      it('should call `onOpenChange` event with `false` value', () => {
        expect(onOpenChange).toHaveBeenCalledWith(false)
      })
    })
  })

  describe('given an open controlled Collapsible', () => {
    beforeEach(() => {
      wrapper = mount(CollapsibleTest, {
        props: {
          open: true,
        },
        attachTo: document.body,
      })

      content = wrapper.findAll('div').filter((content: { text: () => string }) => content.text() === CONTENT_TEXT).at(0)!
    })

    describe('when clicking the trigger', () => {
      beforeEach(() => {
        trigger = wrapper.findAll('button').filter((button: { text: () => string }) => button.text() === TRIGGER_TEXT).at(0)!
        trigger.trigger('click')
      })

      it('should call `onOpenChange` prop with `false` value', () => {
        expect(onOpenChange).toHaveBeenCalledWith(false)
      })

      it('should not close the content', () => {
        expect(content?.isVisible()).toBe(true)
      })
    })
  })
})

describe('okuCollapsible Stories', () => {
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

  describe('animatedHorizontal', () => {
    let wrapper: VueWrapper<InstanceType<typeof AnimatedHorizontal>>

    beforeEach(async () => {
      wrapper = shallowMount(AnimatedHorizontal, {
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
