<script setup lang="ts">
import type { DropdownMenuTriggerEmits, DropdownMenuTriggerProps } from './DropdownMenuTrigger.ts'
import { onMounted } from 'vue'
import { useForwardElement } from '../hooks/index.ts'
import { usePopperContext } from '../popper/index.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useDropdownMenuContext } from './DropdownMenuRoot.ts'

defineOptions({
  name: 'DropdownMenuTrigger',
})

const props = withDefaults(defineProps<DropdownMenuTriggerProps>(), {
  as: 'button',
  disabled: false,
})
const emit = defineEmits<DropdownMenuTriggerEmits>()

const context = useDropdownMenuContext('DropdownMenuTrigger')
const popperContext = usePopperContext('DropdownMenuTrigger')

const onPointerdown = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerdown', event)
}, (event) => {
  // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
  // but not when the control key is pressed (avoiding MacOS right click)
  if (!props.disabled && event.button === 0 && event.ctrlKey === false) {
    const isOpen = context.open()
    context.onOpenToggle()
    // prevent trigger focusing when opening
    // this allows the content to be given focus without competition
    if (!isOpen)
      event.preventDefault()
  }
})

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  emit('keydown', event)
}, (event) => {
  if (props.disabled)
    return
  if (['Enter', ' '].includes(event.key))
    context.onOpenToggle()
  if (event.key === 'ArrowDown')
    context.onOpenChange(true)
  // prevent keydown from scrolling window / first focused item to execute
  // that keydown (inadvertently closing the menu)
  if (['Enter', ' ', 'ArrowDown'].includes(event.key))
    event.preventDefault()
})

// COMP::MenuAnchor COMP::PopperAnchor

const forwardElement = useForwardElement(context.triggerRef)

onMounted(() => {
  popperContext.onAnchorChange(context.triggerRef.current)
})
</script>

<template>
  <Primitive
    :id="context.triggerId"
    :ref="forwardElement"
    :as="as"
    aria-haspopup="menu"
    :aria-expanded="context.open()"
    :aria-controls="context.open() ? context.contentId : undefined"
    :data-state="context.open() ? 'open' : 'closed'"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    @pointerdown="onPointerdown"
    @keydown="onKeydown"
  >
    <slot />
  </Primitive>
</template>
