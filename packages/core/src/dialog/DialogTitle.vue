<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_DIALOG_TITLE_PROPS, type DialogTitleProps, useDialogTitle } from './DialogTitle.ts'

defineOptions({
  name: 'DialogTitle',
})

withDefaults(defineProps<DialogTitleProps>(), DEFAULT_DIALOG_TITLE_PROPS)

const dialogTitle = useDialogTitle()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(dialogTitle.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
