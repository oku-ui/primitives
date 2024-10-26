<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, type EmitsToHookProps, normalizeAttrs } from '../shared/index.ts'
import {
  DEFAULT_MENUBAR_CONTENT_IMPL_PROPS,
  type MenubarContentImplEmits,
  type MenubarContentImplProps,
  useMenubarContentImpl,
} from './MenubarContentImpl.ts'

defineOptions({
  name: 'MenubarContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenubarContentImplProps>(), DEFAULT_MENUBAR_CONTENT_IMPL_PROPS)

const emit = defineEmits<MenubarContentImplEmits>()

const menubarContentImpl = useMenubarContentImpl(convertPropsToHookProps(
  props,
  ['collisionBoundary'],
  (): Required<EmitsToHookProps<MenubarContentImplEmits>> => ({
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
