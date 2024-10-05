import type { PrimitiveProps } from '../primitive/index.ts'
import { type Ref, shallowRef } from 'vue'
import { usePresence } from '../presence/index.ts'
import { mergePrimitiveAttrs, type RadixPrimitiveGetAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useRadioContext } from './RadioGroupItem.ts'

export interface RadioGroupIndicatorProps {
  as?: PrimitiveProps['as']
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: boolean
}

export interface UseRadioGroupIndicatorProps {
  el?: Ref<HTMLElement | undefined>
  forceMount?: boolean
}

export function useRadioGroupIndicator(
  props: UseRadioGroupIndicatorProps = {},
): RadixPrimitiveReturns<{
    isPresent: Ref<boolean>
    attrs: RadixPrimitiveGetAttrs
  }> {
  const el = props.el || shallowRef<HTMLElement>()
  const setTemplateEl = props.el ? undefined : (value: HTMLElement | undefined) => el.value = value

  const context = useRadioContext('RadioGroupIndicator')

  const isPresent = usePresence(el, () => props.forceMount || context.checked.value)

  return {
    isPresent,
    attrs(extraAttrs) {
      const attrs = {
        'elRef': setTemplateEl,
        'data-state': context.checked.value ? 'checked' : 'unchecked',
        'data-disabled': context.disabled.value ? '' : undefined,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
