<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, type EmitsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_MENU_CONTENT_IMPL_PROPS, type MenuContentImplEmits, type MenuContentImplProps, useMenuContentImpl } from './MenuContentImpl.ts'

defineOptions({
  name: 'MenuContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuContentImplProps>(), DEFAULT_MENU_CONTENT_IMPL_PROPS)

const emit = defineEmits<MenuContentImplEmits>()

const menuContentImpl = useMenuContentImpl(convertPropsToHookProps(
  props,
  ['collisionBoundary'],
  (): Required<EmitsToHookProps<MenuContentImplEmits>> => ({
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
