<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import type { SliderThumbImplElement } from './SliderThumbImpl.vue'

// extends Omit<SliderThumbImplProps, 'index'>
export interface SliderThumbProps extends PrimitiveProps {
  scopeOkuSlider?: Scope
}

export type SliderThumbElement = SliderThumbImplElement

</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useComponentRef } from '@oku-ui/use-composable'
import { useCollection } from './utils'
import OkuSliderThumbImpl from './SliderThumbImpl.vue'

defineOptions({
  name: 'OkuSliderThumb',
})

const props = defineProps<SliderThumbProps>()

const getItems = useCollection(props.scopeOkuSlider)

const { componentRef, currentElement: thumb } = useComponentRef<SliderThumbImplElement | null>()

// TODO: item.ref.value -react
const index = computed(() => (thumb.value
  ? getItems().findIndex(item => item.ref === thumb.value)
  : -1))

defineExpose({
  $el: thumb,
})
</script>

<template>
  <OkuSliderThumbImpl
    :is="props.is"
    ref="componentRef"
    :index="index"
    :scope-oku-slider="props.scopeOkuSlider"
    :as-child="props.asChild"
  >
    <slot />
  </okusliderthumbimpl>
</template>
