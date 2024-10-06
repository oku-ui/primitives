<script setup lang="ts">
import { PopperContentPropsDefaults } from '../popper/index.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type PopoverContentImplEmits, type PopoverContentImplProps, usePopoverContentImpl } from './PopoverContentImpl.ts'

defineOptions({
  name: 'PopoverContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopoverContentImplProps>(), PopperContentPropsDefaults)

const emit = defineEmits<PopoverContentImplEmits>()

const popoverContentImpl = usePopoverContentImpl({
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
  onOpenAutoFocus(event) {
    emit('openAutoFocus', event)
  },
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
})
</script>

<template>
  <div v-bind="popoverContentImpl.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(popoverContentImpl.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
