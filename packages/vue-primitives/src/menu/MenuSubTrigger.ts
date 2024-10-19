import type { PrimitiveDefaultProps, PrimitiveElAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import type { Side } from './utils.ts'
import { onBeforeUnmount, onMounted } from 'vue'
import { usePopperContext } from '../popper/index.ts'
import { useMenuContentContext } from './MenuContentImpl.ts'
import { type MenuItemImplProps, useMenuItemImpl, type UseMenuItemImplProps } from './MenuItemImpl.ts'
import { SUB_OPEN_KEYS, useMenuContext, useMenuRootContext } from './MenuRoot.ts'
import { useMenuSubContext } from './MenuSub.ts'

export interface MenuSubTriggerProps extends MenuItemImplProps {
}

export const DEFAULT_MENU_SUB_TRIGGER_PROPS = {
  disabled: undefined,
} satisfies PrimitiveDefaultProps<MenuSubTriggerProps>

export interface UseMenuSubTriggerProps extends UseMenuItemImplProps {

}

export function useMenuSubTrigger(props: UseMenuSubTriggerProps): RadixPrimitiveReturns {
  const context = useMenuContext('MenuSubTrigger')
  const rootContext = useMenuRootContext('MenuSubTrigger')
  const subContext = useMenuSubContext('MenuSubTrigger')
  const contentContext = useMenuContentContext('MenuSubTrigger')
  const popperContext = usePopperContext('MenuSubTrigger')

  function setTemplateEl(v: HTMLElement | undefined) {
    subContext.trigger.value = v
  }

  onMounted(() => {
    popperContext.onAnchorChange(subContext.trigger.value)
  })

  let openTimerRef: number = 0

  function clearOpenTimer() {
    if (openTimerRef) {
      window.clearTimeout(openTimerRef)
      openTimerRef = 0
    }
  }

  onBeforeUnmount(() => {
    clearOpenTimer()

    if (contentContext.pointerGraceTimerRef.value) {
      window.clearTimeout(contentContext.pointerGraceTimerRef.value)
      contentContext.pointerGraceTimerRef.value = 0
    }
    contentContext.onPointerGraceIntentChange(undefined)
  })

  function onClick(event: MouseEvent) {
    if (event.defaultPrevented) {
      return
    }
    /**
     * We manually focus because iOS Safari doesn't always focus on click (e.g. buttons)
     * and we rely heavily on `onFocusOutside` for submenus to close when switching
     * between separate submenus.
     */
    ;(event.currentTarget as HTMLElement).focus()
    if (!context.open())
      context.onOpenChange(true)
  }

  function onPointermove(event: PointerEvent) {
    if (event.defaultPrevented) {
      return
    }

    if (event.pointerType !== 'mouse')
      return

    contentContext.onItemEnter(event)

    if (event.defaultPrevented)
      return

    if (!context.open() && !openTimerRef) {
      contentContext.onPointerGraceIntentChange(undefined)

      openTimerRef = window.setTimeout(() => {
        context.onOpenChange(true)
        clearOpenTimer()
        openTimerRef = 0
      }, 100)
    }
  }

  function onPointerleave(event: PointerEvent) {
    if (event.defaultPrevented) {
      return
    }

    if (event.pointerType !== 'mouse')
      return

    clearOpenTimer()

    const contentRect = popperContext.content.value?.getBoundingClientRect()
    if (contentRect) {
      // TODO: make sure to update this when we change positioning logic
      const side = popperContext.content.value?.dataset.side as Side
      const rightSide = side === 'right'
      const bleed = rightSide ? -5 : +5
      const contentNearEdge = contentRect[rightSide ? 'left' : 'right']
      const contentFarEdge = contentRect[rightSide ? 'right' : 'left']

      contentContext.onPointerGraceIntentChange({
        area: [
          // Apply a bleed on clientX to ensure that our exit point is
          // consistently within polygon bounds
          [event.clientX + bleed, event.clientY],
          [contentNearEdge, contentRect.top],
          [contentFarEdge, contentRect.top],
          [contentFarEdge, contentRect.bottom],
          [contentNearEdge, contentRect.bottom],
        ],
        side,
      })

      if (contentContext.pointerGraceTimerRef.value) {
        window.clearTimeout(contentContext.pointerGraceTimerRef.value)
      }
      contentContext.pointerGraceTimerRef.value = window.setTimeout(
        () => {
          contentContext.onPointerGraceIntentChange(undefined)
          contentContext.pointerGraceTimerRef.value = 0
        },
        300,
      )
    }
    else {
      contentContext.onTriggerLeave(event)
      if (event.defaultPrevented)
        return

      // There's 100ms where the user may leave an item before the submenu was opened.
      contentContext.onPointerGraceIntentChange(undefined)
    }
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return
    }
    const isTypingAhead = contentContext.searchRef.value !== ''

    if (isTypingAhead && event.key === ' ')
      return

    if (SUB_OPEN_KEYS[rootContext.dir.value].includes(event.key)) {
      context.onOpenChange(true)
      // The trigger may hold focus if opened via pointer interaction
      // so we ensure content is given focus again when switching to keyboard.
      popperContext.content.value?.focus()
      // prevent window from scrolling
      event.preventDefault()
    }
  }

  const menuItem = useMenuItemImpl(props)

  return {
    attrs(extraAttrs = []) {
      const _open = context.open()
      const rovingFocusGroupItemAttrs: PrimitiveElAttrs = {
        'id': subContext.triggerId,
        'elRef': setTemplateEl,
        'aria-haspopup': 'menu',
        'aria-expanded': _open ? 'true' : 'false',
        'aria-controls': subContext.contentId,
        'data-state': _open ? 'open' : 'closed',
        onClick,
        onPointermove,
        onPointerleave,
        onKeydown,
      }

      return menuItem.attrs([rovingFocusGroupItemAttrs, ...extraAttrs])
    },
  }
}
