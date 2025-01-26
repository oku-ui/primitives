<script setup lang="ts">
import type { DialogCloseProps } from './DialogClose.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_DIALOG_CLOSE_PROPS, useDialogClose } from './DialogClose.ts'

defineOptions({
  name: 'DialogClose',
})

withDefaults(defineProps<DialogCloseProps>(), DEFAULT_DIALOG_CLOSE_PROPS)

const dialogClose = useDialogClose()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(dialogClose.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
