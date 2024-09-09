<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import { shallowRef } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'

defineOptions({
  name: 'ScrollAreaCornerImpl',
})

const context = useScrollAreaContext('ScrollAreaCornerImpl')

const width = shallowRef(0)
const height = shallowRef(0)

const hasSize = () => Boolean(width.value && height.value)

useResizeObserver(context.scrollbarX, () => {
  const _height = context.scrollbarX.value?.offsetHeight || 0
  context.onCornerHeightChange(_height)
  height.value = _height
})

useResizeObserver(context.scrollbarY, () => {
  const _width = context.scrollbarY.value?.offsetWidth || 0
  context.onCornerWidthChange(_width)
  width.value = _width
})
</script>

<template>
  <Primitive
    v-if="hasSize()"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      position: 'absolute',
      right: context.dir.value === 'ltr' ? 0 : undefined,
      left: context.dir.value === 'rtl' ? 0 : undefined,
      bottom: 0,
    }"
  >
    <slot />
  </Primitive>
</template>
