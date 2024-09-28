import type { PrimitiveProps } from '../primitive/index.ts'
import type { ElAttrs, RadixPrimitiveGetAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import { type Ref, shallowRef } from 'vue'
import { usePresence } from '../presence/usePresence.ts'
import { mergeHooksAttrs } from '../shared/mergeProps.ts'
import { useCheckboxContext } from './CheckboxRoot.ts'
import { getState, isIndeterminate } from './utils.ts'

export interface CheckboxIndicatorProps {
  as?: PrimitiveProps['as']
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export interface UseCheckboxIndicatorProps {
  el?: Ref<HTMLElement | undefined>
  forceMount?: boolean
}

export function useCheckboxIndicator(props: UseCheckboxIndicatorProps): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
  attrs: RadixPrimitiveGetAttrs
}> {
  const el = props.el || shallowRef<HTMLElement>()
  const setTemplateEl = props.el ? undefined : (value: HTMLElement | undefined) => el.value = value

  const context = useCheckboxContext('CheckboxIndicator')

  const isPresent = usePresence(el, () => props.forceMount || isIndeterminate(context.state.value) || context.state.value === true)

  return {
    isPresent,
    attrs(extraAttrs) {
      const attrs: ElAttrs = {
        'ref': setTemplateEl,
        'data-state': getState(context.state.value),
        'data-disabled': context.disabled() ? '' : undefined,
        'style': {
          pointerEvents: 'none',
        },
      }

      if (extraAttrs) {
        mergeHooksAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
