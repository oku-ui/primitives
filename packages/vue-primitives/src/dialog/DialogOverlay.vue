<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/mergeProps.ts'
import { DEFAULT_DIALOG_OVERLAY_PROPS, type DialogOverlayProps, useDialogOverlay } from './DialogOverlay.ts'

defineOptions({
  name: 'DialogOverlay',
})

const props = withDefaults(defineProps<DialogOverlayProps>(), DEFAULT_DIALOG_OVERLAY_PROPS)

const dialogOverlay = useDialogOverlay({
  forceMount: props.forceMount,
})
</script>

<template>
  <Primitive
    v-if="dialogOverlay.isPresent.value"
    v-bind="normalizeAttrs(dialogOverlay.attrs([$attrs]))"
  >
    <slot />
  </Primitive>
</template>
