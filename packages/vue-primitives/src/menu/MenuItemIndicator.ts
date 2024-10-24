import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveDefaultProps, RadixPrimitiveGetAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import { type Ref, shallowRef } from 'vue'
import { type CheckedState, isIndeterminate } from '../checkbox/index.ts'
import { createContext } from '../hooks/index.ts'
import { usePresence } from '../presence/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { getCheckedState } from './utils.ts'

export interface MenuItemIndicatorProps {
  as?: PrimitiveProps['as']
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: boolean
}

export const DEFAULT_MENU_ITEM_INDICATOR_PROPS = {
  as: 'span',
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<MenuItemIndicatorProps>

export interface ItemIndicatorContext {
  checked: () => CheckedState
}

export const [provideItemIndicatorContext, useItemIndicatorContext] = createContext<ItemIndicatorContext>('MenuItemIndicator', {
  checked: () => false,
})

export interface UseMenuItemIndicatorProps {
  el?: Ref<HTMLElement | undefined>
  forceMount?: boolean
}

export function useMenuItemIndicator(props: UseMenuItemIndicatorProps = {}): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
  attrs: RadixPrimitiveGetAttrs
}> {
  const indicatorContext = useItemIndicatorContext('MenuItemIndicator')

  const el = props.el ?? shallowRef<HTMLElement>()
  const setElRef = props.el ? undefined : (v: HTMLElement | undefined) => el.value = v
  // const forwardElement = useForwardElement(el)

  const isPresent = usePresence(el, () => props.forceMount || isIndeterminate(indicatorContext.checked()) || indicatorContext.checked() === true)

  return {
    isPresent,
    attrs(extraAttrs) {
      const attrs = {
        'elRef': setElRef,
        'data-state': getCheckedState(indicatorContext.checked()),
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
