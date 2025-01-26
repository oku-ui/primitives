<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { DropdownMenuContentImplEmits, DropdownMenuContentImplProps } from './DropdownMenuContentImpl.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { useDropdownMenuContentImpl } from './DropdownMenuContentImpl.ts'

defineOptions({
  name: 'DropdownMenuContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownMenuContentImplProps>(), {
  avoidCollisions: true,
  hideWhenDetached: false,
  loop: false,
})

const emit = defineEmits<DropdownMenuContentImplEmits>()

const menuContentImpl = useDropdownMenuContentImpl(convertPropsToHookProps(
  props,
  ['collisionBoundary'],
  (): Required<EmitsToHookProps<DropdownMenuContentImplEmits>> => ({
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
  }),
))
</script>

<template>
  <div v-bind="menuContentImpl.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(menuContentImpl.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
