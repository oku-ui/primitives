<script setup lang="ts">
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_SCROLLBAR_AUTO_PROPS, type ScrollAreaScrollbarAutoProps, useScrollAreaScrollbarAuto } from './ScrollAreaScrollbarAuto.ts'
import ScrollAreaScrollbarVisible from './ScrollAreaScrollbarVisible.vue'

defineOptions({
  name: 'ScrollAreaScrollbarAuto',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ScrollAreaScrollbarAutoProps>(), DEFAULT_SCROLLBAR_AUTO_PROPS)

const scrollAreaScrollbarAuto = useScrollAreaScrollbarAuto(convertPropsToHookProps(props))
</script>

<template>
  <ScrollAreaScrollbarVisible
    v-if="scrollAreaScrollbarAuto.isPresent.value"
    v-bind="normalizeAttrs(scrollAreaScrollbarAuto.attrs([$attrs]))"
  >
    <slot />
  </ScrollAreaScrollbarVisible>
</template>
