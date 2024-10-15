import { enableAutoUnmount, mount, shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { OkuAvatar, OkuAvatarFallback, OkuAvatarImage } from '../'

import Styled from '../stories/Styled.vue'
import Chromatic from '../stories/Chromatic.vue'

enableAutoUnmount(afterEach)

const AVATAR_TEST_ID = 'avatar-test'
const FALLBACK_TEXT = 'AB'
const IMAGE_ALT_TEXT = 'Fake Avatar'
const DELAY = 300

describe('okuAvatar', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount({
      components: {
        OkuAvatar,
        OkuAvatarFallback,
      },
      setup() {
        return {
          AVATAR_TEST_ID,
          FALLBACK_TEXT,
        }
      },
      template: `
        <OkuAvatar :data-testid="AVATAR_TEST_ID">
          <OkuAvatarFallback>{{ FALLBACK_TEXT }}</OkuAvatarFallback>
        </OkuAvatar>
      `,
    }, {
      attachTo: document.body,
    })
  })

  it('should render OkuAvatar correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()

    expect(shallowMount(OkuAvatar).html()).toMatchSnapshot()
  })

  it('should render OkuAvatarImage correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => shallowMount(OkuAvatarImage)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()

    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toMatchSnapshot()
  })

  it('should render OkuAvatarFallback correctly', () => {
    const spy = vi.spyOn(globalThis.console, 'warn').mockImplementation(() => { })
    const wrapper = () => shallowMount(OkuAvatarFallback)

    expect(() => wrapper()).toThrowErrorMatchingSnapshot()
    expect(spy).toHaveBeenCalled()

    expect(spy.mock.calls[0][0]).toContain('[Vue warn]: injection "Symbol(OkuAvatar)" not found.')
  })

  /**
   * @vitest-environment jsdom
   */
  it('should have no accessibility violations', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('given an Avatar with fallback and a working image', () => {
    let wrapper: VueWrapper
    const originalGlobalImage = window.Image

    beforeAll(() => {
      (window.Image as any) = class MockImage {
        onload: () => void = () => {}
        src: string = ''
        constructor() {
          setTimeout(() => {
            this.onload()
          }, DELAY)
          return this
        }
      }
    })

    beforeEach(() => {
      wrapper = mount({
        components: {
          OkuAvatar,
          OkuAvatarFallback,
          OkuAvatarImage,
        },
        setup() {
          return {
            AVATAR_TEST_ID,
            FALLBACK_TEXT,
            IMAGE_ALT_TEXT,
          }
        },
        template: `
          <OkuAvatar :data-testid="AVATAR_TEST_ID">
            <OkuAvatarFallback>{{ FALLBACK_TEXT }}</OkuAvatarFallback>
            <OkuAvatarImage src="https://picsum.photos/id/1005/400/400" :alt="IMAGE_ALT_TEXT" />
          </OkuAvatar>
        `,
      }, {
        attachTo: document.body,
      })
    })

    afterAll(() => {
      window.Image = originalGlobalImage
    })

    it('should render the fallback initially', () => {
      expect(wrapper.text()).toContain(FALLBACK_TEXT)
    })

    it('should not render the image initially', () => {
      expect(wrapper.find('img').exists()).toBe(false)
    })

    it('should render the image after it has loaded', async () => {
      await new Promise(resolve => setTimeout(resolve, DELAY))

      expect(wrapper.find('img').exists()).toBe(true)
    })

    it('should have alt text on the image', async () => {
      await new Promise(resolve => setTimeout(resolve, DELAY))

      expect(wrapper.find('img').attributes('alt')).toBe(IMAGE_ALT_TEXT)
    })
  })

  describe('given an Avatar with fallback and delayed render', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
      wrapper = mount({
        components: {
          OkuAvatar,
          OkuAvatarFallback,
        },
        setup() {
          return {
            AVATAR_TEST_ID,
            FALLBACK_TEXT,
            IMAGE_ALT_TEXT,
            DELAY,
          }
        },
        template: `
          <OkuAvatar :data-testid="AVATAR_TEST_ID">
            <OkuAvatarFallback :delayMs="DELAY">{{ FALLBACK_TEXT }}</OkuAvatarFallback>
          </OkuAvatar>
        `,
      }, {
        attachTo: document.body,
      })
    })

    it('should not render a fallback immediately', () => {
      expect(wrapper.text()).not.toContain(FALLBACK_TEXT)
    })

    it('should render a fallback after the delay', async () => {
      expect(wrapper.text()).not.toContain(FALLBACK_TEXT)

      await new Promise(resolve => setTimeout(resolve, DELAY))

      expect(wrapper.text()).toContain(FALLBACK_TEXT)
    })
  })
})

describe('okuAvatar Stories', () => {
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
