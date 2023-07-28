import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useEscapeKeydown } from './useEscapeKeydown'

describe('useEscapeKeydown', () => {
  let onEscapeKeyDown: any
  let ownerDocument: Document

  beforeEach(() => {
    onEscapeKeyDown = vi.fn()
    ownerDocument = globalThis.document
  })

  it('should call onEscapeKeyDown when the escape key is pressed', () => {
    useEscapeKeydown(onEscapeKeyDown, ownerDocument)

    const escapeKeyEvent = new KeyboardEvent('keydown', { key: 'Escape' })
    ownerDocument.dispatchEvent(escapeKeyEvent)

    expect(onEscapeKeyDown).toHaveBeenCalledTimes(1)
    expect(onEscapeKeyDown).toHaveBeenCalledWith(escapeKeyEvent)
  })

  it('should not call onEscapeKeyDown for other key presses', () => {
    useEscapeKeydown(onEscapeKeyDown, ownerDocument)

    const otherKeyEvent = new KeyboardEvent('keydown', { key: 'Enter' })
    ownerDocument.dispatchEvent(otherKeyEvent)

    expect(onEscapeKeyDown).not.toHaveBeenCalled()
    expect(onEscapeKeyDown).not.toHaveBeenCalledWith(otherKeyEvent)
  })
})
