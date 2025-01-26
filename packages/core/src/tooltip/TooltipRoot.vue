<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { TooltipRootEmits, TooltipRootProps } from './TooltipRoot.ts'
import { convertPropsToHookProps } from '../shared/index.ts'
import { DEFAULT_TOOLTIP_ROOT_PROPS, useTooltipRoot } from './TooltipRoot.ts'

defineOptions({
  name: 'TooltipRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TooltipRootProps>(), DEFAULT_TOOLTIP_ROOT_PROPS)
const emit = defineEmits<TooltipRootEmits>()

useTooltipRoot(convertPropsToHookProps(
  props,
  ['open'],
  (): Required<EmitsToHookProps<TooltipRootEmits>> => ({
    onUpdateOpen(open) {
      emit('update:open', open)
    },
  }),
))
</script>

<template>
  <slot />
</template>
