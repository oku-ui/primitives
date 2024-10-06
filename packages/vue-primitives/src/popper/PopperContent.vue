<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type PopperContentEmits, type PopperContentProps, usePopperContent } from './PopperContent.ts'

defineOptions({
  name: 'PopperContent',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopperContentProps>(), {
  side: 'bottom',
  sideOffset: 0,
  align: 'center',
  alignOffset: 0,
  arrowPadding: 0,
  avoidCollisions: true,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: 'partial',
  hideWhenDetached: false,
  updatePositionStrategy: 'optimized',
})
const emit = defineEmits<PopperContentEmits>()

const popperContent = usePopperContent({
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
  onPlaced() {
    emit('placed')
  },
})
</script>

<template>
  <div v-bind="popperContent.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(popperContent.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
