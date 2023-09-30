import { beforeEach, describe, it, vi } from 'vitest'
import type { SpyInstance } from 'vitest'

// TODO: Since the document ref has changed, the tests should be written accordingly.
describe('useEscapeKeydown', () => {
  let onEscapeKeyDown: any
  let ownerDocument: Document
  let addSpy: SpyInstance
  let removeSpy: SpyInstance

  beforeEach(() => {
    onEscapeKeyDown = vi.fn()
    ownerDocument = globalThis.document
    addSpy = vi.spyOn(ownerDocument, 'addEventListener')
    removeSpy = vi.spyOn(ownerDocument, 'removeEventListener')
  })

  it('should add event listener when the component mounts', () => {
  })
  // it('should call onEscapeKeyDown when the escape key is pressed', () => {
  //   useEscapeKeydown(onEscapeKeyDown, ownerDocument)

  //   expect(removeSpy).not.toHaveBeenCalled()

  //   const escapeKeyEvent = new KeyboardEvent('keydown', { key: 'Escape' })
  //   ownerDocument.dispatchEvent(escapeKeyEvent)

  //   expect(addSpy).toHaveBeenCalledTimes(1)
  //   expect(onEscapeKeyDown).toHaveBeenCalledTimes(1)
  //   expect(onEscapeKeyDown).toHaveBeenCalledWith(escapeKeyEvent)
  // })

  // it('should not call onEscapeKeyDown for other key presses', () => {
  //   useEscapeKeydown(onEscapeKeyDown, ownerDocument)

  //   expect(removeSpy).not.toHaveBeenCalled()

  //   const otherKeyEvent = new KeyboardEvent('keydown', { key: 'Enter' })
  //   ownerDocument.dispatchEvent(otherKeyEvent)

  //   expect(addSpy).toHaveBeenCalledTimes(1)
  //   expect(onEscapeKeyDown).not.toHaveBeenCalled()
  //   expect(onEscapeKeyDown).not.toHaveBeenCalledWith(otherKeyEvent)
  // })

  // it('should remove event listener when the component unmounts', () => {
  //   const wrapper = mount({
  //     template: '<div></div>',
  //     setup() {
  //       useEscapeKeydown(onEscapeKeyDown, ownerDocument)
  //     },
  //   })

  //   expect(removeSpy).not.toHaveBeenCalled()

  //   wrapper.trigger('keydown', { key: 'Escape' })

  //   expect(addSpy).toBeCalledTimes(1)

  //   wrapper.unmount()

  //   expect(removeSpy).toHaveBeenCalledTimes(1)
  // })
})
