<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type PopoverTriggerProps, usePopoverTrigger } from './PopoverTrigger.ts'

defineOptions({
  name: 'PopoverTrigger',
  inheritAttrs: false,
})

withDefaults(defineProps<PopoverTriggerProps>(), {
  as: 'button',
})
const popoverTrigger = usePopoverTrigger()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(popoverTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
