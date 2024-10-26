<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { type AspectRatioProps, DEFAULT_ASPECT_RATIO_PROPS, useAspectRatio } from './AspectRatio.ts'

defineOptions({
  name: 'AspectRatio',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AspectRatioProps>(), DEFAULT_ASPECT_RATIO_PROPS)

const aspectRatio = useAspectRatio(convertPropsToHookProps(props, ['ratio']))
</script>

<template>
  <div v-bind="aspectRatio.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(aspectRatio.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
