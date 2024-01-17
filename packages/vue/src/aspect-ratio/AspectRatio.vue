<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'

export interface AspectRatioProps extends PrimitiveProps {
  ratio?: number
}
</script>

<script setup lang="ts">
import { defineOptions } from 'vue'
import { useComponentRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'

defineOptions({
  name: 'OkuAspectRatio',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AspectRatioProps>(), {
  ratio: 1 / 1,
})

const { componentRef, currentElement } = useComponentRef<HTMLDivElement | null>()

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <div
    :style="{
      // ensures inner element is contained
      position: 'relative',
      // ensures padding bottom trick maths works
      width: '100%',
      paddingBottom: `${100 / props.ratio}%`,
    }"
    data-oku-aspect-ratio-wrapper=""
  >
    <Primitive
      is="div"
      v-bind="$attrs"
      ref="componentRef"
      :style="{
        ...$attrs.style as any,
        // ensures children expand in ratio
        position: 'absolute',
        top: '0px',
        right: '0px',
        left: '0px',
        bottom: '0px',
      }"
    >
      <slot />
    </Primitive>
  </div>
</template>
