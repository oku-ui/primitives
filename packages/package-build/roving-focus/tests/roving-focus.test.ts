import type { Component } from 'vue'
import { mount } from '@vue/test-utils'

import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { OkuRovingFocusGroup, OkuRovingFocusGroupItem } from '../'

const component = {
  setup(props, { slots, attrs }) {
    return () => h(OkuRovingFocusGroup, attrs, slots)
  },
} as Component

describe('okuRovingFocusGroup', () => {
  describe('okuRovingFocusGroupItem aschild', () => {
    it('empty', () => {
      const com = mount(component, {
        slots: {
          default: () => [
            h(OkuRovingFocusGroupItem, {
              asChild: true,
            }),
            h(OkuRovingFocusGroupItem, {
              asChild: true,
            }),
          ],
        },
      })
      expect(com.element).toMatchSnapshot()
    })

    it('one button', async () => {
      const com = mount(component, {
        slots: {
          default: () => [
            h(OkuRovingFocusGroupItem, {
              asChild: true,
            }, {
              default: () => h('button', {}, 'button'),
            }),
          ],
        },
      })
      expect(com.element).toMatchSnapshot()
    })
  })
})
