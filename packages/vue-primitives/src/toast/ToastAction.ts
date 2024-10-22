import type { PrimitiveProps } from '../primitive/index.ts'
import { mergePrimitiveAttrs, type PrimitiveDefaultProps, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useToastRootContext } from './ToastRoot.ts'

export interface ToastActionProps {
  as?: PrimitiveProps['as']
  altText?: string
}

export const DEFAULT_TOAST_ACTION_PROPS = {
  as: 'button',
} satisfies PrimitiveDefaultProps<ToastActionProps>

export interface UseToastActionProps {
  altText?: string
}

export function useToastAction(props: UseToastActionProps = {}): RadixPrimitiveReturns {
  const interactiveContext = useToastRootContext('ToastAction')

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
        'data-radix-toast-announce-alt': props.altText || undefined,
        onClick,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
