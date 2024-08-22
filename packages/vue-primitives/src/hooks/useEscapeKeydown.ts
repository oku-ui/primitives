import { type MaybeRef, unref, watchEffect } from 'vue'

export function useEscapeKeydown(
  onEscapeKeydownProp: (event: KeyboardEvent) => void,
  ownerDocument: MaybeRef<Document | undefined> = globalThis?.document,
) {
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape')
      onEscapeKeydownProp?.(event)
  }

  watchEffect((onCleanup) => {
    const ownerDocumentValue = unref(ownerDocument)
    if (!ownerDocumentValue)
      return

    ownerDocumentValue.addEventListener('keydown', handleKeydown)

    onCleanup(() => ownerDocumentValue.removeEventListener('keydown', handleKeydown))
  })
}
