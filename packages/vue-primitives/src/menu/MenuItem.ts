import type { EmitsToHookProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { useMenuContentContext } from './MenuContentImpl.ts'
import { useMenuItemImpl, type UseMenuItemImplProps } from './MenuItemImpl.ts'
import { SELECTION_KEYS, useMenuRootContext } from './MenuRoot.ts'

export type MenuItemProps = {
  disabled?: boolean
  textValue?: string
}

export type MenuItemEmits = {
  select: [event: Event]
}

export const ITEM_SELECT = 'menu.itemSelect'

export interface UseMenuItemProps extends UseMenuItemImplProps, EmitsToHookProps<MenuItemEmits> {}

export function useMenuItem(props: UseMenuItemProps = {}): RadixPrimitiveReturns {
  const rootContext = useMenuRootContext('MenuItem')
  const contentContext = useMenuContentContext('MenuItem')

  let elRef: HTMLElement | undefined
  function setTemplateEl(v: HTMLElement | undefined) {
    elRef = v
  }

  let isPointerDownRef = false

  function onClick(event: MouseEvent) {
    if (event.defaultPrevented)
      return

    if (!elRef)
      return

    const itemSelectEvent = new CustomEvent(ITEM_SELECT, { bubbles: true, cancelable: true })
    props.onSelect?.(itemSelectEvent)

    if (itemSelectEvent.defaultPrevented) {
      isPointerDownRef = false
    }
    else {
      rootContext.onClose()
    }
  }

  function onPointerdown() {
    isPointerDownRef = true
  }

  function onPointerup(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    // Pointer down can move to a different menu item which should activate it on pointer up.
    // We dispatch a click for selection to allow composition with click based triggers and to
    // prevent Firefox from getting stuck in text selection mode when the menu closes.
    if (!isPointerDownRef)
      (event.currentTarget as HTMLElement | null)?.click()
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented)
      return
    const isTypingAhead = contentContext.searchRef.value !== ''

    if ((isTypingAhead && event.key === ' '))
      return

    if (SELECTION_KEYS.includes(event.key)) {
      (event.currentTarget as HTMLElement | null)?.click()
      /**
       * We prevent default browser behaviour for selection keys as they should trigger
       * a selection only:
       * - prevents space from scrolling the page.
       * - if keydown causes focus to move, prevents keydown from firing on the new target.
       */

      event.preventDefault()
    }
  }

  const menuItemImpl = useMenuItemImpl({
    disabled: props.disabled,
    textValue: props.textValue,
  })

  return {
    attrs(extraAttrs = []) {
      const attrs = {
        elRef: setTemplateEl,
        onClick,
        onPointerdown,
        onPointerup,
        onKeydown,
      }

      return menuItemImpl.attrs([attrs, ...extraAttrs])
    },
  }
}
