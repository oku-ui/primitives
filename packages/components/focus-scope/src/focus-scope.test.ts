import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import userEvent from '@testing-library/user-event'
import { OkuFocusScope } from './focus-scope'

const INNER_NAME_INPUT_LABEL = 'Name'
const INNER_EMAIL_INPUT_LABEL = 'Email'
const INNER_SUBMIT_LABEL = 'Submit'

const TestField = ({
  props: {
    label: String,
  },
  template: `
    <label>
      <span>{{ label }}</span>
      <input type="text" :name="label.toLowerCase()" v-bind="$attrs" />
    </label>
  `,
})

describe('FocusScope', () => {
  let wrapper: VueWrapper

  let tabbableFirst: HTMLInputElement
  let tabbableSecond: HTMLInputElement
  let tabbableLast: HTMLButtonElement

  describe('given a default FocusScope', () => {
    beforeEach(() => {
      wrapper = mount(
        {
          components: {
            OkuFocusScope,
            TestField,
          },
          setup() {
            return {
              INNER_NAME_INPUT_LABEL,
              INNER_EMAIL_INPUT_LABEL,
              INNER_SUBMIT_LABEL,
            }
          },
          template: `
            <div>
              <OkuFocusScope :asChild="true" :loop="true" :trapped="true">
                <form>
                  <TestField :label="INNER_NAME_INPUT_LABEL" />
                  <TestField :label="INNER_EMAIL_INPUT_LABEL" />
                  <button>{{ INNER_SUBMIT_LABEL }}</button>
                </form>
              </OkuFocusScope>
              <label>
                other
                <input />
              </label>
              <button>some outer button</button>
            </div>
          `,
        },
        { attachTo: document.body },
      )
      tabbableFirst = wrapper.find(`input[name="${INNER_NAME_INPUT_LABEL.toLowerCase()}"]`).element as HTMLInputElement
      tabbableSecond = wrapper.find(`input[name="${INNER_EMAIL_INPUT_LABEL.toLowerCase()}"]`).element as HTMLInputElement
      tabbableLast = wrapper.findAll('button').filter(button => button.text() === INNER_SUBMIT_LABEL).at(0)?.element as HTMLButtonElement
    })

    it('should focus the next element in the scope on tab', async () => {
      tabbableFirst.focus()
      await userEvent.tab()
      expect(tabbableSecond).toBe(document.activeElement)
    })

    it('should focus the last element in the scope on shift+tab from the first element in scope', async () => {
      tabbableFirst.focus()
      await userEvent.tab({ shift: true })
      expect(tabbableLast).toBe(document.activeElement)
    })

    it('should focus the first element in scope on tab from the last element in scope', async () => {
      tabbableLast.focus()
      await userEvent.tab()
      expect(tabbableFirst).toBe(document.activeElement)
    })
  })

  afterEach(() => wrapper.unmount())

  describe('given a FocusScope where the first focusable has a negative tabindex', () => {
    beforeEach(() => {
      wrapper = mount(
        {
          components: {
            OkuFocusScope,
            TestField,
          },
          setup() {
            return {
              INNER_NAME_INPUT_LABEL,
              INNER_EMAIL_INPUT_LABEL,
              INNER_SUBMIT_LABEL,
            }
          },
          template: `
            <div>
              <OkuFocusScope :asChild="true" :loop="true" :trapped="true">
                <form>
                  <TestField :label="INNER_NAME_INPUT_LABEL" :tabIndex="-1" />
                  <TestField :label="INNER_EMAIL_INPUT_LABEL" />
                  <button>{{ INNER_SUBMIT_LABEL }}</button>
                </form>
              </OkuFocusScope>
              <TestField label="other" />
              <button>some outer button</button>
            </div>
          `,

        },
        { attachTo: document.body },
      )
      tabbableSecond = wrapper.find(`input[name="${INNER_EMAIL_INPUT_LABEL.toLowerCase()}"]`).element as HTMLInputElement
      tabbableLast = wrapper.findAll('button').filter(button => button.text() === INNER_SUBMIT_LABEL).at(0)?.element as HTMLButtonElement
    })

    it('should skip the element with a negative tabindex on tab', async () => {
      tabbableLast.focus()
      await userEvent.tab()
      expect(tabbableSecond).toBe(document.activeElement)
    })

    it('should skip the element with a negative tabindex on shift+tab', async () => {
      tabbableSecond.focus()
      await userEvent.tab({ shift: true })
      expect(tabbableLast).toBe(document.activeElement)
    })
  })

  afterEach(() => wrapper.unmount())

  describe('given a FocusScope with internal focus handlers', () => {
    const handleLastFocusableElementBlur = vi.fn()

    beforeEach(() => {
      wrapper = mount(
        {
          components: {
            OkuFocusScope,
            TestField,
          },
          setup() {
            return {
              handleLastFocusableElementBlur,
              INNER_NAME_INPUT_LABEL,
              INNER_EMAIL_INPUT_LABEL,
              INNER_SUBMIT_LABEL,
            }
          },
          template: `
            <div>
              <OkuFocusScope :asChild="true" :loop="true" :trapped="true">
                <form>
                  <TestField :label="INNER_NAME_INPUT_LABEL" />
                  <button @blur="handleLastFocusableElementBlur">{{ INNER_SUBMIT_LABEL }}</button>
                </form>
              </OkuFocusScope>
            </div>
          `,
        },
        { attachTo: document.body },
      )
      tabbableFirst = wrapper.find(`input[name="${INNER_NAME_INPUT_LABEL.toLowerCase()}"]`).element as HTMLInputElement
    })

    afterEach(() => wrapper.unmount())

    it('should properly blur the last element in the scope before cycling back', async () => {
      // Tab back and then tab forward to cycle through the scope
      tabbableFirst.focus()
      await userEvent.tab({ shift: true })
      await userEvent.tab()
      expect(handleLastFocusableElementBlur).toHaveBeenCalledTimes(1)
    })
  })
})
