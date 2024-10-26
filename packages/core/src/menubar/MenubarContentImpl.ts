import { type MenuContentImplEmits, type MenuContentImplProps, useMenuContentImpl, type UseMenuContentImplProps, type UseMenuContentImplSharedPeturns } from '../menu/index.ts'
import { type PrimitiveDefaultProps, wrapArray } from '../shared/index.ts'
import { useMenubarMenuContext } from './MenubarMenu.ts'
import { useCollection, useMenubarContext } from './MenubarRoot.ts'

export interface MenubarContentImplProps extends MenuContentImplProps {}

export const DEFAULT_MENUBAR_CONTENT_IMPL_PROPS = {
  avoidCollisions: undefined,
  hideWhenDetached: undefined,
  loop: undefined,
} satisfies PrimitiveDefaultProps<MenubarContentImplProps>

export type MenubarContentImplEmits = Omit<MenuContentImplEmits, 'entryFocus'>

export interface UseMenubarContentImplProps extends Omit<UseMenuContentImplProps, 'onEntryFocus'> { }

export function useMenubarContentImpl(props: UseMenubarContentImplProps = {}): UseMenuContentImplSharedPeturns {
  const { align = 'start' } = props
  const context = useMenubarContext('MenubarContent')
  const menuContext = useMenubarMenuContext('MenubarContent')
  const getItems = useCollection()
  let hasInteractedOutsideRef = false

  function onKeydown(event: KeyboardEvent) {
    if (!['ArrowRight', 'ArrowLeft'].includes(event.key))
      return
    const target = event.target as HTMLElement
    const targetIsSubTrigger = target.hasAttribute('data-radix-menubar-subtrigger')
    const isKeyDownInsideSubMenu = target.closest('[data-radix-menubar-content]') !== event.currentTarget

    const prevMenuKey = context.dir.value === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
    const isPrevKey = prevMenuKey === event.key
    const isNextKey = !isPrevKey

    // Prevent navigation when we're opening a submenu
    if (isNextKey && targetIsSubTrigger)
      return
    // or we're inside a submenu and are moving backwards to close it
    if (isKeyDownInsideSubMenu && isPrevKey)
      return

    let candidateValues: string[] = []

    for (const item of getItems()) {
      if (item.$$rcid.$menubar.disabled)
        continue
      candidateValues.push(item.$$rcid.$menubar.value)
    }

    if (isPrevKey)
      candidateValues.reverse()

    const currentIndex = candidateValues.indexOf(menuContext.value)

    candidateValues = context.loop
      ? wrapArray(candidateValues, currentIndex + 1)
      : candidateValues.slice(currentIndex + 1)

    const [nextValue] = candidateValues
    if (nextValue)
      context.onMenuOpen(nextValue)
  }

  const menuContentImpl = useMenuContentImpl({
    ...props,
    align,
    onCloseAutoFocus(event) {
      props.onCloseAutoFocus?.(event)
      if (event.defaultPrevented)
        return

      const menubarOpen = Boolean(context.value.value)
      if (!menubarOpen && !hasInteractedOutsideRef) {
        menuContext.triggerRef.value?.focus()
      }

      hasInteractedOutsideRef = false
      // Always prevent auto focus because we either focus manually or want user agent focus
      event.preventDefault()
    },
    onFocusOutside(event) {
      props.onFocusOutside?.(event)

      if (event.defaultPrevented)
        return

      const target = event.target as HTMLElement
      const isMenubarTrigger = getItems().some(item => item?.contains(target))
      if (isMenubarTrigger)
        event.preventDefault()
    },
    onInteractOutside(event) {
      props.onInteractOutside?.(event)

      if (event.defaultPrevented)
        return

      hasInteractedOutsideRef = true
    },
    onEntryFocus(event) {
      if (!menuContext.wasKeyboardTriggerOpenRef.value)
        event.preventDefault()
    },
  })

  const attrs = {
    'id': menuContext.contentId,
    'aria-labelledby': menuContext.triggerId,
    'data-radix-menubar-content': '',
    'style': {
      // re-namespace exposed content custom properties
      '--radix-menubar-content-transform-origin': 'var(--radix-popper-transform-origin)',
      '--radix-menubar-content-available-width': 'var(--radix-popper-available-width)',
      '--radix-menubar-content-available-height': 'var(--radix-popper-available-height)',
      '--radix-menubar-trigger-width': 'var(--radix-popper-anchor-width)',
      '--radix-menubar-trigger-height': 'var(--radix-popper-anchor-height)',
    },
    onKeydown,
  }

  return {
    wrapperAttrs: menuContentImpl.wrapperAttrs,
    attrs(extraAttrs = []) {
      return menuContentImpl.attrs([attrs, ...extraAttrs])
    },
  }
}
