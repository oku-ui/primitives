import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { type Ref, shallowRef } from 'vue'
import { useMenuContext } from '../menu/MenuRoot.ts'
import { usePopperContext } from '../popper/index.ts'
import { usePresence } from '../presence/usePresence.ts'

export interface ContextMenuContenttProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: boolean
}

export const DEFAULT_CONTEXT_MENU_CONTENT_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<ContextMenuContenttProps>

export interface UseContextMenuContenttProps {
  forceMount?: boolean
}

export function useContextMenuContent(props: UseContextMenuContenttProps = {}): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
}> {
  const menuContext = useMenuContext('MenuContent')
  const popperContext = usePopperContext('MenuContent')

  let isPresent: Ref<boolean>
  if (props.forceMount)
    isPresent = shallowRef(true)
  else
    isPresent = usePresence(popperContext.content, menuContext.open)

  return {
    isPresent,
  }
}
