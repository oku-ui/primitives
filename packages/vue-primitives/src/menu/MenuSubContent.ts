import type { Ref } from 'vue'
import type { RadixPrimitiveReturns } from '../shared'
import { usePopperContext } from '../popper/index.ts'
import { usePresence } from '../presence/index.ts'
import { useMenuContext } from './MenuRoot.ts'

export interface MenuSubContentProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: boolean
}

export interface UseMenuSubContentProps {
  forceMount?: boolean
}

export function useMenuSubContent(props: UseMenuSubContentProps): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
}> {
  const context = useMenuContext('MenuSubContent')
  const popperContext = usePopperContext('MenuSubContent')
  const isPresent = usePresence(popperContext.content, () => props.forceMount || context.open())

  return {
    isPresent,
  }
}
