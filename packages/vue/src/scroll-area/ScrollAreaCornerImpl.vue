<script setup lang="ts">
import { computed, ref } from 'vue'
import { useScrollAreaContext } from './ScrollArea'
import { SCROLL_AREA_CORNER_IMPL_NAME, SCROLL_AREA_CORNER_NAME } from './constants'
import type { ScrollAreaCornerImplProps } from './ScrollAreaCornerImpl'
import { Primitive } from '@oku-ui/primitive'
import { useResizeObserver } from '@vueuse/core'

defineOptions({
  name: SCROLL_AREA_CORNER_IMPL_NAME,
})

const props = defineProps<ScrollAreaCornerImplProps>()

const context = useScrollAreaContext(SCROLL_AREA_CORNER_NAME, props.scopeOkuScrollArea)

const width = ref(0)
const height = ref(0)

const hasSize = computed(() => Boolean(width.value && height.value))

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
    v-if="hasSize"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      position: 'absolute',
      right: context.dir.value === 'ltr' ? 0 : undefined,
      left: context.dir.value === 'rtl' ? 0 : undefined,
      bottom: 0,
    }"
    v-bind="$parent?.$props"
  >
    <slot />
  </Primitive>
</template>
