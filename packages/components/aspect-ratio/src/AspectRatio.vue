<script lang="ts" setup>
import { ref } from 'vue'
import type { ComponentPropsWithoutRef, ElementRef } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'

export type PrimitiveAspectRatioProps = ComponentPropsWithoutRef<typeof Primitive.div>
export type AspectRatioElement = ElementRef<typeof Primitive.div>

export interface AspectRatioProps extends PrimitiveAspectRatioProps {
  ratio?: number
}

withDefaults(defineProps<AspectRatioProps>(), {
  ratio: 1 / 1,
})

defineOptions({
  name: 'AspectRatio',
})

// AspectRatioElement type is HTMLAtrributes forwardedRef should be point to ComponentPublicInstance or Element
const forwardedRef = ref<AspectRatioElement>()

defineExpose({
  forwardedRef,
})
</script>

<template>
  <Primitive.div
    :style="{
      position: 'relative',
      width: '100%',
      paddingBottom: `${100 / ratio}%`,
    }" data-radix-aspect-ratio-wrapper
  >
    <Primitive.div
      v-bind="$attrs" ref="forwardedRef" :style="{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }"
    >
      <slot />
    </Primitive.div>
  </Primitive.div>
</template>
