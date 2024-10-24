import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared'
import { type Ref, shallowRef } from 'vue'
import { usePopperContext } from '../popper/index.ts'
import { usePresence } from '../presence/index.ts'
import { useMenuContext } from './MenuRoot.ts'

export interface MenuContentProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: boolean
}

export const DEFAULT_MENU_CONTENT_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<MenuContentProps>

export interface UseMenuContentProps {
  forceMount?: boolean
}

export function useMenuContent(props: UseMenuContentProps = {}): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
}> {
  const context = useMenuContext('MenuContent')
  const popperContext = usePopperContext('MenuContent')

  const isPresent = props.forceMount ? shallowRef(true) : usePresence(popperContext.content, context.open)

  return {
    isPresent,
  }
}
