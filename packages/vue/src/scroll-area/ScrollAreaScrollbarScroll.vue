<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { composeEventHandlers } from '@oku-ui/utils'
import { usePrimitiveElement } from '@oku-ui/use-composable'
import { OkuPresence } from '@oku-ui/presence'
import { useScrollAreaContext } from './ScrollArea'
import { SCROLL_AREA_SCROLLBAR_NAME, SCROLL_AREA_SCROLLBAR_SCROLL_NAME } from './constants'
import { useStateMachine } from './useStateMachine'
import ScrollAreaScrollbarVisible from './ScrollAreaScrollbarVisible.vue'
import type { ScrollAreaScrollbarScrollEmits, ScrollAreaScrollbarScrollProps } from './ScrollAreaScrollbarScroll'
import { useDebounceCallback } from './utils'

defineOptions({
  name: SCROLL_AREA_SCROLLBAR_SCROLL_NAME,
  inheritAttrs: false,
})

const props = defineProps<ScrollAreaScrollbarScrollProps>()
const emit = defineEmits<ScrollAreaScrollbarScrollEmits>()

const context = useScrollAreaContext(SCROLL_AREA_SCROLLBAR_NAME, props.scopeOkuScrollArea)
const isHorizontal = computed(() => props.orientation === 'horizontal')
const { state, dispatch: send } = useStateMachine('hidden', {
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

const debounceScrollEnd = useDebounceCallback(() => send('SCROLL_END'), 100)

watchEffect((onInvalidate) => {
  if (state.value === 'idle') {
    const hideTimer = window.setTimeout(() => send('HIDE'), context.scrollHideDelay.value)

    onInvalidate(() => window.clearTimeout(hideTimer))
  }
})

watchEffect((onInvalidate) => {
  const viewport = context.viewport.value
  const scrollDirection = isHorizontal.value ? 'scrollLeft' : 'scrollTop'

  if (viewport) {
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

    onInvalidate(() => viewport.removeEventListener('scroll', handleScroll))
  }
})

const handlePointerenter = composeEventHandlers<ScrollAreaScrollbarScrollEmits['pointerenter'][0]>((event) => {
  emit('pointerenter', event)
}, () => send('POINTER_ENTER'))

const handlePointerleave = composeEventHandlers<ScrollAreaScrollbarScrollEmits['pointerleave'][0]>((event) => {
  emit('pointerleave', event)
}, () => send('POINTER_LEAVE'))

const [$el, forwardRef] = usePrimitiveElement()

defineExpose({
  $el,
})
</script>

<template>
  <OkuPresence :present="forceMount || state !== 'hidden'">
    <ScrollAreaScrollbarVisible
      :is="is"
      :ref="forwardRef"
      :as-child="asChild"
      :data-state="state === 'hidden' ? 'hidden' : 'visible'"
      :orientation="orientation"
      v-bind="$attrs"
      @pointerenter="handlePointerenter"
      @pointerleave="handlePointerleave"
    >
      <slot />
    </ScrollAreaScrollbarVisible>
  </OkuPresence>
</template>
