<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import { convertPropsToHookProps } from '../shared/index.ts'
import { type ContextMenuSubEmits, type ContextMenuSubProps, DEFAULT_CONTEXT_MENU_SUB_PROPS, useContextMenuSub } from './ContextMenuSub.ts'

defineOptions({
  name: 'ContextMenuSub',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ContextMenuSubProps>(), DEFAULT_CONTEXT_MENU_SUB_PROPS)

const emit = defineEmits<ContextMenuSubEmits>()

useContextMenuSub(convertPropsToHookProps(
  props,
  ['open'],
  (): Required<EmitsToHookProps<ContextMenuSubEmits>> => ({
    onUpdateOpen(open) {
      emit('update:open', open)
    },
  }),
))
</script>

<template>
  <slot />
</template>
