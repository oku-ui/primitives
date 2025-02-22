<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { MenubarSubContentImplEmits, MenubarSubContentImplProps } from './MenubarSubContentImpl.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_MENUBAR_SUB_CONTENT_IMPL_PROPS, useMenubarSubContentImpl } from './MenubarSubContentImpl.ts'

defineOptions({
  name: 'MenubarSubContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenubarSubContentImplProps>(), DEFAULT_MENUBAR_SUB_CONTENT_IMPL_PROPS)
const emit = defineEmits<MenubarSubContentImplEmits>()

const menubarContentImpl = useMenubarSubContentImpl(convertPropsToHookProps(
  props,
  ['collisionBoundary'],
  (): Required<EmitsToHookProps<MenubarSubContentImplEmits>> => ({
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
  <div v-bind="menubarContentImpl.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(menubarContentImpl.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
