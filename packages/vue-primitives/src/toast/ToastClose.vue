<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useToastInteractiveContext } from './ToastRoot.ts'
import type { ToastCloseEmits, ToastCloseProps } from './ToastClose.ts'

defineOptions({
  name: 'ToastClose',
})

withDefaults(defineProps<ToastCloseProps>(), {
  as: 'button',
})

const emit = defineEmits<ToastCloseEmits>()

const interactiveContext = useToastInteractiveContext('ToastClose')

const onClick = composeEventHandlers<MouseEvent>((event) => {
  emit('click', event)
}, interactiveContext.onClose)
</script>

<template>
  <Primitive
    :as="as"
    type="button"
    data-radix-toast-announce-exclude=""
    :data-radix-toast-announce-alt="altText || undefined"
    @click="onClick"
  >
    <slot />
  </Primitive>
</template>
