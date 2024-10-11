
<script setup lang="ts">
import { type MenuSubEmits, type MenuSubProps, useMenuSub } from './MenuSub.ts'

defineOptions({
  name: 'MenuSub',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuSubProps>(), {
  open: false,
})
const emit = defineEmits<MenuSubEmits>()

useMenuSub({
  open() {
    return props.open
  },
  onUpdateOpen(open) {
    emit('update:open', open)
  },
})
</script>

<template>
  <slot />
</template>
