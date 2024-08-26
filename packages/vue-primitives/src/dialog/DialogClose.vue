<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useDialogContext } from './Dialog.ts'
import type { DialogCloseEmits, DialogCloseProps } from './DialogClose.ts'

defineOptions({
  name: 'DialogClose',
})

withDefaults(defineProps<DialogCloseProps>(), {
  as: 'button',
})
const emit = defineEmits<DialogCloseEmits>()

const context = useDialogContext('DialogClose')

const onClick = composeEventHandlers((event: Event) => {
  emit('click', event)
}, () => context.onOpenChange(false))
</script>

<template>
  <Primitive :as="as" :as-child="asChild" type="button" @click="onClick">
    <slot />
  </Primitive>
</template>
