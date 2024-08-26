<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { useDialogContext } from './Dialog.ts'
import type { DialogDescriptionProps } from './DialogDescription.ts'

defineOptions({
  name: 'DialogDescription',
})

withDefaults(defineProps<DialogDescriptionProps>(), {
  as: 'p',
})

const context = useDialogContext('DialogDescription')
</script>

<template>
  <Primitive :id="context.descriptionId" :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>
