import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveDefaultProps, PrimitiveElAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import { computed, onMounted, shallowRef, watchEffect } from 'vue'
import { DATA_COLLECTION_ITEM } from '../collection/index.ts'
import { usePopperContext } from '../popper/index.ts'
import { useRovingFocusGroupItem } from '../roving-focus/index.ts'
import { useMenubarMenuContext } from './MenubarMenu.ts'
import { Collection, type ItemData, useMenubarContext } from './MenubarRoot.ts'

export interface MenubarTriggerProps {
  as?: PrimitiveProps['as']
  disabled?: boolean
}

export const DEFAULT_MENUBAR_TRIGGER_PROPS = {
  as: 'button',
  disabled: undefined,
} satisfies PrimitiveDefaultProps<MenubarTriggerProps>

export interface UseMenubarTriggerProps {
  disabled?: () => boolean | undefined
}

export function useMenubarTrigger(props: UseMenubarTriggerProps = {}): RadixPrimitiveReturns {
  const context = useMenubarContext('MenubarTrigger')
  const menuContext = useMenubarMenuContext('MenubarTrigger')
  const popperContext = usePopperContext('MenubarTrigger')

  const itemData: ItemData['$menubar'] = {
    value: menuContext.value,
    disabled: props.disabled?.() ?? false,
  }

  watchEffect(() => {
    itemData.value = menuContext.value
    itemData.disabled = props.disabled?.() ?? false
  })

  const isFocused = shallowRef(false)
  const open = computed(() => context.value.value === menuContext.value)

  // Handlers

  function onPointerdown(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
    // but not when the control key is pressed (avoiding MacOS right click)
    if (event.button === 0 && event.ctrlKey === false) {
      context.onMenuOpen(menuContext.value)
      // prevent trigger focusing when opening
      // this allows the content to be given focus without competition
      if (!open.value)
        event.preventDefault()
    }
  }

  function onPointerenter(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    const menubarOpen = Boolean(context.value.value)
    if (menubarOpen && !open.value) {
      context.onMenuOpen(menuContext.value)
      menuContext.triggerRef.value?.focus()
    }
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented)
      return
    if (['Enter', ' '].includes(event.key))
      context.onMenuToggle(menuContext.value)
    if (event.key === 'ArrowDown')
      context.onMenuOpen(menuContext.value)
    // prevent keydown from scrolling window / first focused item to execute
    // that keydown (inadvertently closing the menu)
    if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
      menuContext.wasKeyboardTriggerOpenRef.value = true
      event.preventDefault()
    }
  }

  function onFocus(event: FocusEvent) {
    if (event.defaultPrevented)
      return
    isFocused.value = true
  }

  function onBlur(event: FocusEvent) {
    if (event.defaultPrevented)
      return
    isFocused.value = false
  }

  function setTemplateEl(v: HTMLElement | undefined) {
    menuContext.triggerRef.value = v
    Collection.useCollectionItem(v, itemData, '$menubar')
  }

  onMounted(() => {
    popperContext.onAnchorChange(menuContext.triggerRef.value)
  })

  const rovingFocusGroupItem = useRovingFocusGroupItem({
    focusable() {
      return !props.disabled?.()
    },
    tabStopId() {
      return menuContext.value
    },
  })

  return {
    attrs(extraAttrs = []) {
      const _open = open.value
      const _disabled = props.disabled?.()
      const rovingFocusGroupItemAttrs: PrimitiveElAttrs = {
        'id': menuContext.triggerId,
        'elRef': setTemplateEl,
        'type': 'button',
        'role': 'menuitem',
        'aria-haspopup': 'menu',
        'aria-expanded': _open,
        'aria-controls': _open ? menuContext.contentId : undefined,
        'data-highlighted': isFocused.value ? '' : undefined,
        'data-state': _open ? 'open' : 'closed',
        'data-disabled': _disabled ? '' : undefined,
        'disabled': _disabled,
        [DATA_COLLECTION_ITEM]: true,
        onPointerdown,
        onPointerenter,
        onKeydown,
        onFocus,
        onBlur,
      }

      return rovingFocusGroupItem.attrs([rovingFocusGroupItemAttrs, ...extraAttrs])
    },
  }
}
