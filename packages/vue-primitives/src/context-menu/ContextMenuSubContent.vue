<script setup lang="ts">
import { type ContextMenuSubContentProps, useContextMenuSubContent } from './ContextMenuSubContent.ts'
import ContextMenuSubContentImpl from './ContextMenuSubContentImpl.vue'

defineOptions({
  name: 'ContextMenuSubContent',
})

const props = defineProps<ContextMenuSubContentProps>()

const menuContent = useContextMenuSubContent(props)
</script>

<template>
  <ContextMenuSubContentImpl v-if="menuContent.isPresent.value">
    <slot />
  </ContextMenuSubContentImpl>
</template>
