<script setup lang="ts">
import { useRef } from '../hooks/index.ts'
import { useForwardElement } from '../hooks/useForwardElement.ts'
import { composeEventHandlers } from '../shared/index.ts'
import { useMenuContentContext } from './MenuContent.ts'
import { ITEM_SELECT, type MenuItemEmits, type MenuItemProps } from './MenuItem.ts'
import MenuItemImpl from './MenuItemImpl.vue'
import { SELECTION_KEYS, useMenuRootContext } from './MenuRoot.ts'

defineOptions({
  name: 'MenuItem',
})

const props = withDefaults(defineProps<MenuItemProps>(), {
  disabled: false,
})
const emit = defineEmits<MenuItemEmits>()

const elRef = useRef<HTMLDivElement>()
const forwardElement = useForwardElement(elRef)
const rootContext = useMenuRootContext('MenuItem')
const contentContext = useMenuContentContext('MenuItem')
let isPointerDownRef = false

const onClick = composeEventHandlers<MouseEvent>((event) => {
  emit('click', event)
}, () => {
  if (props.disabled || !elRef.current)
    return

  const itemSelectEvent = new CustomEvent(ITEM_SELECT, { bubbles: true, cancelable: true })
  emit('select', itemSelectEvent)

  if (itemSelectEvent.defaultPrevented) {
    isPointerDownRef = false
  }
  else {
    rootContext.onClose()
  }
})

function onPointerdown() {
  isPointerDownRef = true
}

const onPointerup = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerup', event)
}, (event) => {
  if (event.defaultPrevented)
    return
  // Pointer down can move to a different menu item which should activate it on pointer up.
  // We dispatch a click for selection to allow composition with click based triggers and to
  // prevent Firefox from getting stuck in text selection mode when the menu closes.
  if (!isPointerDownRef)
    (event.currentTarget as HTMLElement | null)?.click()
})

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  emit('keydown', event)
}, (event) => {
  const isTypingAhead = contentContext.searchRef.current !== ''

  if (props.disabled || (isTypingAhead && event.key === ' '))
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
})
</script>

<template>
  <MenuItemImpl
    :ref="forwardElement"
    :disabled="disabled"
    @click="onClick"
    @pointerdown="onPointerdown"
    @pointerup="onPointerup"
    @keydown="onKeydown"
  >
    <slot />
  </MenuItemImpl>
</template>
