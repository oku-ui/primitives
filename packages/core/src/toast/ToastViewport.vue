<script setup lang="ts">
import type { ToastViewportProps } from './ToastViewport.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { useToastViewport } from './ToastViewport.ts'

defineOptions({
  name: 'ToastViewport',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToastViewportProps>(), {
  as: 'ol',
  hotkey: () => ['F8'],
  label: 'Notifications ({hotkey})',
})

const toastViewport = useToastViewport(convertPropsToHookProps(props))
</script>

<template>
  <div v-bind="toastViewport.wrapperAttrs()">
    <span
      v-if="toastViewport.isShowFocusProxy.value"
      v-bind="toastViewport.headFocusProxy()"
    />
    <Primitive v-bind="normalizeAttrs(toastViewport.attrs([$attrs, { as }]))">
      <slot />
    </Primitive>
    <span
      v-if="toastViewport.isShowFocusProxy.value"
      v-bind="toastViewport.tailFocusProxy()"
    />
  </div>
</template>
