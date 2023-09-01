import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { OkuAvatar, OkuAvatarFallback, OkuAvatarImage } from '@oku-ui//avatar'

const AVATAR_TEST_ID = 'avatar-test'
const FALLBACK_TEXT = 'AB'
const IMAGE_ALT_TEXT = 'Fake Avatar'
const DELAY = 300

enableAutoUnmount(afterEach)

/**
 * @vitest-environment jsdom
 */

describe('given an Avatar with fallback and no image', () => {
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
        }
      },
      template: `
        <OkuAvatar :data-testid="AVATAR_TEST_ID">
          <OkuAvatarFallback>{{ FALLBACK_TEXT }}</OkuAvatarFallback>
        </OkuAvatar>
      `,
    })
  })

  it('should have no accessibility violations', async () => {
    // https://github.com/capricorn86/happy-dom/issues/978
    // TODO:77 https://github.com/chaance/vitest-axe/issues/7
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
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

  afterAll(() => {
    window.Image = originalGlobalImage
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
    })
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
