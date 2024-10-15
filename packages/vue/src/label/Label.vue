<script setup lang="ts">
import { useComponentRef } from '@oku-ui/use-composable'
import type { PrimitiveProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'

export interface LabelProps extends PrimitiveProps {
  for?: string
}

export type LabelEmits = {
  mousedown: [event: MouseEvent]
}

const props = withDefaults(
  defineProps<LabelProps>(),
  {
    is: 'label',
  },
)

const emit = defineEmits<LabelEmits>()

const { componentRef, currentElement } = useComponentRef<HTMLLabelElement | null>()

defineExpose({
  $el: currentElement,
})

</script>

<template>
  <Primitive
    v-bind="props"
    ref="componentRef"
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
