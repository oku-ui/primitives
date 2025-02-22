<script setup lang="ts">
import type { ScrollAreaScrollbarVisibleProps } from './ScrollAreaScrollbarVisible.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import {
  DEFAULT_SCROLL_AREA_SCROLLBAR_VISIBLE_PROPS,

  useScrollAreaScrollbarVisible,
} from './ScrollAreaScrollbarVisible.ts'

defineOptions({
  name: 'ScrollAreaScrollbarVisible',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ScrollAreaScrollbarVisibleProps>(), DEFAULT_SCROLL_AREA_SCROLLBAR_VISIBLE_PROPS)

const scrollAreaScrollbarVisible = useScrollAreaScrollbarVisible(convertPropsToHookProps(props))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(scrollAreaScrollbarVisible.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
