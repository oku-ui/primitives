<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { PopperAnchor } from '../popper/index.ts'
import { usePopoverContext } from './Popover.ts'
import type { PopoverAnchorProps } from './PopoverAnchor.ts'

defineOptions({
  name: 'PopoverAnchor',
})

const props = defineProps<PopoverAnchorProps>()

const context = usePopoverContext('PopoverAnchor')

onMounted(() => {
  context.onCustomAnchorAdd()
})

onBeforeUnmount(() => {
  context.onCustomAnchorRemove()
})
</script>

<template>
  <PopperAnchor
    v-bind="props"
  >
    <slot />
  </PopperAnchor>
</template>
