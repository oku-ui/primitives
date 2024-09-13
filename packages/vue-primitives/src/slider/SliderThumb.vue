<script setup lang="ts">
import type { SliderThumbEmits, SliderThumbProps } from './SliderThumb.ts'
import { isClient } from '@vueuse/core'
import { computed, shallowRef, watchEffect } from 'vue'
import { DATA_COLLECTION_ITEM } from '../collection/index.ts'
import { useForwardElement, useSize } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import BubbleInput from './BubbleInput.vue'
import { useSliderOrientationContext } from './SliderOrientation.ts'
import { useCollection, useSliderContext } from './SliderRoot.ts'
import { convertValueToPercentage, getLabel, getThumbInBoundsOffset } from './utils.ts'

defineOptions({
  name: 'SliderThumb',
  inheritAttrs: false,
})

withDefaults(defineProps<SliderThumbProps>(), {
  as: 'span',
})
const emit = defineEmits<SliderThumbEmits>()
const $el = shallowRef<HTMLSpanElement>()
const forwardElement = useForwardElement($el)

const getItems = useCollection()

const index = computed(() => $el.value ? getItems().findIndex(item => item === $el.value) : -1)

const context = useSliderContext('SliderThumbImpl')
const orientation = useSliderOrientationContext('SliderThumbImpl')

// We set this to true by default so that events bubble to forms without JS (SSR)
const isFormControl = computed(() => $el.value ? Boolean($el.value.closest('form')) : true)
const size = useSize($el)

// We cast because index could be `-1` which would return undefined
const value = computed(() => context.values.value[index.value])

const percent = computed(() => value.value === undefined ? 0 : convertValueToPercentage(value.value, context.min(), context.max()))
const label = computed(() => getLabel(index.value, context.values.value.length))

const thumbInBoundsOffset = computed(() => {
  const orientationSize = size.value?.[orientation.value.size]
  return orientationSize ? getThumbInBoundsOffset(orientationSize, percent.value, orientation.value.direction) : 0
})

if (isClient) {
  watchEffect((onCleanup) => {
    const thumb = $el.value
    if (thumb) {
      context.thumbs.add(thumb)
      onCleanup(() => context.thumbs.delete(thumb))
    }
  })
}

const onFocus = composeEventHandlers<FocusEvent>((event) => {
  emit('focus', event)
}, () => {
  context.valueIndexToChangeRef.current = index.value
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
      :ref="forwardElement"
      :as="as"
      role="slider"
      :aria-label="$attrs['aria-label'] || label"
      :aria-valuemin="context.min()"
      :aria-valuenow="value"
      :aria-valuemax="context.max()"
      :aria-orientation="context.orientation()"
      :data-orientation="context.orientation()"
      :data-disabled="context.disabled() ? '' : undefined"
      :tabindex="context.disabled() ? undefined : 0"
      :[DATA_COLLECTION_ITEM]="true"
      v-bind="$attrs"
      :style="{
        /**
         * There will be no value on initial render while we work out the index so we hide thumbs
         * without a value, otherwise SSR will render them in the wrong position before they
         * snap into the correct position during hydration which would be visually jarring for
         * slower connections.
         */
        ...value === undefined ? { display: 'none' } : undefined,
      }"
      @focus="onFocus"
    >
      <slot />
    </Primitive>

    <BubbleInput
      v-if="isFormControl"
      :key="index"
      :name="name ?? (context.name() ? context.name() + (context.values.value.length > 1 ? '[]' : '') : undefined)"
      :value="value"
    />
  </span>
</template>
