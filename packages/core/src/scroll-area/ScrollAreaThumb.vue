<script setup lang="ts">
import { convertPropsToHookProps } from '../shared/index.ts'
import { DEFAULT_SCROLL_AREA_THUMB_PROPS, type ScrollAreaThumbProps, useScrollAreaThumb } from './ScrollAreaThumb.ts'
import ScrollAreaThumbImpl from './ScrollAreaThumbImpl.vue'

defineOptions({
  name: 'ScrollAreaThumb',
})

const props = withDefaults(defineProps<ScrollAreaThumbProps>(), DEFAULT_SCROLL_AREA_THUMB_PROPS)

const scrollAreaThumb = useScrollAreaThumb(convertPropsToHookProps(props))
</script>

<template>
  <ScrollAreaThumbImpl v-if="scrollAreaThumb.isPresent.value">
    <slot />
  </ScrollAreaThumbImpl>
</template>
