import type { PrimitiveProps } from '../primitive/index.ts'
import type { ConvertEmitsToUseEmits } from '../utils/vue.ts'

export interface LabelProps {
  as?: PrimitiveProps['as']
}

export type LabelEmits = {
  mousedown: [event: MouseEvent]
}

export type UseLabelEmits = ConvertEmitsToUseEmits<LabelEmits>

export interface UseLabelReturns {
  onMousedown?: (event: MouseEvent) => void
}

export function useLabel(emits?: UseLabelEmits): () => UseLabelReturns {
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

  return (): UseLabelReturns => ({
    onMousedown,
  })
}
