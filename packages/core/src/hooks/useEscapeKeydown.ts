import { type MaybeRefOrGetter, onBeforeUnmount, onMounted, toValue } from 'vue'

let registeredEscapeHandlers: ((e: KeyboardEvent) => void)[] = []

function cachedHandler(e: Event) {
  const event = e as KeyboardEvent
  if (event.key !== 'Escape')
    return

  for (const registeredHandler of registeredEscapeHandlers) {
    registeredHandler(event)
  }
}

export function useEscapeKeydown(handler: (e: KeyboardEvent) => void, ownerDocument: MaybeRefOrGetter<Document | undefined> = globalThis?.document) {
  let document: Document | undefined

  onMounted(() => {
    if (registeredEscapeHandlers.length === 0) {
      document = toValue(ownerDocument)!
      document.addEventListener('keydown', cachedHandler)
    }
    registeredEscapeHandlers.push(handler)
  })

  onBeforeUnmount(() => {
    registeredEscapeHandlers = registeredEscapeHandlers.filter(
      registeredHandler => registeredHandler !== handler,
    )

    if (registeredEscapeHandlers.length === 0) {
      document?.removeEventListener('keydown', cachedHandler)
    }
  })
}
