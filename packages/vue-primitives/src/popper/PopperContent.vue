<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type PopperContentEmits, type PopperContentProps, PopperContentPropsDefaults, usePopperContent } from './PopperContent.ts'

defineOptions({
  name: 'PopperContent',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopperContentProps>(), PopperContentPropsDefaults)
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
