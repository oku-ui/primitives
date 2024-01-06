import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import { h } from 'vue'
import { OkuFocusGuards, createFocusGuard } from '@oku-ui/focus-guards'

const component = {
  setup(props, { attrs, slots }) {
    return () => h(OkuFocusGuards, { ...attrs }, slots)
  },
} as Component

describe('focus Guards', () => {
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

describe('okuFocusGuards', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('adds focus guards when used', async () => {
    const wrapper = mount(OkuFocusGuards)

    await wrapper.vm.$nextTick()

    const edgeGuards = document.querySelectorAll(
      '[data-oku-focus-guard]',
    )

    expect(edgeGuards.length).toBe(2)

    const firstGuard = edgeGuards[0]
    const lastGuard = edgeGuards[1]

    expect(firstGuard.getAttribute('data-oku-focus-guard')).toBe('')
    expect(lastGuard.getAttribute('data-oku-focus-guard')).toBe('')

    wrapper.unmount()
  })

  it('removes focus guards on unmount if count is 1', async () => {
    const mockGuard = document.createElement('span')
    mockGuard.setAttribute('data-oku-focus-guard', '')
    document.body.appendChild(mockGuard)

    const wrapper = mount(OkuFocusGuards)

    await wrapper.vm.$nextTick()

    wrapper.unmount()

    const edgeGuards = document.querySelectorAll(
      '[data-oku-focus-guard]',
    )
    expect(edgeGuards.length).toBe(0)
  })

  it('does not remove focus guards on unmount if count is greater than 1', async () => {
    const mockGuard = document.createElement('span')
    mockGuard.setAttribute('data-oku-focus-guard', '')
    document.body.appendChild(mockGuard)

    const wrapper1 = mount(OkuFocusGuards)
    const wrapper2 = mount(OkuFocusGuards)

    await wrapper1.vm.$nextTick()
    await wrapper2.vm.$nextTick()

    wrapper1.unmount()

    const edgeGuards = document.querySelectorAll(
      '[data-oku-focus-guard]',
    )
    expect(edgeGuards.length).toBe(1)

    wrapper2.unmount()
  })

  it('adds and removes focus guards in the correct order', async () => {
    const wrapper = mount(OkuFocusGuards)

    await wrapper.vm.$nextTick()

    const edgeGuards = document.querySelectorAll(
      '[data-oku-focus-guard]',
    )

    expect(edgeGuards.length).toBe(2)

    const firstGuard = edgeGuards[0]
    const lastGuard = edgeGuards[1]

    expect(firstGuard.getAttribute('data-oku-focus-guard')).toBe('')
    expect(lastGuard.getAttribute('data-oku-focus-guard')).toBe('')

    wrapper.unmount()

    const edgeGuardsAfterUnmount = document.querySelectorAll(
      '[data-oku-focus-guard]',
    )
    expect(edgeGuardsAfterUnmount.length).toBe(0)
  })
})
