<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/mergeProps.ts'
import { type ContextMenuSubContentImplEmits, type ContextMenuSubContentImplProps, useContextMenuSubContentImpl } from './ContextMenuSubContentImpl.ts'

defineOptions({
  name: 'ContextMenuSubContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ContextMenuSubContentImplProps>(), {
  avoidCollisions: true,
  hideWhenDetached: false,
  loop: false,
})
const emit = defineEmits<ContextMenuSubContentImplEmits>()

const contextMenuSubContentImpl = useContextMenuSubContentImpl({
  loop: props.loop,
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
  },
})
</script>

<template>
  <div v-bind="contextMenuSubContentImpl.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(contextMenuSubContentImpl.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
