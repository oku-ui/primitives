import type { Ref } from 'vue'
import type { RadixPrimitiveReturns } from '../shared'
import { usePopperContext } from '../popper/index.ts'
import { usePresence } from '../presence/index.ts'
import { useHoverCardContext } from './HoverCardRoot.ts'

export interface HoverCardContentProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: boolean
}

export interface UseHoverCardContentProps {
  forceMount?: boolean
}

export function useHoverCardConten(props: UseHoverCardContentProps = {}): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
}> {
  const context = useHoverCardContext('HoverCardContent')
  const popperContext = usePopperContext('HoverCardContent')

  const isPresent = usePresence(popperContext.content, () => props.forceMount || context.open.value)

  return {
    isPresent,
  }
}
