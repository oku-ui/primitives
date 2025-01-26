import type { MenuContentImplEmits, MenuContentImplProps, UseMenuContentImplProps, UseMenuContentImplSharedPeturns } from '../menu/index.ts'
import type { PrimitiveDefaultProps } from '../shared/index.ts'
import { useMenuContentImpl } from '../menu/index.ts'
import { useDropdownMenuContext } from './DropdownMenuRoot.ts'

export interface DropdownMenuContentImplProps extends MenuContentImplProps {}

export const DEFAULT_DROPDOWN_MENU_CONTENT_PROPS = {
  avoidCollisions: undefined,
  hideWhenDetached: undefined,
  loop: undefined,
} satisfies PrimitiveDefaultProps<DropdownMenuContentImplProps>

export type DropdownMenuContentImplEmits = MenuContentImplEmits

export interface UseDropdownMenuContentImplProps extends UseMenuContentImplProps {}

export function useDropdownMenuContentImpl(props: UseDropdownMenuContentImplProps = {}): UseMenuContentImplSharedPeturns {
  const context = useDropdownMenuContext('DropdownMenuContent')

  let hasInteractedOutsideRef = false

  const menuContentImpl = useMenuContentImpl({
    ...props,
    onCloseAutoFocus(event) {
      props.onCloseAutoFocus?.(event)
      if (event.defaultPrevented)
        return

      if (!hasInteractedOutsideRef) {
        context.triggerRef.value?.focus()
      }
      hasInteractedOutsideRef = false
      // Always prevent auto focus because we either focus manually or want user agent focus
      event.preventDefault()
    },
    onInteractOutside(event) {
      props.onInteractOutside?.(event)
      if (event.defaultPrevented)
        return

      const originalEvent = event.detail.originalEvent as PointerEvent
      const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true
      const isRightClick = originalEvent.button === 2 || ctrlLeftClick
      if (!context.modal || isRightClick)
        hasInteractedOutsideRef = true
    },
  })

  const style = {
    '--radix-dropdown-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
    '--radix-dropdown-menu-content-available-width': 'var(--radix-popper-available-width)',
    '--radix-dropdown-menu-content-available-height': 'var(--radix-popper-available-height)',
    '--radix-dropdown-menu-trigger-width': 'var(--radix-popper-anchor-width)',
    '--radix-dropdown-menu-trigger-height': 'var(--radix-popper-anchor-height)',
  }

  return {
    wrapperAttrs: menuContentImpl.wrapperAttrs,
    attrs(extraAttrs = []) {
      const menuContentImplAttrs = {
        'id': context.contentId,
        'aria-labelledby': context.triggerId,
        style,
      }

      return menuContentImpl.attrs([menuContentImplAttrs, ...extraAttrs])
    },
  }
}
