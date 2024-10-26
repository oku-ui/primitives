import type { PrimitiveProps } from '../primitive/index.ts'
import { mergePrimitiveAttrs, type PrimitiveDefaultProps, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useToastRootContext } from './ToastRoot.ts'

export interface ToastCloseProps {
  as?: PrimitiveProps['as']
}

export const DEFAULT_TOAST_CLOSE_PROPS = {
  as: 'button',
} satisfies PrimitiveDefaultProps<ToastCloseProps>

export interface UseToastCloseProps {
  altText?: string
}

export function useToastClose(): RadixPrimitiveReturns {
  const interactiveContext = useToastRootContext('ToastClose')

  function onClick(event: MouseEvent) {
    if (event.defaultPrevented) {
      return
    }

    interactiveContext.onClose()
  }

  return {
    attrs(extraAttrs) {
      const attrs = {
        'type': 'button',
        'data-radix-toast-announce-exclude': '',
        onClick,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
