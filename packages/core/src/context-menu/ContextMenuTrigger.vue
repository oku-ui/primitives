<script setup lang="ts">
import type { ContextMenuTriggerProps } from './ContextMenuTrigger.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_CONTEXT_MENU_TRIGGER_PROPS, useContextMenuTrigger } from './ContextMenuTrigger.ts'

defineOptions({
  name: 'ContextMenuTrigger',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ContextMenuTriggerProps>(), DEFAULT_CONTEXT_MENU_TRIGGER_PROPS)

const contextMenuTrigger = useContextMenuTrigger(convertPropsToHookProps(props, ['disabled']))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(contextMenuTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
