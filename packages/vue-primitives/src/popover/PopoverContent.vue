<script setup lang="ts">
import { type PopoverContentProps, usePopoverContent } from './PopoverContent.ts'
import PopoverContentImpl from './PopoverContentImpl.vue'

defineOptions({
  name: 'PopoverContent',
})

const props = defineProps<PopoverContentProps>()

const popoverContent = usePopoverContent({
  forceMount: props.forceMount,
})
</script>

<template>
  <PopoverContentImpl v-if="popoverContent.isPresent.value">
    <slot />
  </PopoverContentImpl>
</template>
