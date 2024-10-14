<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import {
  type ContextMenuContentImplEmits,
  type ContextMenuContentImplProps,
  useContextMenuContentImpl,
} from './ContextMenuContentImpl.ts'

defineOptions({
  name: 'ContextMenuContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ContextMenuContentImplProps>(), {
  avoidCollisions: true,
  hideWhenDetached: false,
})
const emit = defineEmits<ContextMenuContentImplEmits>()

const contextMenuContentImpl = useContextMenuContentImpl({
  loop: props.loop,
  onCloseAutoFocus(event) {
    emit('closeAutoFocus', event)
  },
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
  <div v-bind="contextMenuContentImpl.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(contextMenuContentImpl.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
