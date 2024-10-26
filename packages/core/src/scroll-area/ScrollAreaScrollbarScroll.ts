import type { ScrollAreaScrollbarVisibleProps, UseScrollAreaScrollbarVisibleProps } from './ScrollAreaScrollbarVisible.ts'
import { isClient, useDebounceFn } from '@vueuse/core'
import { onWatcherCleanup, type Ref, shallowRef, watchEffect } from 'vue'
import { useStateMachine } from '../hooks/index.ts'
import { usePresence } from '../presence/index.ts'
import { mergePrimitiveAttrs, type PrimitiveDefaultProps, type RadixPrimitiveGetAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'

export interface ScrollAreaScrollbarScrollProps {
  orientation?: ScrollAreaScrollbarVisibleProps['orientation']
  forceMount?: boolean
}

export const DEFAULT_SCROLLBAR_SCROLL_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<ScrollAreaScrollbarScrollProps>

export interface UseScrollAreaScrollbarScrollProps extends UseScrollAreaScrollbarVisibleProps {
  forceMount?: boolean
}

export function useScrollAreaScrollbarScroll(props: UseScrollAreaScrollbarScrollProps): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
  attrs: RadixPrimitiveGetAttrs
}> {
  const { orientation = 'vertical' } = props
  const isHorizontal = orientation === 'horizontal'
  const context = useScrollAreaContext('ScrollAreaScrollbarScroll')
  const scrollbar = isHorizontal ? context.scrollbarX : context.scrollbarY

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

  if (isClient) {
    watchEffect(() => {
      if (state.value !== 'idle')
        return

      const timeId = window.setTimeout(
        () => send('HIDE'),
        context.scrollHideDelay,
      )

      onWatcherCleanup(() => {
        window.clearTimeout(timeId)
      })
    })
  }

  watchEffect(() => {
    const viewport = context.viewport.value
    if (!viewport)
      return

    const scrollDirection = orientation === 'horizontal'
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

    onWatcherCleanup(() => {
      viewport.removeEventListener('scroll', handleScroll)
    })
  })

  const isPresent = props.forceMount ? shallowRef(true) : usePresence(scrollbar, () => state.value !== 'hidden')

  function onPointerenter(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    send('POINTER_ENTER')
  }

  function onPointerleave(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    send('POINTER_LEAVE')
  }

  return {
    isPresent,
    attrs(extraAttrs) {
      const attrs = {
        'data-state': state.value === 'hidden' ? 'hidden' : 'visible',
        'orientation': orientation,
        onPointerenter,
        onPointerleave,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
