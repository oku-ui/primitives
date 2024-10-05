<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type DialogDescriptionProps, useDialogDescription } from './DialogDescription.ts'

defineOptions({
  name: 'DialogDescription',
  inheritAttrs: false,
})

withDefaults(defineProps<DialogDescriptionProps>(), {
  as: 'p',
})

const dialogDescription = useDialogDescription()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(dialogDescription.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
