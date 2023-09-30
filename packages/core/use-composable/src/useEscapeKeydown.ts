import type { Ref } from 'vue'
import { onBeforeUnmount, ref, watch } from 'vue'

/**
 * Listens for when the escape key is down
 */
function useEscapeKeydown(
  onEscapeKeyDownProp?: (event: KeyboardEvent) => void,
  ownerDocument: Ref<Document> = ref(globalThis?.document),
) {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape')
      onEscapeKeyDownProp?.(event)
  }

  watch([ownerDocument], () => {
    ownerDocument.value.addEventListener('keydown', handleKeyDown)
  })

  onBeforeUnmount(() => {
    ownerDocument.value.removeEventListener('keydown', handleKeyDown)
  })
}

export { useEscapeKeydown }
