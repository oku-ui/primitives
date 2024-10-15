import { enableAutoUnmount, mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { OkuAspectRatio } from '../'

import Styled from '../stories/Styled.vue'
import CustomRatios from '../stories/CustomRatios.vue'
import Chromatic from '../stories/Chromatic.vue'

enableAutoUnmount(afterEach)

const RATIO = 1 / 2

describe('okuAspectRatio', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount({
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

  it('should render OkuAspectRatio correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  /**
   * @vitest-environment jsdom
   */
  it('should have no accessibility violations', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})

describe('okuAspectRatio Stories', () => {
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

  describe('customRatios', () => {
    let wrapper: VueWrapper<InstanceType<typeof CustomRatios>>

    beforeEach(async () => {
      wrapper = mount(CustomRatios, {
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
