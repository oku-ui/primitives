import type { PrimitiveProps } from '../primitive/index.ts'
import { type EmitsToHookProps, mergePrimitiveAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'

export interface LabelProps {
  as?: PrimitiveProps['as']
}

export type LabelEmits = {
  mousedown: [event: MouseEvent]
}

export interface UseLabelProps extends EmitsToHookProps<LabelEmits> {}

export function useLabel(props?: UseLabelProps): RadixPrimitiveReturns {
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

  return {
    attrs(extraAttrs) {
      const attrs = {
        onMousedown,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
