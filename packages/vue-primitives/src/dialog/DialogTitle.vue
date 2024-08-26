<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { useDialogContext } from './Dialog.ts'
import type { DialogTitleProps } from './DialogTitle.ts'

defineOptions({
  name: 'DialogTitle',
})

withDefaults(defineProps<DialogTitleProps>(), {
  as: 'h2',
})

const context = useDialogContext('DialogTitle')
</script>

<template>
  <Primitive :id="context.titleId" :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>
