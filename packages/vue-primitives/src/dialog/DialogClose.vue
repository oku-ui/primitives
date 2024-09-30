<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type DialogCloseProps, useDialogClose } from './DialogClose.ts'

defineOptions({
  name: 'DialogClose',
})

withDefaults(defineProps<DialogCloseProps>(), {
  as: 'button',
})

const dialogClose = useDialogClose()
</script>

<template>
  <Primitive :as="as" v-bind="normalizeAttrs(dialogClose.attrs(), $attrs)">
    <slot />
  </Primitive>
</template>
