import type { RadixPrimitiveReturns } from '../shared'
import { shallowRef, watchEffect } from 'vue'
import { DATA_COLLECTION_ITEM } from '../collection/index.ts'
import { useRovingFocusGroupItem } from '../roving-focus/index.ts'
import { useMenuContentContext } from './MenuContentImpl.ts'
import { Collection, type ItemData } from './MenuRoot.ts'

export interface MenuItemImplProps {
  disabled?: boolean
  textValue?: string
}

export interface UseMenuItemImplProps {
  disabled?: () => boolean | undefined
  textValue?: string
}

export function useMenuItemImpl(props: UseMenuItemImplProps): RadixPrimitiveReturns {
  const contentContext = useMenuContentContext('MenuItemImpl')

  const el = shallowRef<HTMLElement>()
  const itemData: ItemData['menu'] = { disabled: props.disabled?.(), textValue: props.textValue || '' }

  watchEffect(() => {
    itemData.disabled = props.disabled?.()
    itemData.textValue = props.textValue ?? el.value?.textContent ?? ''
  })

  function setTemplateEl(v: HTMLElement | undefined) {
    el.value = v
    Collection.useCollectionItem(v, itemData, 'menu')
  }

  const isFocused = shallowRef(false)

  /**
   * We focus items on `pointerMove` to achieve the following:
   *
   * - Mouse over an item (it focuses)
   * - Leave mouse where it is and use keyboard to focus a different item
   * - Wiggle mouse without it leaving previously focused item
   * - Previously focused item should re-focus
   *
   * If we used `mouseOver`/`mouseEnter` it would not re-focus when the mouse
   * wiggles. This is to match native menu implementation.
   */
  function onPointermove(event: PointerEvent) {
    if (event.defaultPrevented)
      return

    if (event.pointerType !== 'mouse')
      return

    if (props.disabled) {
      contentContext.onItemLeave(event)
    }
    else {
      contentContext.onItemEnter(event)
      if (!event.defaultPrevented) {
        const item = event.currentTarget as HTMLElement | null
        item?.focus({ preventScroll: true })
      }
    }
  }

  function onPointerleave(event: PointerEvent) {
    if (event.pointerType !== 'mouse')
      return

    contentContext.onItemLeave(event)
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

  const rovingFocusGroupItem = useRovingFocusGroupItem({
    focusable() {
      return !props.disabled?.()
    },
  })

  return {
    attrs(extraAttrs = []) {
      const _disabled = props.disabled?.()

      const rovingFocusGroupItemAttrs = {
        'elRef': setTemplateEl,
        [DATA_COLLECTION_ITEM]: true,
        'role': 'menuitem',
        'data-highlighted': isFocused.value ? '' : undefined,
        'aria-disabled': _disabled || undefined,
        'data-disabled': _disabled ? '' : undefined,
        onPointermove,
        onPointerleave,
        onFocus,
        onBlur,
      }

      return rovingFocusGroupItem.attrs([rovingFocusGroupItemAttrs, ...extraAttrs])
    },
  }
}
