<script setup lang="ts">
import { PopperContentPropsDefaults } from '../popper/PopperContent.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type MenuContentImplEmits, type MenuContentImplProps, useMenuContentImpl } from './MenuContentImpl.ts'

defineOptions({
  name: 'MenuContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuContentImplProps>(), {
  ...PopperContentPropsDefaults,
  loop: false,
})

const emit = defineEmits<MenuContentImplEmits>()

const menuContentImpl = useMenuContentImpl({
  loop: props.loop,
  onCloseAutoFocus(event) {
    emit('closeAutoFocus', event)
  },
  onEntryFocus(event) {
    emit('entryFocus', event)
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
  },
})
</script>

<template>
  <div v-bind="menuContentImpl.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(menuContentImpl.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
