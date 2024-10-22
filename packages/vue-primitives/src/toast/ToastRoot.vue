<script setup lang="ts">
import { convertPropsToHookProps, type EmitsToHookProps } from '../shared/index.ts'
import { DEFAULT_TOAST_ROOT_PROPS, type ToastRootEmits, type ToastRootProps, useToastRoot } from './ToastRoot.ts'
import ToastRootImpl from './ToastRootImpl.vue'

defineOptions({
  name: 'ToastRoot',
})
const props = withDefaults(defineProps<ToastRootProps>(), DEFAULT_TOAST_ROOT_PROPS)
const emit = defineEmits<ToastRootEmits>()

const toastRoot = useToastRoot(convertPropsToHookProps(
  props,
  ['open'],
  (): Required<EmitsToHookProps<ToastRootEmits>> => ({
    onUpdateOpen(open) {
      emit('update:open', open)
    },
  }),
))
</script>

<template>
  <ToastRootImpl v-if="toastRoot.isPresent.value">
    <slot />
  </ToastRootImpl>
</template>
