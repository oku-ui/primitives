<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_TOAST_ACTION_PROPS, type ToastActionProps, useToastAction } from './ToastAction.ts'

defineOptions({
  name: 'ToastAction',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToastActionProps>(), DEFAULT_TOAST_ACTION_PROPS)

const toastAction = useToastAction(convertPropsToHookProps(props))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toastAction.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
