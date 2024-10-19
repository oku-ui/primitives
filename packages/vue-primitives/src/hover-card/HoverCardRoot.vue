<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import { convertPropsToHookProps } from '../shared/index.ts'
import { type HoverCardRootEmits, type HoverCardRootProps, useHoverCardRoot } from './HoverCardRoot.ts'

defineOptions({
  name: 'HoverCardRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<HoverCardRootProps>(), {
  open: undefined,
  defaultOpen: false,
  openDelay: 700,
  closeDelay: 300,
})

const emit = defineEmits<HoverCardRootEmits>()

useHoverCardRoot(convertPropsToHookProps(
  props,
  ['open'],
  (): Required<EmitsToHookProps<HoverCardRootEmits>> => ({
    onUpdateOpen(open) {
      emit('update:open', open)
    },
  }),
))
</script>

<template>
  <slot />
</template>
