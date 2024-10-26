import type { PopperAnchorProps } from '../popper/index.ts'
import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { useTooltipProviderContext } from './TooltipProvider.ts'
import { useTooltipContext } from './TooltipRoot.ts'

export interface TooltipTriggerProps extends PopperAnchorProps {
  as?: PrimitiveProps['as']
}

export const DEFAULT_TOOLTIP_TRIGGER_PROPS = {
  as: 'button',
} satisfies PrimitiveDefaultProps<TooltipTriggerProps>

export function useTooltipTrigger(): RadixPrimitiveReturns {
  const context = useTooltipContext('TooltipTrigger')
  const providerContext = useTooltipProviderContext('TooltipTrigger')

  function setTemplateRef(v: HTMLElement | undefined) {
    context.trigger.value = v
  }

  let isPointerDownRef = false
  let hasPointerMoveOpenedRef = false

  function handlePointerUp() {
    isPointerDownRef = false
  }

  function onPointermove(event: PointerEvent) {
    if (event.defaultPrevented) {
      return
    }

    if (event.pointerType === 'touch')
      return

    if (hasPointerMoveOpenedRef || providerContext.isPointerInTransitRef.value)
      return

    context.onTriggerEnter()
    hasPointerMoveOpenedRef = true
  }

  function onPointerleave(event: PointerEvent) {
    if (event.defaultPrevented) {
      return
    }
    context.onTriggerLeave()
    hasPointerMoveOpenedRef = false
  }

  function onPointerdown(event: PointerEvent) {
    if (event.defaultPrevented) {
      return
    }
    isPointerDownRef = true
    document.addEventListener('pointerup', handlePointerUp, { once: true })
  }

  function onFocus(event: FocusEvent) {
    if (event.defaultPrevented) {
      return
    }

    if (!isPointerDownRef)
      context.onOpen()
  }

  function onBlur(event: FocusEvent) {
    if (event.defaultPrevented) {
      return
    }
    context.onClose()
  }

  function onClick(event: MouseEvent) {
    if (event.defaultPrevented) {
      return
    }
    context.onClose()
  }

  return {
    attrs(extraAttrs) {
      const attrs = {
        'elRef': setTemplateRef,
        'data-state': context.stateAttribute(),
        'data-grace-area-trigger': true,
        onPointermove,
        onPointerleave,
        onPointerdown,
        onFocus,
        onBlur,
        onClick,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
