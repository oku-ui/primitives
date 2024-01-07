import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Listens for when the escape key is down
 */
function useEscapeKeydown(
  onEscapeKeydownProp?: (event: KeyboardEvent) => void,
  ownerDocument: Document = globalThis?.document,
) {
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape')
      onEscapeKeydownProp?.(event)
  }

  onMounted(() => {
    ownerDocument.addEventListener('keydown', handleKeydown)
  })

  onBeforeUnmount(() => {
    ownerDocument.removeEventListener('keydown', handleKeydown)
  })
}

export { useEscapeKeydown }
