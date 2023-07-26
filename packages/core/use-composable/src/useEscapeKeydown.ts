import { watchEffect } from 'vue'

// import { useCallbackRef } from '@oku-ui/use-composable'
import { useCallbackRef } from './useCallbackRef'

/**
 * Listens for when the escape key is down
 */
function useEscapeKeydown(
  onEscapeKeyDownProp?: (event: KeyboardEvent) => void,
  ownerDocument: Document = globalThis?.document,
) {
  const onEscapeKeyDown = useCallbackRef(onEscapeKeyDownProp)

  watchEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape')
        onEscapeKeyDown(event)
    }
    ownerDocument.addEventListener('keydown', handleKeyDown)
    return () => ownerDocument.removeEventListener('keydown', handleKeyDown)
  })
}

export { useEscapeKeydown }
