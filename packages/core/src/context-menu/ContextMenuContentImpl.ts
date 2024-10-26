import type { PrimitiveDefaultProps } from '../shared/index.ts'
import {
  type MenuContentImplEmits,
  type MenuContentImplProps,
  useMenuContentImpl,
  type UseMenuContentImplProps,
  type UseMenuContentImplSharedPeturns,
} from '../menu/index.ts'
import { useContextMenuContext } from './ContextMenuRoot.ts'

export interface ContextMenuContentImplProps extends Omit<MenuContentImplProps, 'side' | 'sideOffset' | 'align'> {}

export const DEFAULT_CONTEXT_MENU_CONTENT_IMPL_PROPS = {
  avoidCollisions: undefined,
  hideWhenDetached: undefined,
  loop: undefined,
} satisfies PrimitiveDefaultProps<ContextMenuContentImplProps>

export type ContextMenuContentImplEmits = Omit<MenuContentImplEmits, 'entryFocus'>

export interface UseContextMenuContentImplProps extends Omit<UseMenuContentImplProps, 'onEntryFocus' | 'popperProps' | 'side' | 'sideOffset' | 'align'> {
}

export function useContextMenuContentImpl(props: UseContextMenuContentImplProps = {}): UseMenuContentImplSharedPeturns {
  const context = useContextMenuContext('ContextMenuContent')
  let hasInteractedOutsideRef = false

  const menuContentImpl = useMenuContentImpl({
    ...props,
    onCloseAutoFocus(event: Event) {
      props.onCloseAutoFocus?.(event)

      if (!event.defaultPrevented && hasInteractedOutsideRef) {
        event.preventDefault()
      }

      hasInteractedOutsideRef = false
    },
    onInteractOutside(event) {
      props.onInteractOutside?.(event)

      if (!event.defaultPrevented && !context.modal)
        hasInteractedOutsideRef = true
    },
    side: 'right',
    sideOffset: 2,
    align: 'start',
  })

  const attrs = {
    style: {
      '--radix-context-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
      '--radix-context-menu-content-available-width': 'var(--radix-popper-available-width)',
      '--radix-context-menu-content-available-height': 'var(--radix-popper-available-height)',
      '--radix-context-menu-trigger-width': 'var(--radix-popper-anchor-width)',
      '--radix-context-menu-trigger-height': 'var(--radix-popper-anchor-height)',
    },
  }

  return {
    wrapperAttrs: menuContentImpl.wrapperAttrs,
    attrs(extraAttrs = []) {
      return menuContentImpl.attrs([attrs, ...extraAttrs])
    },
  }
}
