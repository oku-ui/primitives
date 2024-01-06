import { ref } from 'vue'
import type { Ref } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { SpyInstance } from 'vitest'
import { enableAutoUnmount, shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { useEscapeKeydown } from '@oku-ui/use-composable'

enableAutoUnmount(afterEach)

describe('useEscapeKeydown', () => {
  let wrapper: VueWrapper
  let onEscapeKeyDown: any
  let ownerDocument: Ref<Document>
  let addSpy: SpyInstance
  let removeSpy: SpyInstance

  beforeEach(() => {
    onEscapeKeyDown = vi.fn()
    ownerDocument = ref(globalThis.document)
    addSpy = vi.spyOn(ownerDocument.value, 'addEventListener')
    removeSpy = vi.spyOn(ownerDocument.value, 'removeEventListener')
    wrapper = shallowMount({
      template: '<div></div>',
      setup() {
        useEscapeKeydown(onEscapeKeyDown, ownerDocument)
      },
    })
  })

  it('should add event listener when the component mounts', async () => {
    expect(removeSpy).not.toHaveBeenCalled()

    await wrapper.trigger('keydown', { key: 'Escape' })

    expect(addSpy).toHaveBeenCalledTimes(1)
  })

  it('should call onEscapeKeyDown when the escape key is pressed', () => {
    expect(removeSpy).not.toHaveBeenCalled()

    const escapeKeyEvent = new KeyboardEvent('keydown', { key: 'Escape' })
    ownerDocument.value.dispatchEvent(escapeKeyEvent)

    expect(addSpy).toHaveBeenCalledTimes(1)

    expect(onEscapeKeyDown).toHaveBeenCalledTimes(1)
    expect(onEscapeKeyDown).toHaveBeenCalledWith(escapeKeyEvent)
  })

  it('should not call onEscapeKeyDown for other key presses', () => {
    expect(removeSpy).not.toHaveBeenCalled()

    const otherKeyEvent = new KeyboardEvent('keydown', { key: 'Enter' })
    ownerDocument.value.dispatchEvent(otherKeyEvent)

    expect(addSpy).toHaveBeenCalledTimes(1)

    expect(onEscapeKeyDown).not.toHaveBeenCalled()
    expect(onEscapeKeyDown).not.toHaveBeenCalledWith(otherKeyEvent)
  })

  it('should remove event listener when the component unmounts', async () => {
    expect(removeSpy).not.toHaveBeenCalled()

    await wrapper.trigger('keydown', { key: 'Escape' })

    expect(addSpy).toHaveBeenCalledTimes(1)

    wrapper.unmount()

    expect(removeSpy).toHaveBeenCalledTimes(1)
  })
})
