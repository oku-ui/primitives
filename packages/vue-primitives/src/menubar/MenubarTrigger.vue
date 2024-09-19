<script setup lang="ts">
import type { MenubarTriggerEmits, MenubarTriggerProps } from './MenubarTrigger.ts'
import { computed, onMounted, shallowRef, watchEffect } from 'vue'
import { DATA_COLLECTION_ITEM } from '../collection/index.ts'
import { useComposedElements } from '../hooks/index.ts'
import { usePopperContext } from '../popper/index.ts'
import { Primitive } from '../primitive/index.ts'
import { useRovingFocusGroupItem } from '../roving-focus/RovingFocusGroupItem.ts'
import { composeEventHandlers } from '../shared/index.ts'
import { useMenubarMenuContext } from './MenubarMenu.ts'
import { Collection, type ItemData, useMenubarContext } from './MenubarRoot.ts'

defineOptions({
  name: 'MenubarTrigger',
})

const props = withDefaults(defineProps<MenubarTriggerProps>(), {
  as: 'button',
  disabled: false,
})
const emit = defineEmits<MenubarTriggerEmits>()

const context = useMenubarContext('MenubarTrigger')
const menuContext = useMenubarMenuContext('MenubarTrigger')
const popperContext = usePopperContext('MenubarTrigger')

const itemData: ItemData['$menubar'] = {
  value: menuContext.value,
  disabled: props.disabled,
}

watchEffect(() => {
  itemData.value = menuContext.value
  itemData.disabled = props.disabled
})

const isFocused = shallowRef(false)
const open = computed(() => context.value.value === menuContext.value)

// Handlers

const onPointerdown = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerdown', event)
}, (event) => {
  // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
  // but not when the control key is pressed (avoiding MacOS right click)
  if (!props.disabled && event.button === 0 && event.ctrlKey === false) {
    context.onMenuOpen(menuContext.value)
    // prevent trigger focusing when opening
    // this allows the content to be given focus without competition
    if (!open.value)
      event.preventDefault()
  }
})

const onPointerenter = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerenter', event)
}, () => {
  const menubarOpen = Boolean(context.value.value)
  if (menubarOpen && !open.value) {
    context.onMenuOpen(menuContext.value)
    menuContext.triggerRef.current?.focus()
  }
})

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  emit('keydown', event)
}, (event) => {
  if (props.disabled)
    return
  if (['Enter', ' '].includes(event.key))
    context.onMenuToggle(menuContext.value)
  if (event.key === 'ArrowDown')
    context.onMenuOpen(menuContext.value)
  // prevent keydown from scrolling window / first focused item to execute
  // that keydown (inadvertently closing the menu)
  if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
    menuContext.wasKeyboardTriggerOpenRef.current = true
    event.preventDefault()
  }
})

const onFocus = composeEventHandlers<FocusEvent>((event) => {
  emit('focus', event)
}, () => {
  isFocused.value = true
})

const onBlur = composeEventHandlers<FocusEvent>((event) => {
  emit('blur', event)
}, () => {
  isFocused.value = false
})

// COMP::RovingFocusGroupItem
const rovingFocusGroupItem = useRovingFocusGroupItem({
  focusable() {
    return !props.disabled
  },
  tabStopId() {
    return menuContext.value
  },
}, {
  onMousedown(event) {
    emit('mousedown', event)
  },
  onFocus,
  onKeydown,
})

// COMP::PopperAnchor
onMounted(() => {
  popperContext.onAnchorChange(menuContext.triggerRef.current)
})

const forwardElement = useComposedElements<HTMLButtonElement>((v) => {
  menuContext.triggerRef.current = v
  Collection.useCollectionItem(v, itemData, '$menubar')
  rovingFocusGroupItem.useCollectionItem(v, rovingFocusGroupItem.itemData, rovingFocusGroupItem.collectionKey)
})
</script>

<template>
  <Primitive
    :id="menuContext.triggerId"
    :ref="forwardElement"
    :as="as"
    type="button"
    role="menuitem"
    aria-haspopup="menu"
    :aria-expanded="open"
    :aria-controls="open ? menuContext.contentId : undefined"
    :data-highlighted="isFocused ? '' : undefined"
    :data-state="open ? 'open' : 'closed'"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"

    :[DATA_COLLECTION_ITEM]="true"
    :tabindex="rovingFocusGroupItem.tabindex()"
    :data-orientation="rovingFocusGroupItem.orientation()"

    @pointerdown="onPointerdown"
    @pointerenter="onPointerenter"
    @blur="onBlur"

    @mousedown="rovingFocusGroupItem.onMousedown"
    @focus="rovingFocusGroupItem.onFocus"
    @keydown="rovingFocusGroupItem.onKeydown"
  >
    <slot />
  </Primitive>
</template>
