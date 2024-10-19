<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, type EmitsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_HOVER_CARD_CONTENT_IMPL_PROPS, type HoverCardContentImplEmits, type HoverCardContentImplProps, useHoverCardContentImpl } from './HoverCardContentImpl.ts'

defineOptions({
  name: 'HoverCardContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<HoverCardContentImplProps>(), DEFAULT_HOVER_CARD_CONTENT_IMPL_PROPS)

const emit = defineEmits<HoverCardContentImplEmits>()

const hoverCardContentImpl = useHoverCardContentImpl(convertPropsToHookProps(
  props,
  ['collisionBoundary', 'dir'],
  (): Required<EmitsToHookProps<HoverCardContentImplEmits>> => ({
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
  <div v-bind="hoverCardContentImpl.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(hoverCardContentImpl.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
