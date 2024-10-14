<script setup lang="ts">
import { type DropdownMenuContentProps, useDropdownMenuContent } from './DropdownMenuContent.ts'
import DropdownMenuContentImpl from './DropdownMenuContentImpl.vue'

defineOptions({
  name: 'DropdownMenuContent',
})

const props = defineProps<DropdownMenuContentProps>()

const dropdownMenuContent = useDropdownMenuContent(props)
</script>

<template>
  <DropdownMenuContentImpl v-if="dropdownMenuContent.isPresent.value">
    <slot />
  </DropdownMenuContentImpl>
</template>
