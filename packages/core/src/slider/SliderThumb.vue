<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import SliderBubbleInput from './SliderBubbleInput.vue'
import { DEFAULT_SLIDER_THUMB_PROPS, type SliderThumbProps, useSliderThumb } from './SliderThumb.ts'

defineOptions({
  name: 'SliderThumb',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SliderThumbProps>(), DEFAULT_SLIDER_THUMB_PROPS)

const sliderThumb = useSliderThumb(convertPropsToHookProps(props, ['name']))
</script>

<template>
  <span v-bind="sliderThumb.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(sliderThumb.attrs([$attrs, { as }]))">
      <slot />
    </Primitive>

    <SliderBubbleInput
      v-if="sliderThumb.isFormControl.value"
      :name="sliderThumb.bubbleInput.name()"
      :value="sliderThumb.bubbleInput.value.value"
    />
  </span>
</template>
