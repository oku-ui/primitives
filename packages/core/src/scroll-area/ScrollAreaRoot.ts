import type { MaybeRefOrGetter, Ref } from 'vue'
import type { Direction } from '../direction/index.ts'
import type { PrimitiveDefaultProps, PrimitiveElAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import { shallowRef } from 'vue'
import { useDirection } from '../direction/index.ts'
import { createContext } from '../hooks/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'

type ScrollAreaType = 'auto' | 'always' | 'scroll' | 'hover'

export interface ScrollAreaRootProps {
  type?: ScrollAreaType
  dir?: Direction
  scrollHideDelay?: number
}

export const DEFAULT_SCROLL_AREA_PROPS = {} satisfies PrimitiveDefaultProps<ScrollAreaRootProps>

export interface ScrollAreaContext {
  type: ScrollAreaType
  dir: Ref<Direction>
  scrollHideDelay: number
  scrollArea: Ref<HTMLElement | undefined>
  viewport: Ref<HTMLElement | undefined>
  content: Ref<HTMLElement | undefined>
  scrollbarX: Ref<HTMLElement | undefined>
  scrollbarXEnabled: Ref<boolean>
  onScrollbarXEnabledChange: (rendered: boolean) => void
  scrollbarY: Ref<HTMLElement | undefined>
  scrollbarYEnabled: Ref<boolean>
  onScrollbarYEnabledChange: (rendered: boolean) => void
  onCornerWidthChange: (width: number) => void
  onCornerHeightChange: (height: number) => void
}

export const [provideScrollAreaContext, useScrollAreaContext] = createContext<ScrollAreaContext>('ScrollArea')

export interface UseScrollAreaRootProps {
  el?: Ref<HTMLElement | undefined>
  type?: ScrollAreaType
  dir?: MaybeRefOrGetter<Direction | undefined>
  scrollHideDelay?: number
}

export function useScrollAreaRoot(props: UseScrollAreaRootProps): RadixPrimitiveReturns {
  const {
    type = 'hover',
    scrollHideDelay = 600,
  } = props

  const el = props.el || shallowRef<HTMLElement>()
  const setElRef = props.el ? undefined : (value: HTMLElement | undefined) => el.value = value

  const viewport = shallowRef<HTMLElement>()
  const content = shallowRef<HTMLDivElement>()
  const scrollbarX = shallowRef<HTMLElement>()
  const scrollbarY = shallowRef<HTMLElement>()
  const cornerWidth = shallowRef(0)
  const cornerHeight = shallowRef(0)
  const scrollbarXEnabled = shallowRef(false)
  const scrollbarYEnabled = shallowRef(false)

  const direction = useDirection(props.dir)

  provideScrollAreaContext({
    type,
    dir: direction,
    scrollHideDelay,
    scrollArea: el,
    viewport,
    content,
    scrollbarX,
    scrollbarXEnabled,
    onScrollbarXEnabledChange(rendered) {
      scrollbarXEnabled.value = rendered
    },
    scrollbarY,
    scrollbarYEnabled,
    onScrollbarYEnabledChange(rendered) {
      scrollbarYEnabled.value = rendered
    },
    onCornerWidthChange(width) {
      cornerWidth.value = width
    },
    onCornerHeightChange(height) {
      cornerHeight.value = height
    },
  })

  return {
    attrs(extraAttrs) {
      const attrs: PrimitiveElAttrs = {
        elRef: setElRef,
        dir: direction.value,
        style: {
          'position': 'relative',
          // Pass corner sizes as CSS vars to reduce re-renders of context consumers
          '--radix-scroll-area-corner-width': `${cornerWidth.value}px`,
          '--radix-scroll-area-corner-height': `${cornerHeight.value}px`,
        },
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
