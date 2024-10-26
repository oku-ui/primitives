import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { onMounted } from 'vue'
import { useRef } from '../hooks/index.ts'
import { type PopperAnchorProps, usePopperContext } from '../popper/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { useHoverCardContext } from './HoverCardRoot.ts'

export interface HoverCardTriggerProps extends PopperAnchorProps {
  as?: PrimitiveProps['as']
}

export const DEFAULT_HOVER_CARD_TRIGGER_PROPS = {
  as: 'a',
} satisfies PrimitiveDefaultProps<HoverCardTriggerProps>

export function useHoverCardTrigger(): RadixPrimitiveReturns {
  const context = useHoverCardContext('HoverCardTrigger')

  function onPointerenter(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    if (event.pointerType === 'touch')
      return
    context.onOpen()
  }

  function onPointerleave(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    if (event.pointerType === 'touch')
      return
    context.onClose()
  }

  function onFocus(event: FocusEvent) {
    if (event.defaultPrevented)
      return
    context.onOpen()
  }

  function onBlur(event: FocusEvent) {
    if (event.defaultPrevented)
      return
    context.onClose()
  }

  // prevent focus event on touch devices
  function onTouchstart(event: TouchEvent) {
    if (event.defaultPrevented)
      return
    event.preventDefault()
  }

  // COMP::PopperAnchor

  const popperContext = usePopperContext('HoverCardTrigger')

  const el = useRef<HTMLElement>()
  function setElRef(v: HTMLElement | undefined) {
    el.value = v
  }

  onMounted(() => {
    popperContext.onAnchorChange(el.value)
  })

  return {
    attrs(extraAttrs) {
      const attrs = {
        elRef: setElRef,
        onPointerenter,
        onPointerleave,
        onFocus,
        onBlur,
        onTouchstart,
      }

      if (extraAttrs) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
