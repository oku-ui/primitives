import type { FocusOutsideEvent } from '../dismissable-layer/index.ts'
import { type PopperContentProps, usePopperContext } from '../popper/index.ts'
import { useMenuContentImplShared, type UseMenuContentImplSharedEmits, type UseMenuContentImplSharedPeturns, type UseMenuContentImplSharedPrivateProps, type UseMenuContentImplSharedProps } from './MenuContentImpl.ts'
import { SUB_CLOSE_KEYS, useMenuContext, useMenuRootContext } from './MenuRoot.ts'
import { useMenuSubContext } from './MenuSub.ts'

export interface MenuSubContentProps extends Omit<PopperContentProps, 'dir' | 'side' | 'align'> {
  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop?: boolean
}

export type MenuSubContentEmits = Omit<UseMenuContentImplSharedEmits, 'closeAutoFocus' | 'entryFocus'>

export interface UseMenuSubContentProps extends Omit<UseMenuContentImplSharedProps, keyof UseMenuContentImplSharedPrivateProps | 'onCloseAutoFocus' | 'onEntryFocus' | 'popperProps'> {
  popperProps?: Omit<UseMenuContentImplSharedProps['popperProps'], 'side' | 'align'>
}

export function useMenuSubContent(props: UseMenuSubContentProps): UseMenuContentImplSharedPeturns {
  const context = useMenuContext('MenuSubContent')
  const rootContext = useMenuRootContext('MenuSubContent')
  const subContext = useMenuSubContext('MenuSubContent')
  const popperContext = usePopperContext('MenuSubContent')

  function onOpenAutoFocus(event: Event) {
    // when opening a submenu, focus content for keyboard users only
    if (rootContext.isUsingKeyboardRef.value) {
      popperContext.content.value?.focus()
    }
    event.preventDefault()
  }
  // The menu might close because of focusing another menu item in the parent menu. We
  // don't want it to refocus the trigger in that case so we handle trigger focus ourselves.
  function onCloseAutoFocus(event: Event) {
    event.preventDefault()
  }
  function onFocusOutside(event: FocusOutsideEvent) {
    if (event.defaultPrevented) {
      return
    }
    // We prevent closing when the trigger is focused to avoid triggering a re-open animation
    // on pointer interaction.
    if (event.target !== subContext.trigger.value) {
      context.onOpenChange(false)
    }
  }

  function onEscapeKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return
    }

    rootContext.onClose()
    // ensure pressing escape in submenu doesn't escape full screen mode
    event.preventDefault()
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return
    }
    // Submenu key events bubble through portals. We only care about keys in this menu.
    const isKeyDownInside = (event.currentTarget as HTMLElement).contains(event.target as HTMLElement)
    const isCloseKey = SUB_CLOSE_KEYS[rootContext.dir.value].includes(event.key)
    if (isKeyDownInside && isCloseKey) {
      context.onOpenChange(false)
      // We focus manually because we prevented it in `onCloseAutoFocus`

      subContext.trigger.value?.focus()
      // prevent window from scrolling
      event.preventDefault()
    }
  }

  const menuContentImplShared = useMenuContentImplShared({
    ...props,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onFocusOutside,
    onEscapeKeydown,
    popperProps: {
      ...props.popperProps,
      align: 'start',
      side: rootContext.dir.value === 'rtl' ? 'right' : 'left',
    },
  })

  return {
    wrapperAttrs: menuContentImplShared.wrapperAttrs,
    attrs(extraAttrs = []) {
      const attrs = {
        'aria-labelledby': subContext.triggerId,
        onKeydown,
      }

      return menuContentImplShared.attrs([attrs, ...extraAttrs])
    },
  }
}
