<script setup lang="ts">
import { shallowRef } from 'vue'
import { useControllableState, useRef } from '../hooks/index.ts'
import { Popper } from '../popper/index.ts'
import { type PopoverEmits, type PopoverProps, providePopoverContext } from './Popover.ts'

defineOptions({
  name: 'Popover',
})

const props = withDefaults(defineProps<PopoverProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: false,
})
const emit = defineEmits<PopoverEmits>()

const triggerRef = useRef<HTMLButtonElement>()
const hasCustomAnchor = shallowRef(false)

const open = useControllableState(props, v => emit('update:open', v), 'open', props.defaultOpen)

providePopoverContext({
  triggerRef,
  contentId: props.id,
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
  <Popper>
    <slot />
  </Popper>
</template>
