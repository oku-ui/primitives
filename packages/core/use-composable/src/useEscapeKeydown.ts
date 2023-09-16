import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'

/**
 * Listens for when the escape key is down
 */
function useEscapeKeydown(
  onEscapeKeyDownProp?: (event: KeyboardEvent) => void,
  ownerDocument: Ref<Document> = ref(globalThis?.document),
) {
  watchEffect((onInvalidate) => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape')
        onEscapeKeyDownProp?.(event)
    }
    ownerDocument.value.addEventListener('keydown', handleKeyDown)
    onInvalidate(() => ownerDocument.value.removeEventListener('keydown', handleKeyDown))
  })
}

export { useEscapeKeydown }
