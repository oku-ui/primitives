<script setup lang="ts">
import { type ContextMenuRootEmits, type ContextMenuRootProps, useContextMenuRoot } from './ContextMenuRoot.ts'

defineOptions({
  name: 'ContextMenuRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ContextMenuRootProps>(), {
  modal: true,
})
const emit = defineEmits<ContextMenuRootEmits>()

useContextMenuRoot({
  onUpdateOpen(open) {
    emit('update:open', open)
  },
  modal: props.modal,
})
</script>

<template>
  <slot />
</template>
