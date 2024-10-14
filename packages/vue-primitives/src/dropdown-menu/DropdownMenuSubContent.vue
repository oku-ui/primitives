<script setup lang="ts">
import { type DropdownMenuSubContentProps, useDropdownMenuSubContent } from './DropdownMenuSubContent.ts'
import DropdownMenuSubContentImpl from './DropdownMenuSubContentImpl.vue'

defineOptions({
  name: 'DropdownMenuSubContent',
})

const props = defineProps<DropdownMenuSubContentProps>()

const menuContent = useDropdownMenuSubContent(props)
</script>

<template>
  <DropdownMenuSubContentImpl v-if="menuContent.isPresent.value">
    <slot />
  </DropdownMenuSubContentImpl>
</template>
