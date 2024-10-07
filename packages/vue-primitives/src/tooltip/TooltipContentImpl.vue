<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type TooltipContentImplEmits, type TooltipContentImplProps, TooltipContentPropsDefaults, useTooltipContentImpl } from './TooltipContentImpl.ts'

defineOptions({
  name: 'TooltipContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TooltipContentImplProps>(), TooltipContentPropsDefaults)
const emit = defineEmits<TooltipContentImplEmits>()

const tooltipContentImpl = useTooltipContentImpl({
  ariaLabel() {
    return props.ariaLabel
  },
  onEscapeKeydown(event) {
    emit('escapeKeydown', event)
  },
  onPointerdownOutside(event) {
    emit('pointerdownOutside', event)
  },
  popperProps: {
    side: props.side,
    align: props.align,
    sideOffset: props.sideOffset,
    alignOffset: props.alignOffset,
    arrowPadding: props.arrowPadding,
    avoidCollisions: props.avoidCollisions,
    collisionBoundary() {
      return props.collisionBoundary
    },
    collisionPadding: props.collisionPadding,
    sticky: props.sticky,
    hideWhenDetached: props.hideWhenDetached,
    updatePositionStrategy: props.updatePositionStrategy,
    dir() {
      return props.dir
    },
  },
})
</script>

<template>
  <div v-bind="tooltipContentImpl.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(tooltipContentImpl.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
