import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { type Ref, shallowRef } from 'vue'
import { usePopperContext } from '../popper/index.ts'
import { usePresence } from '../presence/index.ts'
import { useTooltipContext } from './TooltipRoot.ts'

export interface TooltipContentProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: boolean
}

export const DEFAULT_TOOLTIP_CONTENT_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<TooltipContentProps>

export interface UseTooltipContentProps {
  forceMount?: boolean
}

export function useTooltipContent(props: UseTooltipContentProps = {}): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
}> {
  const context = useTooltipContext('TooltipContent')
  const popperContext = usePopperContext('TooltipContent')

  const isPresent = props.forceMount ? shallowRef(true) : usePresence(popperContext.content, () => context.open.value)

  return {
    isPresent,
  }
}
