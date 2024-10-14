<script setup lang="ts">
import { type ContextMenuContenttProps, useContextMenuContent } from './ContextMenuContent.ts'
import ContextMenuContentImpl from './ContextMenuContentImpl.vue'

defineOptions({
  name: 'ContextMenuContent',
})

const props = defineProps<ContextMenuContenttProps>()

const menuContent = useContextMenuContent(props)
</script>

<template>
  <ContextMenuContentImpl v-if="menuContent.isPresent.value">
    <slot />
  </ContextMenuContentImpl>
</template>
