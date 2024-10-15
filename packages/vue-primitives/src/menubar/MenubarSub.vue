<script setup lang="ts">
import { type MenubarSubEmits, type MenubarSubProps, useMenubarSub } from './MenubarSub.ts'

defineOptions({
  name: 'MenubarSub',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenubarSubProps>(), {
  open: undefined,
  defaultOpen: false,
})

const emit = defineEmits<MenubarSubEmits>()

useMenubarSub({
  open() {
    return props.open
  },
  onUpdateOpen(open) {
    emit('update:open', open)
  },
  defaultOpen: props.defaultOpen,
})
</script>

<template>
  <slot />
</template>
