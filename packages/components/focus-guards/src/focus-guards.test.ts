import { beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { OkuFocusGuards } from './FocusGuards'

describe('OkuFocusGuards', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  test('adds focus guards when used', async () => {
    const wrapper = mount(OkuFocusGuards)

    await wrapper.vm.$nextTick()

    const edgeGuards = document.querySelectorAll(
      '[data-oku-radix-focus-guard]',
    )

    expect(edgeGuards.length).toBe(2)

    const firstGuard = edgeGuards[0]
    const lastGuard = edgeGuards[1]

    expect(firstGuard.getAttribute('data-oku-radix-focus-guard')).toBe('')
    expect(lastGuard.getAttribute('data-oku-radix-focus-guard')).toBe('')

    wrapper.unmount()
  })

  test('removes focus guards on unmount if count is 1', async () => {
    const mockGuard = document.createElement('span')
    mockGuard.setAttribute('data-oku-radix-focus-guard', '')
    document.body.appendChild(mockGuard)

    const wrapper = mount(OkuFocusGuards)

    await wrapper.vm.$nextTick()

    wrapper.unmount()

    const edgeGuards = document.querySelectorAll(
      '[data-oku-radix-focus-guard]',
    )
    expect(edgeGuards.length).toBe(0)
  })

  test('does not remove focus guards on unmount if count is greater than 1', async () => {
    const mockGuard = document.createElement('span')
    mockGuard.setAttribute('data-oku-radix-focus-guard', '')
    document.body.appendChild(mockGuard)

    const wrapper1 = mount(OkuFocusGuards)
    const wrapper2 = mount(OkuFocusGuards)

    await wrapper1.vm.$nextTick()
    await wrapper2.vm.$nextTick()

    wrapper1.unmount()

    const edgeGuards = document.querySelectorAll(
      '[data-oku-radix-focus-guard]',
    )
    expect(edgeGuards.length).toBe(1)

    wrapper2.unmount()
  })

  test('adds and removes focus guards in the correct order', async () => {
    const wrapper = mount(OkuFocusGuards)

    await wrapper.vm.$nextTick()

    const edgeGuards = document.querySelectorAll(
      '[data-oku-radix-focus-guard]',
    )

    expect(edgeGuards.length).toBe(2)

    const firstGuard = edgeGuards[0]
    const lastGuard = edgeGuards[1]

    expect(firstGuard.getAttribute('data-oku-radix-focus-guard')).toBe('')
    expect(lastGuard.getAttribute('data-oku-radix-focus-guard')).toBe('')

    wrapper.unmount()

    const edgeGuardsAfterUnmount = document.querySelectorAll(
      '[data-oku-radix-focus-guard]',
    )
    expect(edgeGuardsAfterUnmount.length).toBe(0)
  })
})
