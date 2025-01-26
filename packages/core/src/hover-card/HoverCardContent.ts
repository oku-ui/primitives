import type { Ref } from 'vue'
import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared'
import { shallowRef } from 'vue'
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

export const DEFAULT_HOVER_CARD_CONTENT_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<HoverCardContentProps>

export interface UseHoverCardContentProps {
  forceMount?: boolean
}

export function useHoverCardConten(props: UseHoverCardContentProps = {}): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
}> {
  const context = useHoverCardContext('HoverCardContent')
  const popperContext = usePopperContext('HoverCardContent')

  const isPresent = props.forceMount ? shallowRef(true) : usePresence(popperContext.content, context.open)

  return {
    isPresent,
  }
}
