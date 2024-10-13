<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/mergeProps.ts'
import { type MenuSubContentImplEmits, type MenuSubContentImplProps, useMenuSubContentImpl } from './MenuSubContentImpl.ts'

defineOptions({
  name: 'MenuSubContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuSubContentImplProps>(), {
  loop: false,
})
const emit = defineEmits<MenuSubContentImplEmits>()

const menuSubContent = useMenuSubContentImpl({
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
  <div v-bind="menuSubContent.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(menuSubContent.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
