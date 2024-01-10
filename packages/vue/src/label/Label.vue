<script setup lang="ts">
import { defineExpose, mergeProps, useAttrs } from 'vue'
import { useComponentRef, useListeners } from '@oku-ui/use-composable'
import type { PrimitiveProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'

export interface LabelProps extends PrimitiveProps {
  for?: string
}

export type LabelEmits = {
  mousedown: [event: MouseEvent]
}

const props = defineProps<LabelProps>()
const emit = defineEmits<LabelEmits>()

const attrs = useAttrs()

const { componentRef, currentElement } = useComponentRef<HTMLLabelElement | null>()

defineExpose({
  $el: currentElement,
})

const emits = useListeners(['onMousedown'])
</script>

<template>
  <Primitive
    is="label"
    ref="componentRef"
    v-bind="mergeProps(props, attrs, emits)"
    @mousedown="(event: LabelEmits['mousedown'][0]) => {
      emit('mousedown', event)
      // prevent text selection when double clicking label
      if (!event.defaultPrevented && event.detail > 1)
        event.preventDefault()
    }"
  >
    <slot />
  </Primitive>
</template>
