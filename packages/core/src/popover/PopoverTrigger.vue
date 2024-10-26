<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_POPOVER_TRIGGER_PROPS, type PopoverTriggerProps, usePopoverTrigger } from './PopoverTrigger.ts'

defineOptions({
  name: 'PopoverTrigger',
  inheritAttrs: false,
})

withDefaults(defineProps<PopoverTriggerProps>(), DEFAULT_POPOVER_TRIGGER_PROPS)

const popoverTrigger = usePopoverTrigger()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(popoverTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
