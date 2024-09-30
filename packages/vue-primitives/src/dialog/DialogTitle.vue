


<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type DialogTitleProps, useDialogTitle } from './DialogTitle.ts'

defineOptions({
  name: 'DialogTitle',
})

withDefaults(defineProps<DialogTitleProps>(), {
  as: 'h2',
})

const dialogTitle = useDialogTitle()
</script>

<template>
  <Primitive :as="as" v-bind="normalizeAttrs(dialogTitle.attrs(), $attrs)">
    <slot />
  </Primitive>
</template>
