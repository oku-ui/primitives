import { watchEffect } from 'vue'

/**
 * Listens for when the escape key is down
 */
function useEscapeKeydown(
  onEscapeKeyDownProp?: (event: KeyboardEvent) => void,
  ownerDocument: Document = globalThis?.document,
) {
  watchEffect((onInvalidate) => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape')
        onEscapeKeyDownProp?.(event)
    }
    ownerDocument.addEventListener('keydown', handleKeyDown)
    onInvalidate(() => ownerDocument.removeEventListener('keydown', handleKeyDown))
  })
}

export { useEscapeKeydown }
