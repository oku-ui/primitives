import { afterEach, beforeEach, describe, expect, it, test, vitest } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { nextTick } from 'vue'
import {
  OkuHoverCard,
  OkuHoverCardArrow,
  OkuHoverCardContent,
} from '../src'

import AsyncUpdateVue from '../src/stories/AsyncUpdate.vue'
import AnimatedVue from '../src/stories/Animated.vue'
import ContainTextSelectionVue from '../src/stories/ContainTextSelection.vue'
import ControlledVue from '../src/stories/Controlled.vue'
import ForcedMountVue from '../src/stories/ForcedMount.vue'
import NonPortalVue from '../src/stories/NonPortal.vue'

enableAutoUnmount(afterEach)

describe('OkuHoverCard', () => {
  it('OkuHoverCard renders correctly', () => {
    const wrapper = mount(OkuHoverCard)
    expect(wrapper.html()).toBe('')
  })

  it('OkuHoverCardArrow renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuHoverCardArrow)
    expect(() => wrapper()).toThrowError('`OkuPopperArrow` must be used within `OkuPopperContent`') // TODO
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuPopperContent)" not found.')
  })

  it('OkuHoverCardContent renders correctly', () => {
    const spy = vitest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const wrapper = () => mount(OkuHoverCardContent)
    expect(() => wrapper()).toThrowError('`OkuHoverCardContent` must be used within `OkuHoverCard`') // TODO
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuHoverCardPortal)" not found.')
  })
})

describe('Animated', () => {
  let wrapper: VueWrapper<InstanceType<typeof AnimatedVue>>

  beforeEach(async () => {
    wrapper = mount(AnimatedVue, {
      attachTo: document.body,
    })
    const button = wrapper.find('[class="hover-card-trigger"]')
    button.trigger('click')
  })

  it('renders correctly', () => {
    expect(document.body.innerHTML).toMatchSnapshot()
  })

  it('should be able to close', async () => {
    const _element = wrapper.find('[class="hover-card-trigger"]')
    _element.trigger('pointerleave')
    await nextTick()
    expect(document.body.innerHTML).toMatchSnapshot()
  })
})

describe('AsyncUpdate', async () => {
  let wrapper: VueWrapper<InstanceType<typeof AsyncUpdateVue>>

  beforeEach(async () => {
    wrapper = mount(AsyncUpdateVue, {
      attachTo: document.body,
    })

    await wrapper.find('[class="hover-card-trigger"]').trigger('pointerenter')
    await new Promise(resolve => setTimeout(resolve, 500))
    await nextTick()
  })

  /**
    * @vitest-environment jsdom
    */
  it('axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  test('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be able to close', async () => {
    await wrapper.find('[class="hover-card-trigger"]').trigger('pointerleave')
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('ContainTextSelection', async () => {
  let wrapper: VueWrapper<InstanceType<typeof ContainTextSelectionVue>>

  beforeEach(async () => {
    wrapper = mount(ContainTextSelectionVue, {
      attachTo: document.body,
    })

    await wrapper.find('[class="hover-card-trigger"]').trigger('pointerenter')
    await nextTick()
  })

  /**
        * @vitest-environment jsdom
        */
  it('axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  test('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be able to close', async () => {
    await wrapper.find('[class="hover-card-trigger"]').trigger('pointerleave')
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Controlled', async () => {
  let wrapper: VueWrapper<InstanceType<typeof ControlledVue>>

  beforeEach(async () => {
    wrapper = mount(ControlledVue, {
      attachTo: document.body,
    })

    await wrapper.find('[class="hover-card-trigger"]').trigger('pointerenter')
    await nextTick()
  })

  /**
     * @vitest-environment jsdom
     */
  it('axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  test('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be able to close', async () => {
    await wrapper.find('[class="hover-card-trigger"]').trigger('pointerleave')
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('ForcedMount', async () => {
  let wrapper: VueWrapper<InstanceType<typeof ForcedMountVue>>

  beforeEach(async () => {
    wrapper = mount(ForcedMountVue, {
      attachTo: document.body,
    })
    await nextTick()
  })

  /**
    * @vitest-environment jsdom
    */
  it('axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  test('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be able to close', async () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('NonPortal', async () => {
  let wrapper: VueWrapper<InstanceType<typeof NonPortalVue>>

  beforeEach(async () => {
    wrapper = mount(NonPortalVue, {
      attachTo: document.body,
    })
    await nextTick()
  })

  /**
      * @vitest-environment jsdom
      */
  it('axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  test('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be able to close', async () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
