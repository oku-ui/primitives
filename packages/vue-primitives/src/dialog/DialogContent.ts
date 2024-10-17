import type { UseDialogContentImplSharedProps as _UseDialogContentImplProps, DialogContentImplEmits } from './DialogContentImpl.ts'
import { type Ref, shallowRef } from 'vue'
import { usePresence } from '../presence/index.ts'
import { mergePrimitiveAttrs, type PrimitiveDefaultProps, type RadixPrimitiveGetAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
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

export type DialogContentEmits = DialogContentImplEmits

export interface UseDialogContentPublicProps extends Omit<_UseDialogContentImplProps, 'trapFocus' | 'disableOutsidePointerEvents'> { }

export interface UseDialogContent extends UseDialogContentPublicProps {
  el?: Ref<HTMLElement | undefined>
  forceMount?: boolean
}

export function useDialogContent(props: UseDialogContent): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
  attrs: RadixPrimitiveGetAttrs
}> {
  const el = props.el || shallowRef<HTMLElement>()
  const setTemplateEl = props.el ? undefined : (value: HTMLElement | undefined) => el.value = value

  const context = useDialogContext('DialogContent')

  const isPresent = usePresence(el, () => props.forceMount || context.open.value)

  return {
    isPresent,
    attrs(extraAttrs = []) {
      const attrs = {
        elRef: setTemplateEl,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
