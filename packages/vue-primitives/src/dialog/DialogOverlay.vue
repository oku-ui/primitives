<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/mergeProps.ts'
import { type DialogOverlayProps, useDialogOverlay } from './DialogOverlay.ts'

defineOptions({
  name: 'DialogOverlay',
})

const props = defineProps<DialogOverlayProps>()

const dialogOverlay = useDialogOverlay({
  forceMount: props.forceMount,
})
</script>

<template>
  <Primitive
    v-if="dialogOverlay.isPresent.value"
    v-bind="normalizeAttrs(dialogOverlay.attrs(), $attrs)"
  >
    <slot />
  </Primitive>
</template>
