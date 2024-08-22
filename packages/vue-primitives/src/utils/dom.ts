import type { GeneralEventListener } from '@vueuse/core'

export function useNodeEventListener<EventType = Event>(
  targe: EventTarget | Document,
  event: string,
  handler: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions,
) {
  targe.addEventListener(event, handler as any, options)

  return () => {
    targe.removeEventListener(event, handler as any, options)
  }
}
