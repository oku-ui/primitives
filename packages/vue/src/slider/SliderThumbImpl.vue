<script lang="ts">
import type { Scope } from '@oku-ui/provide'
import type { PrimitiveProps } from '@oku-ui/primitive'

export type SliderThumbImplElement = HTMLSpanElement

// extends Omit<SliderThumbImplProps, 'index'>
export interface SliderThumbImplProps extends PrimitiveProps {
  index: number
  scopeOkuSlider?: Scope
}

export type SliderThumbImplEmits = {
  focus: [event: FocusEvent]
}

</script>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { useComponentRef, useSize } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import {
  CollectionItemSlot,
  convertValueToPercentage,
  getLabel,
  getThumbInBoundsOffset,
  useSliderInject,
  useSliderOrientationInject,
} from './utils'

defineOptions({
  name: 'OkuSliderThumbImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SliderThumbImplProps>(), {
  is: 'span',
})

const emits = defineEmits<SliderThumbImplEmits>()

const inject = useSliderInject('OkuSlider', props.scopeOkuSlider)
const orientation = useSliderOrientationInject('OkuSliderOrientation', props.scopeOkuSlider)

const { componentRef, currentElement: thumb } = useComponentRef<SliderThumbImplElement | null>()

const size = useSize(thumb)

// We cast because index could be `-1` which would return undefined
const value = computed(() => inject.values.value?.[props.index!] as number | undefined)
const percent = computed(() => value.value === undefined ? 0 : convertValueToPercentage(value.value, inject.min.value, inject.max.value))
const label = computed(() => getLabel(props.index!, inject.values.value!.length))
const orientationSize = computed(() => size.value?.[orientation.size.value])

const thumbInBoundsOffset = computed(() => orientationSize.value
  ? getThumbInBoundsOffset(orientationSize.value!, percent.value, orientation.direction.value)
  : 0)

watchEffect((onClean) => {
  if (thumb.value)
    inject.thumbs.value.add(thumb.value)

  onClean(() => {
    if (thumb.value)
      inject.thumbs.value.delete(thumb.value)
  })
})

defineExpose({
  $el: thumb,
})
</script>

<template>
  <span
    :style="{
      transform: 'var(--oku-slider-thumb-transform)',
      position: 'absolute',
      [orientation.startEdge.value]: `calc(${percent}% + ${thumbInBoundsOffset}px)`,
    }"
  >
    <CollectionItemSlot
      :scope="props.scopeOkuSlider"
    >
      <Primitive
        v-bind="$attrs"
        :is="props.is"
        ref="componentRef"
        hello="asdasdasd"
        :as-child="props.asChild"
        role="slider"
        :aria-label="$attrs ? $attrs['aria-label'] || (label ? label : undefined) : undefined"
        :aria-valuemin="inject.min.value"
        :aria-valuenow="value"
        :aria-valuemax="inject.max.value"
        :aria-orientation="inject.orientation.value"
        :data-orientation="inject.orientation.value"
        :data-disabled="inject.disabled?.value ? '' : undefined"
        :tabindex="inject.disabled?.value ? undefined : 0"
        :style="value === undefined
          ? { display: 'none' }
          : { ...$attrs as any }"
        @focus="composeEventHandlers<SliderThumbImplEmits['focus'][0]>((event) => {
          emits('focus', event)
        }, () => {
          inject.valueIndexToChangeRef.value = index
        })($event)"
      >
        <slot />
      </Primitive>
    </CollectionItemSlot>
  </span>
</template>
