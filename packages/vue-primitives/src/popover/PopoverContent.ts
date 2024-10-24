import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared'
import { type Ref, shallowRef } from 'vue'
import { usePopperContext } from '../popper/index.ts'
import { usePresence } from '../presence/index.ts'
import { usePopoverContext } from './PopoverRoot.ts'

export interface PopoverContentProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: boolean
}

export const DEFAULT_POPOVER_CONTENT_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<PopoverContentProps>

export interface UsePopoverContentProps {
  forceMount?: boolean
}

export function usePopoverContent(props: UsePopoverContentProps = {}): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
}> {
  const context = usePopoverContext('PopoverContent')
  const popperContext = usePopperContext('PopoverContent')

  let isPresent: Ref<boolean>
  if (props.forceMount)
    isPresent = shallowRef(true)
  else
    isPresent = usePresence(popperContext.content, () => context.open.value)

  return {
    isPresent,
  }
}
