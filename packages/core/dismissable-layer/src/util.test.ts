import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { useFocusOutside, usePointerdownOutside } from './util'

describe('useFocusoutSide', () => {
  it('should call onFocusoutSide when focusin event happens outside', () => {
    const onFocusoutSide = vi.fn()

    const wrapper = mount({
      template: '<div v-on="events"></div>',
      setup() {
        const events = useFocusOutside(onFocusoutSide)
        return { events }
      },
    })

    wrapper.trigger('focusin')

    document.dispatchEvent(new FocusEvent('focusin'))

    expect(onFocusoutSide).not.toHaveBeenCalled()
  })

  it('should not call onFocusoutSide when focusin event happens inside', () => {
    const onFocusoutSide = vi.fn()
    const wrapper = mount({
      template: '<div v-on="events"><button></button></div>',
      setup() {
        const events = useFocusOutside(onFocusoutSide)
        return { events }
      },
    })
    // Simulate focusin event inside the component
    wrapper.find('button').trigger('focusin')

    expect(onFocusoutSide).not.toHaveBeenCalled()
  })
})

describe('usePointerDownOutside', () => {
  it('should not call onPointerDownOutside when pointerdown event happens inside', () => {
    const onPointerDownOutside = vi.fn()
    const wrapper = mount({
      template: '<div v-on="events"><button></button></div>',
      setup() {
        const events = usePointerdownOutside(onPointerDownOutside)
        return { events }
      },
    })

    // Simulate pointerdown event inside the component
    wrapper.find('button').trigger('pointerdown')

    expect(onPointerDownOutside).not.toHaveBeenCalled()
  })
})
