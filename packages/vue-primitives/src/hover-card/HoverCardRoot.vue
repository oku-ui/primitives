<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { useControllableState, useRef } from '../hooks/index.ts'
import { PopoverRoot } from '../popover/index.ts'
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

const open = useControllableState(props, v => emit('update:open', v), 'open', props.defaultOpen)

let openTimerRef = 0
let closeTimerRef = 0
const hasSelectionRef = useRef(false)
const isPointerDownOnContentRef = useRef(false)

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
</script>

<template>
  <PopoverRoot>
    <slot />
  </PopoverRoot>
</template>
