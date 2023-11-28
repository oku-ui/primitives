import { enableAutoUnmount, shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { OkuLabel } from '../src'

import Styled from '../src/stories/Styled.vue'
import WithControl from '../src/stories/WithControl.vue'

enableAutoUnmount(afterEach)

// TODO: add test
describe.skip('okuLabel', () => {
  // eslint-disable-next-line unused-imports/no-unused-vars
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
      `,
    }, {
      attachTo: document.body,
    })
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
