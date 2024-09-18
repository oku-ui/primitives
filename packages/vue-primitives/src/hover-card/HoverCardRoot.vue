<script setup lang="ts">
import { onBeforeUnmount, shallowRef } from 'vue'
import { useControllableState, useRef } from '../hooks/index.ts'
import { type Measurable, providePopperContext } from '../popper/PopperRoot.ts'
import { type HoverCardRootEmits, type HoverCardRootProps, provideHoverCardContext } from './HoverCardRoot.ts'

defineOptions({
  name: 'HoverCardRoot',
})

const props = withDefaults(defineProps<HoverCardRootProps>(), {
  open: undefined,
  defaultOpen: false,
  openDelay: 700,
  closeDelay: 300,
})

const emit = defineEmits<HoverCardRootEmits>()

const open = useControllableState(props, 'open', v => emit('update:open', v), props.defaultOpen)

let openTimerRef = 0
let closeTimerRef = 0
const hasSelectionRef = useRef(false)
const isPointerDownOnContentRef = useRef(false)

// cleanup any queued state updates on unmount
onBeforeUnmount(() => {
  clearTimeout(openTimerRef)
  clearTimeout(closeTimerRef)
})

provideHoverCardContext({
  open,
  onOpenChange(v) {
    open.value = v
  },
  onOpen() {
    clearTimeout(closeTimerRef)
    openTimerRef = window.setTimeout(() => {
      open.value = true
    }, props.openDelay)
  },
  onClose() {
    clearTimeout(openTimerRef)

    if (hasSelectionRef.current || isPointerDownOnContentRef.current)
      return

    closeTimerRef = window.setTimeout(() => {
      open.value = false
    }, props.closeDelay)
  },
  onDismiss() {
    open.value = false
  },
  hasSelectionRef,
  isPointerDownOnContentRef,
})

// COMP::PopperRoot

const anchor = shallowRef<Measurable>()

providePopperContext({
  content: shallowRef(),
  anchor,
  onAnchorChange(newAnchor) {
    anchor.value = newAnchor
  },
})
</script>

<template>
  <slot />
</template>
