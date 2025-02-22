<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { ToastRootEmits, ToastRootProps } from './ToastRoot.ts'
import { convertPropsToHookProps } from '../shared/index.ts'
import { DEFAULT_TOAST_ROOT_PROPS, useToastRoot } from './ToastRoot.ts'
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
