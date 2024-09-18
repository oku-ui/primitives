import type { PrimitiveProps } from '@oku-ui/primitive'

export interface LabelProps {
  as?: PrimitiveProps['as']
}

export type LabelEmits = {
  mousedown: [event: MouseEvent]
}

export interface UseLabelEmits {
  onMousedown?: (event: MouseEvent) => void
}

export function useLabel(emits?: UseLabelEmits) {
  function onMousedown(event: MouseEvent) {
    // only prevent text selection if clicking inside the label itself
    const target = event.target as HTMLElement
    if (target.closest('button, input, select, textarea'))
      return

    emits?.onMousedown?.(event)
    // prevent text selection when double clicking label
    if (!event.defaultPrevented && event.detail > 1)
      event.preventDefault()
  }

  return () => ({
    onMousedown,
  })
}
