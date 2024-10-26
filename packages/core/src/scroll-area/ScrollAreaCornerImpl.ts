import { useResizeObserver } from '@vueuse/core'
import { computed, type Ref, shallowRef } from 'vue'
import { mergePrimitiveAttrs, type PrimitiveElAttrs, type RadixPrimitiveGetAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'

export function useScrollAreaCornerImpl(): RadixPrimitiveReturns<{
  hasSize: Ref<boolean>
  attrs: RadixPrimitiveGetAttrs
}> {
  const context = useScrollAreaContext('ScrollAreaCornerImpl')

  const width = shallowRef(0)
  const height = shallowRef(0)

  const hasSize = computed(() => Boolean(width.value && height.value))

  useResizeObserver(context.scrollbarX, () => {
    const _height = context.scrollbarX.value?.offsetHeight || 0
    context.onCornerHeightChange(_height)
    height.value = _height
  })

  useResizeObserver(context.scrollbarY, () => {
    const _width = context.scrollbarY.value?.offsetWidth || 0
    context.onCornerWidthChange(_width)
    width.value = _width
  })

  return {
    hasSize,
    attrs(extraAttrs) {
      const attrs: PrimitiveElAttrs = {
        style: {
          width: `${width.value}px`,
          height: `${height.value}px`,
          position: 'absolute',
          right: context.dir.value === 'ltr' ? 0 : undefined,
          left: context.dir.value === 'rtl' ? 0 : undefined,
          bottom: 0,
        },
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
