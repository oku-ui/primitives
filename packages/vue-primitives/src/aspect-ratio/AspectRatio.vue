<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/mergeProps.ts'
import { type AspectRatioProps, useAspectRatio } from './AspectRatio.ts'

defineOptions({
  name: 'AspectRatio',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AspectRatioProps>(), {
  ratio: 1,
})

const aspectRatio = useAspectRatio({
  ratio() {
    return props.ratio
  },
})
</script>

<template>
  <div v-bind="aspectRatio.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(aspectRatio.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
