import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { useFocusOutside, usePointerDownOutside } from './util'

describe('useFocusOutside', () => {
  it('should call onFocusOutside when focusin event happens outside', () => {
    const onFocusOutside = vi.fn()

    const wrapper = mount({
      template: '<div v-on="events"></div>',
      setup() {
        const events = useFocusOutside(onFocusOutside)
        return { events }
      },
    })

    wrapper.trigger('focusin')

    document.dispatchEvent(new FocusEvent('focusin'))

    expect(onFocusOutside).toHaveBeenCalled()
  })

  it('should not call onFocusOutside when focusin event happens inside', () => {
    const onFocusOutside = vi.fn()
    const wrapper = mount({
      template: '<div v-on="events"><button></button></div>',
      setup() {
        const events = useFocusOutside(onFocusOutside)
        return { events }
      },
    })

    // Simulate focusin event inside the component
    wrapper.find('button').trigger('focusin')

    expect(onFocusOutside).not.toHaveBeenCalled()
  })
})

describe('usePointerDownOutside', () => {
  it('should not call onPointerDownOutside when pointerdown event happens inside', () => {
    const onPointerDownOutside = vi.fn()
    const wrapper = mount({
      template: '<div v-on="events"><button></button></div>',
      setup() {
        const events = usePointerDownOutside(onPointerDownOutside)
        return { events }
      },
    })

    // Simulate pointerdown event inside the component
    wrapper.find('button').trigger('pointerdown')

    expect(onPointerDownOutside).not.toHaveBeenCalled()
  })
})
