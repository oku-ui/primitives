import { enableAutoUnmount, shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { OkuAspectRatio } from '../src'

import Styled from '../src/stories/Styled.vue'
import CustomRatios from '../src/stories/CustomRatios.vue'
import Chromatic from '../src/stories/Chromatic.vue'

enableAutoUnmount(afterEach)

const RATIO = 1 / 2

describe('okuAspectRatio', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount({
      components: {
        OkuAspectRatio,
      },
      setup() {
        return {
          RATIO,
        }
      },
      template: `
        <div :style="{ width: '500px' }">
          <OkuAspectRatio :ratio="RATIO">
            <span>Hello</span>
          </OkuAspectRatio>
        </div>
      `,
    }, {
      attachTo: document.body,
    })
  })

  it('should render okuAspectRatio correctly', () => {
    const wrapper = shallowMount(OkuAspectRatio)
    expect(wrapper.html()).toMatchSnapshot()
  })

  /**
   * @vitest-environment jsdom
   */
  it('should pass accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})

describe('okuAspectRatio Stories', () => {
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
    it('should pass accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('customRatios', () => {
    let wrapper: VueWrapper<InstanceType<typeof CustomRatios>>

    beforeEach(async () => {
      wrapper = shallowMount(CustomRatios, {
        attachTo: document.body,
      })
    })

    /**
     * @vitest-environment jsdom
     */
    it('should pass accessibility tests', async () => {
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
    it('should pass accessibility tests', async () => {
      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('should render correctly', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
