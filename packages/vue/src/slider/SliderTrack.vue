<script lang="ts">
import { useSliderInject } from './utils'
import type { PrimitiveProps } from '@oku-ui/primitive'
import type { SliderThumbImplElement } from './SliderThumbImpl.vue'
import type { Scope } from '@oku-ui/provide'

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
    :is="props.is"
    ref="componentRef"
    :as-child="props.asChild"
    :data-disabled="inject.disabled ? '' : undefined"
    :data-orientation="inject.orientation"
  >
    <slot />
  </Primitive>
</template>
