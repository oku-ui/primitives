import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { isClient } from '@vueuse/core'
import { onBeforeUnmount, onWatcherCleanup, watchEffect } from 'vue'
import { usePopperContext } from '../popper/PopperRoot.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { useContextMenuContext } from './ContextMenuRoot.ts'

export interface ContextMenuTriggerProps {
  as?: PrimitiveProps['as']
  disabled?: boolean
}

export const DEFAULT_CONTEXT_MENU_TRIGGER_PROPS = {
  as: 'span',
  disabled: undefined,
} satisfies PrimitiveDefaultProps<ContextMenuTriggerProps>

export type ContextMenuTriggerEmits = {
  contextmenu: [event: MouseEvent]
  pointerdown: [event: MouseEvent]
  pointermove: [event: MouseEvent]
  pointercancel: [event: MouseEvent]
  pointerup: [event: MouseEvent]
}

export interface UseContextMenuTriggerProps {
  disabled?: () => boolean | undefined
}

export function useContextMenuTrigger(props: UseContextMenuTriggerProps = {}): RadixPrimitiveReturns {
  const context = useContextMenuContext('ContextMenuTrigger')
  const popperContext = usePopperContext('ContextMenuTrigger')
  const pointRef: DOMRectInit = { width: 0, height: 0, x: 0, y: 0 }
  const virtualRef = {
    getBoundingClientRect() {
      return DOMRect.fromRect(pointRef)
    },
  }
  let longPressTimerRef = 0

  function clearLongPress() {
    window.clearTimeout(longPressTimerRef)
  }

  function handleOpen(event: MouseEvent | PointerEvent) {
    pointRef.x = event.clientX
    pointRef.y = event.clientY
    context.onOpenChange(true)
  }

  if (isClient) {
    watchEffect(() => {
      if (props.disabled?.()) {
        clearLongPress()
      }

      onWatcherCleanup(() => {
        clearLongPress()
      })
    })
  }

  function onContextmenu(event: MouseEvent) {
    if (event.defaultPrevented) {
      return
    }
    if (props.disabled?.()) {
      return
    }
    // clearing the long press here because some platforms already support
    // long press to trigger a `contextmenu` event
    clearLongPress()
    handleOpen(event)
    event.preventDefault()
  }

  function onPointerdown(event: PointerEvent) {
    if (event.defaultPrevented) {
      return
    }
    if (event.pointerType === 'mouse')
      return
      // clear the long press here in case there's multiple touch points
    clearLongPress()
    longPressTimerRef = window.setTimeout(() => handleOpen(event), 700)
  }

  function onPointermove(event: PointerEvent) {
    if (event.defaultPrevented) {
      return
    }
    if (event.pointerType === 'mouse')
      return
    clearLongPress()
  }

  function onPointercancel(event: PointerEvent) {
    if (event.defaultPrevented) {
      return
    }
    if (event.pointerType === 'mouse')
      return
    clearLongPress()
  }

  function onPointerup(event: PointerEvent) {
    if (event.defaultPrevented) {
      return
    }
    if (event.pointerType === 'mouse')
      return
    clearLongPress()
  }

  onBeforeUnmount(() => {
    clearLongPress()
  })

  // COMP::MenuAnchor COMP::PopperAnchor

  popperContext.onAnchorChange(virtualRef)

  return {
    attrs(extraAttrs) {
      const attrs = {
        'data-state': context.open.value ? 'open' : 'closed',
        'data-disabled': props.disabled?.() ? '' : undefined,
        'style': '-webkit-touch-callout: none;',
        onContextmenu,
        onPointerdown,
        onPointermove,
        onPointercancel,
        onPointerup,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
