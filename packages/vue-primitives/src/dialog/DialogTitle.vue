<script setup lang="ts">
import type { DialogTitleProps } from './DialogTitle.ts'
import { Primitive } from '../primitive/index.ts'
import { useDialogContext } from './DialogRoot.ts'

defineOptions({
  name: 'DialogTitle',
})

withDefaults(defineProps<DialogTitleProps>(), {
  as: 'h2',
})

const context = useDialogContext('DialogTitle')
</script>

<template>
  <Primitive :id="context.titleId" :as="as">
    <slot />
  </Primitive>
</template>
