import type { ScrollAreaScrollbarVisibleProps, UseScrollAreaScrollbarVisibleProps } from './ScrollAreaScrollbarVisible.ts'
import { useDebounceFn, useResizeObserver } from '@vueuse/core'
import { type Ref, shallowRef } from 'vue'
import { usePresence } from '../presence/index.ts'
import { mergePrimitiveAttrs, type PrimitiveDefaultProps, type RadixPrimitiveGetAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'

export interface ScrollAreaScrollbarAutoProps {
  orientation?: ScrollAreaScrollbarVisibleProps['orientation']
  forceMount?: boolean
}

export const DEFAULT_SCROLLBAR_AUTO_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<ScrollAreaScrollbarAutoProps>

export interface UseScrollAreaScrollbarAutoProps extends UseScrollAreaScrollbarVisibleProps {
  forceMount?: boolean
}

export function useScrollAreaScrollbarAuto(props: UseScrollAreaScrollbarAutoProps): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
  attrs: RadixPrimitiveGetAttrs
}> {
  const { orientation = 'vertical' } = props
  const isHorizontal = orientation === 'horizontal'
  const context = useScrollAreaContext('ScrollAreaScrollbarAuto')
  const visible = shallowRef(false)
  const scrollbar = isHorizontal ? context.scrollbarX : context.scrollbarY

  const handleResize = useDebounceFn(() => {
    const viewport = context.viewport.value
    if (viewport) {
      const isOverflowX = viewport.offsetWidth < viewport.scrollWidth
      const isOverflowY = viewport.offsetHeight < viewport.scrollHeight

      visible.value = orientation === 'horizontal' ? isOverflowX : isOverflowY
    }
  }, 10)

  useResizeObserver(context.viewport, handleResize)
  useResizeObserver(context.content, handleResize)

  const isPresent = props.forceMount ? shallowRef(true) : usePresence(scrollbar, visible)

  return {
    isPresent,
    attrs(extraAttrs) {
      const attrs = {
        'data-state': visible.value ? 'visible' : 'hidden',
        'orientation': orientation,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
