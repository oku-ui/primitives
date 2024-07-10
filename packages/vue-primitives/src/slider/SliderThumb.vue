<script setup lang="ts">
import { computed, shallowRef, useAttrs, watchEffect } from 'vue'
import { isClient } from '@vueuse/core'
import { Primitive } from '../primitive/index.ts'
import { useSize, useTemplateElRef } from '../hooks/index.ts'
import { composeEventHandlers } from '../utils/composeEventHandlers.ts'
import { isFunction } from '../utils/is.ts'
import type { SliderThumbProps } from './SliderThumb.ts'
import { Collection, useCollection, useSliderContext } from './Slider.ts'
import { useSliderOrientationContext } from './SliderOrientation.ts'
import { convertValueToPercentage, getLabel, getThumbInBoundsOffset } from './utils.ts'
import BubbleInput from './BubbleInput.vue'

defineOptions({
  name: 'SliderThumb',
  inheritAttrs: false,
})

withDefaults(defineProps<SliderThumbProps>(), {
  as: 'span',
})
const attrs = useAttrs()
const thumbRef = shallowRef<HTMLSpanElement>()
const setElRef = useTemplateElRef(thumbRef)

const getItems = useCollection()

const index = computed(() => thumbRef.value ? getItems().findIndex(item => item.ref === thumbRef.value) : -1)

Collection.useCollectionItem(thumbRef, undefined)

const context = useSliderContext('SliderThumbImpl')
const orientation = useSliderOrientationContext('SliderThumbImpl')

// We set this to true by default so that events bubble to forms without JS (SSR)
const isFormControl = computed(() => thumbRef.value ? Boolean(thumbRef.value.closest('form')) : true)
const size = useSize(thumbRef)

// We cast because index could be `-1` which would return undefined
const value = computed(() => context.values.value[index.value])

const percent = computed(() => value.value === undefined ? 0 : convertValueToPercentage(value.value, context.min.value, context.max.value))
const label = computed(() => getLabel(index.value, context.values.value.length))

const thumbInBoundsOffset = computed(() => {
  const orientationSize = size.value?.[orientation.value.size]
  return orientationSize ? getThumbInBoundsOffset(orientationSize, percent.value, orientation.value.direction) : 0
})

isClient && watchEffect((onCleanup) => {
  const thumb = thumbRef.value
  if (thumb) {
    context.thumbs.add(thumb)
    onCleanup(() => context.thumbs.delete(thumb))
  }
})

const onFocus = composeEventHandlers((event) => {
  isFunction(attrs.onFocus) && attrs.onFocus(event)
}, () => {
  context.valueIndexToChangeRef.value = index.value
})

defineExpose({
  $el: thumbRef,
})
</script>

<template>
  <span
    :style="{
      transform: 'var(--radix-slider-thumb-transform)',
      position: 'absolute',
      [orientation.startEdge]: `calc(${percent}% + ${thumbInBoundsOffset}px)`,
    }"
  >
    <Primitive
      :ref="setElRef"
      :as="as"
      :as-child="asChild"
      role="slider"
      :aria-label="$attrs['aria-label'] || label"
      :aria-valuemin="context.min.value"
      :aria-valuenow="value"
      :aria-valuemax="context.max.value"
      :aria-orientation="context.orientation.value"
      :data-orientation="context.orientation.value"
      :data-disabled="context.disabled.value ? '' : undefined"
      :tabindex="context.disabled.value ? undefined : 0"
      v-bind="{
        ...attrs,
        onFocus,
      }"
      :style="{
        /**
         * There will be no value on initial render while we work out the index so we hide thumbs
         * without a value, otherwise SSR will render them in the wrong position before they
         * snap into the correct position during hydration which would be visually jarring for
         * slower connections.
         */
        ...value === undefined ? { display: 'none' } : undefined,
      }"
    >
      <slot />
    </Primitive>

    <BubbleInput
      v-if="isFormControl"
      :key="index"
      :name=" name ?? (context.name.value ? context.name.value + (context.values.value.length > 1 ? '[]' : '') : undefined)"
      :value="value"
    />
  </span>
</template>
