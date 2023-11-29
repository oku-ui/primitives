import { enableAutoUnmount, shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { OkuLabel } from '../src'

import Styled from '../src/stories/Styled.vue'
import WithControl from '../src/stories/WithControl.vue'

enableAutoUnmount(afterEach)

describe.skip('okuLabel', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount({
      components: {
        OkuLabel,
      },
      setup() {
        return { }
      },
      template: `
        <OkuLabel>
            Label
        </OkuLabel>
      `,
    }, {
      attachTo: document.body,
    })
  })

  it('should render OkuLabel correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()

    expect(shallowMount(OkuLabel).html()).toMatchSnapshot()
  })

  /**
   * @vitest-environment jsdom
   */
  it('should have no accessibility violations', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  it('should prevent default on double click', async () => {
    const event = {
      preventDefault: vi.fn(),
      detail: 2,
    }

    await wrapper.trigger('mousedown', event)

    expect(wrapper.emitted('mousedown')).toBeTruthy()

    expect(event.preventDefault).toHaveBeenCalled()
  })
})

describe('okuLabel Stories', () => {
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

  describe('withControl', () => {
    let wrapper: VueWrapper<InstanceType<typeof WithControl>>

    beforeEach(async () => {
      wrapper = shallowMount(WithControl, {
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
