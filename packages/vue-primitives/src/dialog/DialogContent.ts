import type { Ref } from 'vue'
import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { usePresence } from '../presence/index.ts'
import { useDialogContext } from './DialogRoot.ts'

export interface DialogContentProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling transntion with Vue native transition or other animation libraries.
   */
  forceMount?: boolean
}

export const DEFAULT_DIALOG_CONTENT_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<DialogContentProps>

export interface UseDialogContent {
  forceMount?: boolean
}

export function useDialogContent(props: UseDialogContent): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
}> {
  const context = useDialogContext('DialogContent')

  const isPresent = usePresence(context.content, () => props.forceMount || context.open.value)

  return {
    isPresent,
  }
}
