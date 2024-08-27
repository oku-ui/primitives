import { type MaybeRefOrGetter, toValue, watchEffect } from 'vue'

export function useEscapeKeydown(
  onEscapeKeydownProp: (event: KeyboardEvent) => void,
  ownerDocument: MaybeRefOrGetter<Document | undefined> = globalThis?.document,
) {
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape')
      onEscapeKeydownProp?.(event)
  }

  watchEffect((onCleanup) => {
    const ownerDocumentValue = toValue(ownerDocument)
    if (!ownerDocumentValue)
      return

    ownerDocumentValue.addEventListener('keydown', handleKeydown)

    onCleanup(() => ownerDocumentValue.removeEventListener('keydown', handleKeydown))
  })
}
