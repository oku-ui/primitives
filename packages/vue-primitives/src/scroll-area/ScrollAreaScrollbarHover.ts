import type { RadixPrimitiveGetAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import type { ScrollAreaScrollbarVisibleProps, UseScrollAreaScrollbarVisibleProps } from './ScrollAreaScrollbarVisible.ts'
import { onWatcherCleanup, type Ref, shallowRef, watchEffect } from 'vue'
import { usePresence } from '../presence/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'

export interface ScrollAreaScrollbarHoverProps {
  orientation?: ScrollAreaScrollbarVisibleProps['orientation']
  forceMount?: boolean
}

export interface UseScrollAreaScrollbarHoverProps extends UseScrollAreaScrollbarVisibleProps {
  forceMount?: boolean
}

export function useScrollAreaScrollbarHover(props: UseScrollAreaScrollbarHoverProps): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
  attrs: RadixPrimitiveGetAttrs
}> {
  const isHorizontal = props.orientation === 'horizontal'
  const context = useScrollAreaContext('ScrollAreaScrollbarHover')
  const visible = shallowRef(false)
  const scrollbar = isHorizontal ? context.scrollbarX : context.scrollbarY

  watchEffect(() => {
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

    onWatcherCleanup(() => {
      window.clearTimeout(hideTimer)
      scrollArea.removeEventListener('pointerenter', handlePointerEnter)
      scrollArea.removeEventListener('pointerleave', handlePointerLeave)
    })
  })

  let isPresent: Ref<boolean>
  if (props.forceMount)
    isPresent = shallowRef(true)
  else
    isPresent = usePresence(scrollbar, visible)

  return {
    isPresent,
    attrs(extraAttrs) {
      const attrs = {
        'data-state': visible.value ? 'visible' : 'hidden',
        'orientation': props.orientation,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
