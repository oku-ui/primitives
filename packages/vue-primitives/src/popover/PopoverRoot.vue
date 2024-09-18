<script setup lang="ts">
import { shallowRef } from 'vue'
import { useControllableState, useId, useRef } from '../hooks/index.ts'
import { type Measurable, providePopperContext } from '../popper/index.ts'
import { type PopoverRootEmits, type PopoverRootProps, providePopoverContext } from './PopoverRoot.ts'

defineOptions({
  name: 'PopoverRoot',
})

const props = withDefaults(defineProps<PopoverRootProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: false,
})
const emit = defineEmits<PopoverRootEmits>()

const triggerRef = useRef<HTMLButtonElement>()
const hasCustomAnchor = shallowRef(false)

const open = useControllableState(props, 'open', v => emit('update:open', v), props.defaultOpen)

providePopoverContext({
  triggerRef,
  contentId: useId(),
  open,
  onOpenChange(value) {
    open.value = value
  },
  onOpenToggle() {
    open.value = !open.value
  },
  hasCustomAnchor,
  onCustomAnchorAdd() {
    hasCustomAnchor.value = true
  },
  onCustomAnchorRemove() {
    hasCustomAnchor.value = false
  },
  modal: props.modal,
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
