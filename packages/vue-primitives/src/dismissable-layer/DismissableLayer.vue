



<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type DismissableLayerEmits, type DismissableLayerProps, useDismissableLayer } from './DismissableLayer.ts'

defineOptions({
  name: 'DismissableLayer',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DismissableLayerProps>(), {
  disableOutsidePointerEvents: false,
})
const emit = defineEmits<DismissableLayerEmits>()

const dismissableLayer = useDismissableLayer({
  disableOutsidePointerEvents() {
    return props.disableOutsidePointerEvents
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
  onEscapeKeydown(event) {
    emit('escapeKeydown', event)
  },
  onDismiss() {
    emit('dismiss')
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(dismissableLayer.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
