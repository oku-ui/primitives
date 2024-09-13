<script setup lang="ts">
import type { ScrollAreaScrollbarHoverProps } from './ScrollAreaScrollbarHover.ts'
import { shallowRef, watchEffect } from 'vue'
import { useForwardElement } from '../hooks/index.ts'
import { usePresence } from '../presence/index.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'
import ScrollAreaScrollbarAuto from './ScrollAreaScrollbarAuto.vue'

defineOptions({
  name: 'ScrollAreaScrollbarHover',
})

const props = withDefaults(defineProps<ScrollAreaScrollbarHoverProps>(), {
  orientation: 'vertical',
})
const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const context = useScrollAreaContext('ScrollAreaScrollbarHover')
const visible = shallowRef(false)

watchEffect((onCleanup) => {
  const scrollArea = context.scrollArea.value
  if (!scrollArea)
    return

  let hideTimer = 0

  const handlePointerEnter = () => {
    window.clearTimeout(hideTimer)
    visible.value = true
  }

  const handlePointerLeave = () => {
    hideTimer = window.setTimeout(() => {
      visible.value = false
    }, context.scrollHideDelay)
  }

  scrollArea.addEventListener('pointerenter', handlePointerEnter)
  scrollArea.addEventListener('pointerleave', handlePointerLeave)

  onCleanup(() => {
    window.clearTimeout(hideTimer)
    scrollArea.removeEventListener('pointerenter', handlePointerEnter)
    scrollArea.removeEventListener('pointerleave', handlePointerLeave)
  })
})

const isPresent = usePresence($el, () => props.forceMount || visible.value)
</script>

<template>
  <ScrollAreaScrollbarAuto
    v-if="isPresent"
    :ref="forwardElement"
    :orientation="orientation"
    :data-state="visible ? 'visible' : 'hidden'"
  >
    <slot />
  </ScrollAreaScrollbarAuto>
</template>
