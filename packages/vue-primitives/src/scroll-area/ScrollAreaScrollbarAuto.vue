<script setup lang="ts">
import type { ScrollAreaScrollbarAutoProps } from './ScrollAreaScrollbarAuto.ts'
import { useDebounceFn, useResizeObserver } from '@vueuse/core'
import { shallowRef } from 'vue'
import { useForwardElement } from '../hooks/index.ts'
import { usePresence } from '../presence/index.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'
import ScrollAreaScrollbarVisible from './ScrollAreaScrollbarVisible.vue'

defineOptions({
  name: 'ScrollAreaScrollbarAuto',
})

const props = withDefaults(defineProps<ScrollAreaScrollbarAutoProps>(), {
  orientation: 'vertical',
})
const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const context = useScrollAreaContext('ScrollAreaScrollbarAuto')
const visible = shallowRef(false)

const handleResize = useDebounceFn(() => {
  const viewport = context.viewport.value
  if (viewport) {
    const isOverflowX = viewport.offsetWidth < viewport.scrollWidth
    const isOverflowY = viewport.offsetHeight < viewport.scrollHeight

    visible.value = props.orientation === 'horizontal' ? isOverflowX : isOverflowY
  }
}, 10)

useResizeObserver(context.viewport, handleResize)
useResizeObserver(context.content, handleResize)

const isPresent = usePresence($el, () => props.forceMount || visible.value)
</script>

<template>
  <ScrollAreaScrollbarVisible
    v-if="isPresent"
    :ref="forwardElement"
    :orientation="orientation"
    :data-state="visible ? 'visible' : 'hidden'"
  >
    <slot />
  </ScrollAreaScrollbarVisible>
</template>
