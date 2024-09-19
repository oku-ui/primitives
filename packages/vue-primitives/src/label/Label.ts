import type { PrimitiveProps } from '../primitive/index.ts'
import { type ConvertEmitsToUseEmits, type Data, mergeAttrs } from '../shared/index.ts'

export interface LabelProps {
  as?: PrimitiveProps['as']
}

export type LabelEmits = {
  mousedown: [event: MouseEvent]
}

export interface UseLabelProps extends ConvertEmitsToUseEmits<LabelEmits> {}

export interface UseLabelReturns {
  onMousedown?: (event: MouseEvent) => void
  [key: string]: any
}

export function useLabel(props?: UseLabelProps): (extraAttrs?: Data) => UseLabelReturns {
  function onMousedown(event: MouseEvent) {
    // only prevent text selection if clicking inside the label itself
    const target = event.target as HTMLElement
    if (target.closest('button, input, select, textarea'))
      return

    props?.onMousedown?.(event)
    // prevent text selection when double clicking label
    if (!event.defaultPrevented && event.detail > 1)
      event.preventDefault()
  }

  return (extraAttrs?: Data): UseLabelReturns => {
    const attrs = {
      onMousedown,
    } as const

    if (extraAttrs)
      mergeAttrs(attrs, extraAttrs)

    return attrs
  }
}
