import type { ScrollAreaScrollbarVisibleProps, UseScrollAreaScrollbarVisibleProps } from './ScrollAreaScrollbarVisible.ts'
import { useDebounceFn, useResizeObserver } from '@vueuse/core'
import { type Ref, shallowRef } from 'vue'
import { usePresence } from '../presence/index.ts'
import { mergeHooksAttrs, type RadixPrimitiveGetAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'

export interface ScrollAreaScrollbarAutoProps {
  orientation?: ScrollAreaScrollbarVisibleProps['orientation']
  forceMount?: boolean
}

export interface UseScrollAreaScrollbarAutoProps extends UseScrollAreaScrollbarVisibleProps {
  forceMount?: boolean
}

export function useScrollAreaScrollbarAuto(props: UseScrollAreaScrollbarAutoProps): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
  attrs: RadixPrimitiveGetAttrs
}> {
  const isHorizontal = props.orientation === 'horizontal'
  const context = useScrollAreaContext('ScrollAreaScrollbarAuto')
  const visible = shallowRef(false)
  const scrollbar = isHorizontal ? context.scrollbarX : context.scrollbarY

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
        mergeHooksAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
