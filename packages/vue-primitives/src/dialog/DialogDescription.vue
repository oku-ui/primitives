<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { useDialogContext } from './DialogRoot.ts'
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
  <Primitive :id="context.descriptionId" :as="as">
    <slot />
  </Primitive>
</template>
