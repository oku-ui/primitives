<script setup lang="ts">
import type { ContextMenuTriggerEmits, ContextMenuTriggerProps } from './ContextMenuTrigger'
import { isClient } from '@vueuse/core'
import { onBeforeUnmount, onWatcherCleanup, watchEffect } from 'vue'
import { usePopperContext } from '../popper/index.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useContextMenuContext } from './ContextMenuRoot.ts'

defineOptions({
  name: 'ContextMenuTrigger',
})

const props = withDefaults(defineProps<ContextMenuTriggerProps>(), {
  as: 'span',
  disabled: false,
})

const emit = defineEmits<ContextMenuTriggerEmits>()

const context = useContextMenuContext('ContextMenuTrigger')
const popperContext = usePopperContext('ContextMenuTrigger')
const pointRef: DOMRectInit = { width: 0, height: 0, x: 0, y: 0 }
const virtualRef = {
  getBoundingClientRect() {
    return DOMRect.fromRect(pointRef)
  },
}
let longPressTimerRef = 0

function clearLongPress() {
  window.clearTimeout(longPressTimerRef)
}

function handleOpen(event: MouseEvent | PointerEvent) {
  pointRef.x = event.clientX
  pointRef.y = event.clientY
  context.onOpenChange(true)
}

if (isClient) {
  watchEffect(() => {
    if (props.disabled) {
      clearLongPress()
    }

    onWatcherCleanup(() => {
      clearLongPress()
    })
  })
}

const onContextmenu = composeEventHandlers<MouseEvent>((event) => {
  emit('contextmenu', event)
}, (event) => {
  if (props.disabled)
    return
  // clearing the long press here because some platforms already support
  // long press to trigger a `contextmenu` event
  clearLongPress()
  handleOpen(event)
  event.preventDefault()
})

const onPointerdown = composeEventHandlers<PointerEvent>(
  (event) => {
    emit('pointerdown', event)
  },
  (event) => {
    if (props.disabled)
      return
    if (event.pointerType === 'mouse')
      return
    // clear the long press here in case there's multiple touch points
    clearLongPress()
    longPressTimerRef = window.setTimeout(() => handleOpen(event), 700)
  },
)

const onPointermove = composeEventHandlers<PointerEvent>((event) => {
  emit('pointermove', event)
}, (event) => {
  if (props.disabled)
    return
  if (event.pointerType === 'mouse')
    return
  clearLongPress()
})

const onPointercancel = composeEventHandlers<PointerEvent>((event) => {
  emit('pointercancel', event)
}, (event) => {
  if (props.disabled)
    return
  if (event.pointerType === 'mouse')
    return
  clearLongPress()
})

const onPointerup = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerup', event)
}, (event) => {
  if (props.disabled)
    return
  if (event.pointerType === 'mouse')
    return
  clearLongPress()
})

onBeforeUnmount(() => {
  clearLongPress()
})

// COMP::MenuAnchor COMP::PopperAnchor

popperContext.onAnchorChange(virtualRef)
</script>

<template>
  <Primitive
    :as="as"
    :data-state="context.open.value ? 'open' : 'closed'"
    :data-disabled="disabled ? '' : undefined"
    style="-webkit-touch-callout: none"
    @contextmenu="onContextmenu"
    @pointerdown="onPointerdown"
    @pointermove="onPointermove"
    @pointercancel="onPointercancel"
    @pointerup="onPointerup"
  >
    <slot />
  </Primitive>
</template>
