<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import { convertPropsToHookProps } from '../shared/index.ts'
import { type ContextMenuRootEmits, type ContextMenuRootProps, DEFAULT_CONTEXT_MENU_ROOT_PROPS, useContextMenuRoot } from './ContextMenuRoot.ts'

defineOptions({
  name: 'ContextMenuRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ContextMenuRootProps>(), DEFAULT_CONTEXT_MENU_ROOT_PROPS)
const emit = defineEmits<ContextMenuRootEmits>()

useContextMenuRoot(convertPropsToHookProps(
  props,
  ['dir'],
  (): Required<EmitsToHookProps<ContextMenuRootEmits>> => ({
    onUpdateOpen(open) {
      emit('update:open', open)
    },
  }),
))
</script>

<template>
  <slot />
</template>
