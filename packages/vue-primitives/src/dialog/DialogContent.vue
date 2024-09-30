<script setup lang="ts">
import { normalizeAttrs } from '../shared/index.ts'
import { type DialogContentProps, useDialogContent } from './DialogContent.ts'
import DialogContentImpl from './DialogContentImpl.vue'

defineOptions({
  name: 'DialogContent',
  inheritAttrs: false,
})

const props = defineProps<DialogContentProps>()

const dialogContent = useDialogContent({
  forceMount: props.forceMount,
})
</script>

<template>
  <DialogContentImpl v-if="dialogContent.isPresent.value" v-bind="normalizeAttrs(dialogContent.attrs(), $attrs)">
    <slot />
  </DialogContentImpl>
</template>
