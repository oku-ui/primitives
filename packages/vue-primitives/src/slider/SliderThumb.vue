<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import SliderBubbleInput from './SliderBubbleInput.vue'
import { type SliderThumbProps, useSliderThumb } from './SliderThumb.ts'

defineOptions({
  name: 'SliderThumb',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SliderThumbProps>(), {
  as: 'span',
})

const sliderThumb = useSliderThumb({
  name() {
    return props.name
  },
})
</script>

<template>
  <span v-bind="sliderThumb.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(sliderThumb.attrs([$attrs, { as }]))">
      <slot />
    </Primitive>

    <SliderBubbleInput
      v-if="sliderThumb.isFormControl.value"
      :key="sliderThumb.bubbleInput.index.value"
      :name="sliderThumb.bubbleInput.name()"
      :value="sliderThumb.bubbleInput.value.value"
    />
  </span>
</template>
