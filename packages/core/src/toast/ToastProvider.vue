<script setup lang="ts">
import { convertPropsToHookProps } from '../shared/convertPropsToHookProps.ts'
import { type ToastProviderProps, useToastProvider } from './ToastProvider.ts'

defineOptions({
  name: 'ToastProvider',
  inheritAttrs: false,
})

const props = defineProps<ToastProviderProps>()

useToastProvider(convertPropsToHookProps(props))
</script>

<template>
  <slot />
</template>
