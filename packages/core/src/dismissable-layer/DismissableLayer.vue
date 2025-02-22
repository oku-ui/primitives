<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { DismissableLayerEmits, DismissableLayerProps } from './DismissableLayer.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import {
  DEFAULT_DISMISSABLE_LAYER_PROPS,

  useDismissableLayer,
} from './DismissableLayer.ts'

defineOptions({
  name: 'DismissableLayer',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DismissableLayerProps>(), DEFAULT_DISMISSABLE_LAYER_PROPS)
const emit = defineEmits<DismissableLayerEmits>()

const dismissableLayer = useDismissableLayer(convertPropsToHookProps(
  props,
  ['disableOutsidePointerEvents'],
  (): Required<EmitsToHookProps<DismissableLayerEmits>> => ({
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
  }),
))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(dismissableLayer.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
