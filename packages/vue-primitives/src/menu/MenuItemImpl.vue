<script setup lang="ts">
import type { MenuItemImplEmits, MenuItemImplProps } from './MenuItemImpl.ts'
import { shallowRef, watchEffect } from 'vue'
import { DATA_COLLECTION_ITEM } from '../collection/index.ts'
import { useComposedElements } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { useRovingFocusGroupItem } from '../roving-focus/index.ts'
import { composeEventHandlers } from '../shared/index.ts'
import { useMenuContentContext } from './MenuContent.ts'
import { Collection, type ItemData } from './MenuRoot.ts'

defineOptions({
  name: 'MenuItemImpl',
})

const props = defineProps<MenuItemImplProps>()
const emit = defineEmits<MenuItemImplEmits>()

const contentContext = useMenuContentContext('MenuItemImpl')

const $el = shallowRef<HTMLDivElement>()

const isFocused = shallowRef(false)

const itemData: ItemData['menu'] = { disabled: props.disabled, textValue: props.textValue || '' }
watchEffect(() => {
  itemData.disabled = props.disabled
  itemData.textValue = props.textValue ?? $el.value?.textContent ?? ''
})

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
const onPointermove = composeEventHandlers<PointerEvent>(
  (event) => {
    emit('pointermove', event)
  },
  (event) => {
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
  },
)

const onPointerleave = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerleave', event)
}, (event) => {
  if (event.pointerType !== 'mouse')
    return

  contentContext.onItemLeave(event)
})

const onBlur = composeEventHandlers<FocusEvent>((event) => {
  emit('blur', event)
}, () => {
  isFocused.value = false
})

// RovingFocusGroupItem

const rovingFocusGroupItem = useRovingFocusGroupItem({
  focusable() {
    return !props.disabled
  },
}, {
  onMousedown(event) {
    emit('mousedown', event)
  },
  onFocus(event) {
    emit('focus', event)
  },
  onKeydown(event) {
    emit('keydown', event)
  },
})

const onFocus = composeEventHandlers<FocusEvent>(
  rovingFocusGroupItem.onFocus,
  () => {
    isFocused.value = true
  },
)

const forwardElement = useComposedElements<HTMLDivElement>((v) => {
  rovingFocusGroupItem.useCollectionItem(v, rovingFocusGroupItem.itemData, rovingFocusGroupItem.collectionKey)
  Collection.useCollectionItem(v, itemData, 'menu')
  $el.value = v
})
</script>

<template>
  <Primitive
    :ref="forwardElement"

    :[DATA_COLLECTION_ITEM]="true"

    :tabindex="rovingFocusGroupItem.tabindex()"
    :data-orientation="rovingFocusGroupItem.orientation()"

    role="menuitem"
    :data-highlighted="isFocused ? '' : undefined"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled ? '' : undefined"

    @mousedown="rovingFocusGroupItem.onMousedown"
    @keydown="rovingFocusGroupItem.onKeydown"

    @pointermove="onPointermove"
    @pointerleave="onPointerleave"
    @focus="onFocus"
    @blur="onBlur"
  >
    <slot />
  </Primitive>
</template>
