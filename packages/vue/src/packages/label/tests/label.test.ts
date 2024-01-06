import { enableAutoUnmount, shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { OkuLabel } from '@oku-ui/label'

import Styled from '../stories/Styled.vue'
import WithControl from '../stories/WithControl.vue'

enableAutoUnmount(afterEach)

describe('okuLabel', () => {
  let wrapper: VueWrapper

  const onMousedown = vi.fn()

  beforeEach(() => {
    wrapper = shallowMount({
      components: {
        OkuLabel,
      },
      setup() {
        return {
          onMousedown,
        }
      },
      template: `
        <OkuLabel @mousedown="onMousedown">
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

  // TODO: mock preventDefault()
  it('should prevent default on double click', async () => {
    await wrapper.trigger('mousedown')
    await wrapper.trigger('mousedown')

    expect(wrapper.emitted('mousedown')).toBeTruthy()
  })

  it('should call `onMousedown` event', () => {
    expect(onMousedown).toHaveBeenCalled()
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
