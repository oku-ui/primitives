import type { PrimitiveProps } from '../primitive/index.ts'
import type { RadixPrimitiveReturns } from '../shared/typeUtils.ts'
import { usePopoverContext } from './PopoverRoot.ts'

export interface PopoverTriggerProps {
  as?: PrimitiveProps['as']
}

export function PopoverTrigger(): RadixPrimitiveReturns {
  const context = usePopoverContext('PopoverTrigger')

  // function setTemplateEl(v: HTMLElement | undefined) {
  //   context.triggerRef.value = v
  // }

  // function onClick(event: MouseEvent) {
  //   if (event.defaultPrevented) {
  //     return
  //   }
  //   context.onOpenToggle()
  // }

  // const popperAnchor = usePopperAnchor({
  //   virtualRef: props.virtualRef,
  // })
}
