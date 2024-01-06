import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Listens for when the escape key is down
 */
function useEscapeKeydown(
  onEscapeKeydownProp?: (event: KeyboardEvent) => void,
  ownerDocument: Ref<Document> = ref(globalThis?.document),
) {
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape')
      onEscapeKeydownProp?.(event)
  }

  onMounted(() => {
    ownerDocument.value.addEventListener('keydown', handleKeydown)
  })

  onBeforeUnmount(() => {
    ownerDocument.value.removeEventListener('keydown', handleKeydown)
  })
}

export { useEscapeKeydown }
