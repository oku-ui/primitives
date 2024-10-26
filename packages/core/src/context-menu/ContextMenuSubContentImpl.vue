<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, type EmitsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { type ContextMenuSubContentImplEmits, type ContextMenuSubContentImplProps, DEFAULT_CONTEXT_MENU_SUB_CONTENT_IMPL_PROPS, useContextMenuSubContentImpl } from './ContextMenuSubContentImpl.ts'

defineOptions({
  name: 'ContextMenuSubContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ContextMenuSubContentImplProps>(), DEFAULT_CONTEXT_MENU_SUB_CONTENT_IMPL_PROPS)
const emit = defineEmits<ContextMenuSubContentImplEmits>()

const contextMenuSubContentImpl = useContextMenuSubContentImpl(convertPropsToHookProps(
  props,
  ['collisionBoundary'],
  (): Required<EmitsToHookProps<ContextMenuSubContentImplEmits>> => ({
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
  <div v-bind="contextMenuSubContentImpl.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(contextMenuSubContentImpl.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
