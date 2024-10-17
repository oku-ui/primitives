<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { Primitive } from '@oku-ui/primitive'
import { computed } from 'vue'
import { convertValueToPercentage, useSliderInject, useSliderOrientationInject } from './utils'

export type SliderRangeElement = HTMLSpanElement

// export interface SpanProps extends PrimitiveProps {
//   slot?: string | undefined
//   title?: string | undefined
//   key?: string | number | null | undefined
// }

export interface SliderRangeProps extends PrimitiveProps {
  scopeOkuSlider?: Scope
  slot?: string | undefined
}

</script>

<script setup lang="ts">
import { useComponentRef } from '@oku-ui/use-composable'

defineOptions({
  name: 'OkuSliderRange',
})

const props = withDefaults(defineProps<SliderRangeProps>(), {
  is: 'span',
})

const inject = useSliderInject('OkuSlider', props.scopeOkuSlider)
const orientation = useSliderOrientationInject('OkuSliderOrientation', props.scopeOkuSlider)

const { componentRef, currentElement } = useComponentRef<SliderRangeElement | null>()

const valuesCount = computed(() => (inject.values.value || []).length)
const percentages = computed(() => inject.values.value?.map(value =>
  convertValueToPercentage(value, inject.min.value, inject.max.value),
))
const offsetStart = computed(() => valuesCount.value > 1 ? Math.min(...percentages.value!) : 0)
const offsetEnd = computed(() => 100 - Math.max(...percentages.value!))

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <Primitive
    :is="props.is"
    ref="componentRef"
    :as-child="props.asChild"
    :data-disabled="inject.disabled?.value ? '' : undefined"
    :data-orientation="inject.orientation.value"
    :style="{
      ...$attrs.style as any,
      [orientation.startEdge.value]: `${offsetStart}%`,
      [orientation.endEdge.value]: `${offsetEnd}%`,
    }"
  >
    <slot />
  </Primitive>
</template>
