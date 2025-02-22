<script setup lang="ts">
import type { PopoverCloseProps } from './PopoverClose.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_POPOVER_CLOSE_PROPS, usePopoverClose } from './PopoverClose.ts'

defineOptions({
  name: 'PopoverClose',
  inheritAttrs: false,
})

withDefaults(defineProps<PopoverCloseProps>(), DEFAULT_POPOVER_CLOSE_PROPS)

const popoverClose = usePopoverClose()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(popoverClose.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
