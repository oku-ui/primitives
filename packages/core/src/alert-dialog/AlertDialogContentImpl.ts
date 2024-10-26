import type { RadixPrimitiveReturns } from '../shared/index.ts'
import {
  type DialogContentImplEmits,
  useDialogContentImplModal,
  type UseDialogContentImplProps,
} from '../dialog/index.ts'
import { createContext, type MutableRefObject, useRef } from '../hooks/index.ts'

export type AlertDialogContentImplEmits = Omit<DialogContentImplEmits, 'pointerdownOutside' | 'interactOutside'>

export interface AlertDialogContentContext {
  cancelRef: MutableRefObject<HTMLElement | undefined>
}

export const [provideAlertDialogContentContext, useAlertDialogContentContext] = createContext<AlertDialogContentContext>('AlertDialogContent')

export interface UseAlertDialogContentImplProps extends Omit<UseDialogContentImplProps, 'onPointerDownOutside' | 'onInteractOutside'> {

}

export function useAlertDialogContentImpl(props: UseAlertDialogContentImplProps = {}): RadixPrimitiveReturns {
  const cancelRef = useRef<HTMLElement>()

  provideAlertDialogContentContext({
    cancelRef,
  })

  const dialogContentImplModal = useDialogContentImplModal({
    ...props,
    onOpenAutoFocus(event) {
      props.onOpenAutoFocus?.(event)
      if (event.defaultPrevented)
        return
      event.preventDefault()
      cancelRef.value?.focus({ preventScroll: true })
    },
    onPointerdownOutside(event) {
      event.preventDefault()
    },
    onInteractOutside(event) {
      event.preventDefault()
    },
  })

  const attrs = {
    role: 'alertdialog',
  }

  return {
    attrs(extraAttrs = []) {
      return dialogContentImplModal.attrs([attrs, ...extraAttrs])
    },
  }
}
