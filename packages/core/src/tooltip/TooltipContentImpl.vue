<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { TooltipContentImplEmits, TooltipContentImplProps } from './TooltipContentImpl.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_TOOLTIP_CONTENT_IMPL_PROPS, useTooltipContentImpl } from './TooltipContentImpl.ts'

defineOptions({
  name: 'TooltipContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TooltipContentImplProps>(), DEFAULT_TOOLTIP_CONTENT_IMPL_PROPS)
const emit = defineEmits<TooltipContentImplEmits>()

const tooltipContentImpl = useTooltipContentImpl(convertPropsToHookProps(
  props,
  ['collisionBoundary', 'dir'],
  (): Required<EmitsToHookProps<TooltipContentImplEmits>> => ({
    onEscapeKeydown(event) {
      emit('escapeKeydown', event)
    },
    onPointerdownOutside(event) {
      emit('pointerdownOutside', event)
    },
  }),
))
</script>

<template>
  <div v-bind="tooltipContentImpl.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(tooltipContentImpl.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
