import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { useFocusOutside, usePointerdownOutside } from './util'
import type { FocusOutsideEvent } from './props'

enableAutoUnmount(afterEach)

function shallowMountTem(template: string, event: any) {
  return shallowMount({
    setup() {
      return { event }
    },
    template,
  })
}

describe('okuDismissableLayer util', () => {
  let wrapper: VueWrapper
  let onFocusOutside: (event: FocusOutsideEvent) => void
  let onPointerdownOutside: (event: FocusOutsideEvent) => void

  beforeEach(() => {
    onFocusOutside = vi.fn()
    onPointerdownOutside = vi.fn()
  })

  describe('useFocusOutside', () => {
    it('should call onFocusOutside when focusin event happens outside', async () => {
      wrapper = shallowMountTem('<div v-on="events"></div>', useFocusOutside(onFocusOutside))

      await wrapper.trigger('focusin')

      document.dispatchEvent(new FocusEvent('focusin'))

      expect(onFocusOutside).toHaveBeenCalled()
    })

    it('should not call onFocusOutside when focusin event happens inside', async () => {
      wrapper = shallowMountTem('<div v-on="events"><button></button></div>', useFocusOutside(onFocusOutside))

      await wrapper.find('button').trigger('focusin')

      expect(onFocusOutside).not.toHaveBeenCalled()
    })
  })

  describe('usePointerdownOutside', () => {
    it('should not call onPointerdownOutside when pointerdown event happens inside', async () => {
      wrapper = shallowMountTem('<div v-on="events"><button></button></div>', usePointerdownOutside(onPointerdownOutside))

      await wrapper.find('button').trigger('pointerdown')

      expect(onPointerdownOutside).not.toHaveBeenCalled()
    })
  })
})
