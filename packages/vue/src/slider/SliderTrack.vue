<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import type { SliderThumbImplElement } from './SliderThumbImpl.vue'
import { useSliderInject } from './utils'

export type SliderTrackElement = HTMLSpanElement

// export interface SpanProps extends PrimitiveProps {
//   slot?: string | undefined
//   title?: string | undefined
//   key?: string | number | null | undefined
// }

export interface SliderTrackProps extends PrimitiveProps {
  slot?: string | undefined
  scopeOkuSlider?: Scope
}

</script>

<script setup lang="ts">
import { Primitive } from '@oku-ui/primitive'

import { useComponentRef } from '@oku-ui/use-composable'

defineOptions({
  name: 'OkuSliderTrack',
})

const props = withDefaults(defineProps<SliderTrackProps>(), {
  is: 'span',
})

const { componentRef, currentElement } = useComponentRef<SliderThumbImplElement | null>()

const inject = useSliderInject('OkuSlider', props.scopeOkuSlider)

defineExpose({
  $el: currentElement,
})

</script>

<template>
  <Primitive
    :is="is"
    ref="componentRef"
    :as-child="asChild"
    :data-disabled="inject.disabled?.value ? '' : undefined"
    :data-orientation="inject.orientation.value"
  >
    <slot />
  </Primitive>
</template>
