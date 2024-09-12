<script setup lang="ts">
import { shallowRef } from 'vue'
import { useForwardElement } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { type DismissableLayerEmits, type DismissableLayerProps, useDismissableLayer } from './DismissableLayer.ts'

defineOptions({
  name: 'DismissableLayer',
})

const props = withDefaults(defineProps<DismissableLayerProps>(), {
  disableOutsidePointerEvents: false,
})
const emit = defineEmits<DismissableLayerEmits>()

const $el = shallowRef<HTMLDivElement>()
const forwardElement = useForwardElement($el)

const dismissableLayer = useDismissableLayer($el, {
  disableOutsidePointerEvents() {
    return props.disableOutsidePointerEvents
  },
}, {
  onInteractOutside(event) {
    emit('interactOutside', event)
  },
  onEscapeKeydown(event) {
    emit('escapeKeydown', event)
  },
  onDismiss() {
    emit('dismiss')
  },
  onFocusOutside(event) {
    emit('focusOutside', event)
  },
  onPointerdownOutside(event) {
    emit('pointerdownOutside', event)
  },
})
</script>

<template>
  <Primitive
    :ref="forwardElement"
    data-dismissable-layer
    :style="{ pointerEvents: dismissableLayer.pointerEvents() }"
  >
    <slot />
  </Primitive>
</template>
