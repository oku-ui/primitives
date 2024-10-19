<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { type MenuSubContentImplEmits, type MenuSubContentImplProps, useMenuSubContentImpl } from './MenuSubContentImpl.ts'

defineOptions({
  name: 'MenuSubContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuSubContentImplProps>(), {
  avoidCollisions: true,
  hideWhenDetached: false,
  loop: false,
})
const emit = defineEmits<MenuSubContentImplEmits>()

const menuSubContentImpl = useMenuSubContentImpl(convertPropsToHookProps(
  props,
  ['collisionBoundary'],
  (): Required<EmitsToHookProps<MenuSubContentImplEmits>> => ({
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
  <div v-bind="menuSubContentImpl.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(menuSubContentImpl.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
