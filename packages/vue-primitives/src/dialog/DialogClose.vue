<script setup lang="ts">
import type { DialogCloseEmits, DialogCloseProps } from './DialogClose.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useDialogContext } from './DialogRoot.ts'

defineOptions({
  name: 'DialogClose',
})

withDefaults(defineProps<DialogCloseProps>(), {
  as: 'button',
})
const emit = defineEmits<DialogCloseEmits>()

const context = useDialogContext('DialogClose')

const onClick = composeEventHandlers<MouseEvent>((event) => {
  emit('click', event)
}, () => context.onOpenChange(false))
</script>

<template>
  <Primitive :as="as" type="button" @click="onClick">
    <slot />
  </Primitive>
</template>
