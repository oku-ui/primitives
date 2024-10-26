<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_TOAST_CLOSE_PROPS, type ToastCloseProps, useToastClose } from './ToastClose.ts'

defineOptions({
  name: 'ToastClose',
  inheritAttrs: false,
})

withDefaults(defineProps<ToastCloseProps>(), DEFAULT_TOAST_CLOSE_PROPS)

const toastClose = useToastClose()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toastClose.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
