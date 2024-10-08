<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type HoverCardContentImplEmits, type HoverCardContentImplProps, HoverCardContentImplPropsDefaults, useHoverCardContentImpl } from './HoverCardContentImpl.ts'

defineOptions({
  name: 'HoverCardContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<HoverCardContentImplProps>(), HoverCardContentImplPropsDefaults)

const emit = defineEmits<HoverCardContentImplEmits>()

const hoverCardContentImpl = useHoverCardContentImpl({
  onEscapeKeydown(event) {
    emit('escapeKeydown', event)
  },
  onPointerdownOutside(event) {
    emit('pointerdownOutside', event)
  },
  onFocusOutside(event) {
    emit('focusOutside', event)
  },
  onInteractOutside(event) {
    emit('interactOutside', event)
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
  <div v-bind="hoverCardContentImpl.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(hoverCardContentImpl.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
