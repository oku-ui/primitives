import type { Ref } from 'vue'
import type { RadixPrimitiveReturns } from '../shared/typeUtils.ts'
import { useMenuContext } from '../menu/MenuRoot.ts'
import { usePopperContext } from '../popper/PopperRoot.ts'
import { usePresence } from '../presence/usePresence.ts'

export interface ContextMenuContenttProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: boolean
}
export interface UseContextMenuContenttProps {
  forceMount?: boolean
}

export function useContextMenuContent(props: UseContextMenuContenttProps = {}): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
}> {
  const menuContext = useMenuContext('MenuContent')
  const popperContext = usePopperContext('MenuContent')

  const isPresent = usePresence(popperContext.content, () => props.forceMount || menuContext.open())

  return {
    isPresent,
  }
}
