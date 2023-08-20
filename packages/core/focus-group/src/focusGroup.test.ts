import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import { h } from 'vue'
import { createFocusGuard } from './utils'
import { OkuFocusGroup } from './'

const component = {
  setup(props, { attrs, slots }) {
    return () => h(OkuFocusGroup, { ...attrs }, slots)
  },
} as Component

describe('Focus Guards', () => {
  it('correctly adds and removes focus guards', () => {
    const wrapper = mount(component, {
      slots: {
        default: '<div>content</div>',
      },
    })

    // Focus protection elements are checked after first render
    const focusGuards = document.querySelectorAll('[data-oku-focus-guard]')
    expect(focusGuards.length).toBe(2) // Focus protection element must be added to the first and last

    // Destroy the component and verify that the focus guards are removed
    wrapper.unmount()
    const remainingFocusGuards = document.querySelectorAll('[data-oku-focus-guard]')
    expect(remainingFocusGuards.length).toBe(0)
  })

  it('creates focus guard element correctly', () => {
    const focusGuard = createFocusGuard()
    expect(focusGuard.tagName).toBe('SPAN')
    expect(focusGuard.getAttribute('data-oku-focus-guard')).toBe('')
    expect(focusGuard.tabIndex).toBe(0)
    expect(focusGuard.style.outline).toBe('none none')
    expect(focusGuard.style.opacity).toBe('0')
    expect(focusGuard.style.position).toBe('fixed')
    expect(focusGuard.style.pointerEvents).toBe('none')
  })
})
