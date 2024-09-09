<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { shallowRef, watchEffect } from 'vue'
import { useForwardElement, useStateMachine } from '../hooks/index.ts'
import { usePresence } from '../presence/usePresence.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'
import ScrollAreaScrollbarVisible from './ScrollAreaScrollbarVisible.vue'
import type { ScrollAreaScrollbarScrollEmits, ScrollAreaScrollbarScrollProps } from './ScrollAreaScrollbarScroll.ts'

defineOptions({
  name: 'ScrollAreaScrollbarScroll',
})

const props = withDefaults(defineProps<ScrollAreaScrollbarScrollProps>(), {
  orientation: 'vertical',
})
const emit = defineEmits<ScrollAreaScrollbarScrollEmits>()

const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

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
    context.scrollHideDelay,
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
  emit('pointerenter', event)
}, () => {
  send('POINTER_ENTER')
})

const onPointerleave = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerleave', event)
}, () => {
  send('POINTER_LEAVE')
})
</script>

<template>
  <ScrollAreaScrollbarVisible
    v-if="isPresent"
    :ref="forwardElement"
    :orientation="orientation"
    :data-state="state === 'hidden' ? 'hidden' : 'visible'"
    @pointerenter="onPointerenter"
    @pointerleave="onPointerleave"
  >
    <slot />
  </ScrollAreaScrollbarVisible>
</template>
