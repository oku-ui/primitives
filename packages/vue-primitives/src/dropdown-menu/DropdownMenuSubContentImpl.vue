<script setup lang="ts">
import { type MenuSubContentImplEmits, type MenuSubContentImplProps, useMenuSubContentImpl } from '../menu/MenuSubContentImpl.ts'
import { PopperContentPropsDefaults } from '../popper/PopperContent.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/mergeProps.ts'

defineOptions({
  name: 'DropdownMenuSubContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuSubContentImplProps>(), {
  ...PopperContentPropsDefaults,
  loop: false,
})
const emit = defineEmits<MenuSubContentImplEmits>()

const menuSubContentImpl = useMenuSubContentImpl({
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
  <div v-bind="menuSubContentImpl.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(menuSubContentImpl.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
