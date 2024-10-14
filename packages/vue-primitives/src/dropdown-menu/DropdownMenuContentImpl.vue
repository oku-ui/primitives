<script setup lang="ts">
import { PopperContentPropsDefaults } from '../popper/PopperContent.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type DropdownMenuContentImplEmits, type DropdownMenuContentImplProps, useDropdownMenuContentImpl } from './DropdownMenuContentImpl.ts'

defineOptions({
  name: 'DropdownMenuContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownMenuContentImplProps>(), {
  ...PopperContentPropsDefaults,
  loop: false,
})

const emit = defineEmits<DropdownMenuContentImplEmits>()

const menuContentImpl = useDropdownMenuContentImpl({
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
