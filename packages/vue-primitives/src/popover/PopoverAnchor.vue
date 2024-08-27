<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { PopperAnchor } from '../popper/index.ts'
import { usePopoverContext } from './PopoverRoot.ts'

defineOptions({
  name: 'PopoverAnchor',
})

const context = usePopoverContext('PopoverAnchor')

onMounted(() => {
  context.onCustomAnchorAdd()
})

onBeforeUnmount(() => {
  context.onCustomAnchorRemove()
})
</script>

<template>
  <PopperAnchor>
    <slot />
  </PopperAnchor>
</template>
