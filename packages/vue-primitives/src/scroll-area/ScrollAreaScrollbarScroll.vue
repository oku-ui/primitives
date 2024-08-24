<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { shallowRef, useAttrs, watchEffect } from 'vue'
import { useStateMachine } from '../hooks/index.ts'
import { usePresence } from '../presence/usePresence.ts'
import { composeEventHandlers, forwardRef } from '../utils/vue.ts'
import { isFunction } from '../utils/is.ts'
import type { ScrollAreaScrollbarScrollProps } from './ScrollAreaScrollbarScroll.ts'
import { useScrollAreaContext } from './ScrollArea.ts'
import ScrollAreaScrollbarVisible from './ScrollAreaScrollbarVisible.vue'

defineOptions({
  name: 'ScrollAreaScrollbarScroll',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ScrollAreaScrollbarScrollProps>(), {
  orientation: 'vertical',
})
const attrs = useAttrs()

const $el = shallowRef<HTMLElement>()
const forwardedRef = forwardRef($el)

const context = useScrollAreaContext('ScrollAreaScrollbarScroll')

const [state, send] = useStateMachine('hidden', {
  hidden: {
    SCROLL: 'scrolling',
  },
  scrolling: {
    SCROLL_END: 'idle',
    POINTER_ENTER: 'interacting',
  },
  interacting: {
    SCROLL: 'interacting',
    POINTER_LEAVE: 'idle',
  },
  idle: {
    HIDE: 'hidden',
    SCROLL: 'scrolling',
    POINTER_ENTER: 'interacting',
  },
})

const debounceScrollEnd = useDebounceFn(() => send('SCROLL_END'), 100)

watchEffect((onCleanup) => {
  if (state.value !== 'idle')
    return

  const timeId = window.setTimeout(
    () => send('HIDE'),
    context.scrollHideDelay(),
  )

  onCleanup(() => {
    window.clearTimeout(timeId)
  })
})

watchEffect((onCleanup) => {
  const viewport = context.viewport.value
  if (!viewport)
    return

  const scrollDirection = props.orientation === 'horizontal'
    ? 'scrollLeft'
    : 'scrollTop'

  let prevScrollPos = viewport[scrollDirection]
  const handleScroll = () => {
    const scrollPos = viewport[scrollDirection]
    const hasScrollInDirectionChanged = prevScrollPos !== scrollPos
    if (hasScrollInDirectionChanged) {
      send('SCROLL')
      debounceScrollEnd()
    }
    prevScrollPos = scrollPos
  }
  viewport.addEventListener('scroll', handleScroll)

  onCleanup(() => {
    viewport.removeEventListener('scroll', handleScroll)
  })
})

const isPresent = usePresence($el, () => props.forceMount || state.value !== 'hidden')

const onPointerenter = composeEventHandlers<PointerEvent>((event) => {
  if (isFunction(attrs.onPointerenter))
    attrs.onPointerenter(event)
}, () => {
  send('POINTER_ENTER')
})

const onPointerleave = composeEventHandlers<PointerEvent>((event) => {
  if (isFunction(attrs.onPointerleave))
    attrs.onPointerleave(event)
}, () => {
  send('POINTER_LEAVE')
})

defineExpose({
  $el,
})
</script>

<template>
  <ScrollAreaScrollbarVisible
    v-if="isPresent"
    :ref="forwardedRef"
    :as="as"
    :as-child="asChild"
    :orientation="orientation"
    :data-state="state === 'hidden' ? 'hidden' : 'visible'"
    v-bind="{
      ...$attrs,
      onPointerenter,
      onPointerleave,
    }"
  >
    <slot />
  </ScrollAreaScrollbarVisible>
</template>
