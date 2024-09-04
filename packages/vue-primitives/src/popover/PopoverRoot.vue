<script setup lang="ts">
import { shallowRef } from 'vue'
import { useControllableState, useId, useRef } from '../hooks/index.ts'
import { PopperRoot } from '../popper/index.ts'
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

const open = useControllableState(props, v => emit('update:open', v), 'open', props.defaultOpen)

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
</script>

<template>
  <PopperRoot>
    <slot />
  </PopperRoot>
</template>
