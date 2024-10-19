<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, type EmitsToHookProps, normalizeAttrs } from '../shared/index.ts'
import {
  type ContextMenuContentImplEmits,
  type ContextMenuContentImplProps,
  DEFAULT_CONTEXT_MENU_CONTENT_IMPL_PROPS,
  useContextMenuContentImpl,
} from './ContextMenuContentImpl.ts'

defineOptions({
  name: 'ContextMenuContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ContextMenuContentImplProps>(), DEFAULT_CONTEXT_MENU_CONTENT_IMPL_PROPS)
const emit = defineEmits<ContextMenuContentImplEmits>()

const contextMenuContentImpl = useContextMenuContentImpl(convertPropsToHookProps(
  props,
  ['collisionBoundary'],
  (): Required<EmitsToHookProps<ContextMenuContentImplEmits>> => ({
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
  <div v-bind="contextMenuContentImpl.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(contextMenuContentImpl.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
