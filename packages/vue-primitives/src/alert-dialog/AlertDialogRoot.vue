<script setup lang="ts">
import type { AlertDialogRootEmits, AlertDialogRootProps } from './AlertDialogRoot.ts'
import { shallowRef } from 'vue'
import { provideDialogContext } from '../dialog/index.ts'

defineOptions({
  name: 'AlertDialogRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AlertDialogRootProps>(), {
  open: undefined,
  defaultOpen: false,
})

const emit = defineEmits<AlertDialogRootEmits>()

const triggerRef = useRef<HTMLButtonElement>()
const content = shallowRef<HTMLElement>()

const open = useControllableState(props, 'open', v => emit('update:open', v), props.defaultOpen)

provideDialogContext({
  triggerRef,
  content,
  contentId: useId(),
  titleId: useId(),
  descriptionId: useId(),
  open,
  modal: true,
  onOpenChange(value) {
    open.value = value
  },
  onOpenToggle() {
    open.value = !open.value
  },
})
</script>

<template>
  <slot />
</template>
