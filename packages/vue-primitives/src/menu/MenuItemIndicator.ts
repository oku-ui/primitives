import type { CheckedState } from '../checkbox/index.ts'
import type { PrimitiveProps } from '../primitive/Primitive.ts'
import { createContext } from '../hooks/index.ts'

export interface MenuItemIndicatorProps {
  as?: PrimitiveProps['as']
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export interface ItemIndicatorContext {
  checked: () => CheckedState
}

export const [provideItemIndicatorContext, useItemIndicatorContext] = createContext<ItemIndicatorContext>('MenuItemIndicator', {
  checked: () => false,
})
