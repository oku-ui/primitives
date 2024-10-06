import type { Ref } from 'vue'
import type { RadixPrimitiveReturns } from '../shared'
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

export interface UsePopoverContentProps {
  forceMount?: boolean
}

export function usePopoverContent(props: UsePopoverContentProps = {}): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
}> {
  const context = usePopoverContext('PopoverContent')
  const popperContext = usePopperContext('PopoverContent')

  const isPresent = usePresence(popperContext.content, () => props.forceMount || context.open.value)

  return {
    isPresent,
  }
}
