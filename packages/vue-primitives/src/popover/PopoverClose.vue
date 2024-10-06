<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type PopoverCloseProps, usePopoverClose } from './PopoverClose.ts'

defineOptions({
  name: 'PopoverClose',
  inheritAttrs: false,
})

withDefaults(defineProps<PopoverCloseProps>(), {
  as: 'button',
})

const popoverClose = usePopoverClose()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(popoverClose.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
