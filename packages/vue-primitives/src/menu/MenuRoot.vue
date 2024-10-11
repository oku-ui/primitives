<script setup lang="ts">
import {
  type MenuRootEmits,
  type MenuRootProps,
  useMenuRoot,
} from './MenuRoot.ts'

defineOptions({
  name: 'MenuRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuRootProps>(), {
  open: false,
  modal: true,
})

const emit = defineEmits<MenuRootEmits>()

useMenuRoot({
  open() {
    return props.open
  },
  onUpdateOpen(open) {
    emit('update:open', open)
  },
  dir() {
    return props.dir
  },
  modal: props.modal,
})
</script>

<template>
  <slot />
</template>
