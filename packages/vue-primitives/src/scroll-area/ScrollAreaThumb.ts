import type { PrimitiveDefaultProps } from '../shared/index.ts'
import { shallowRef } from 'vue'
import { usePresence } from '../presence/index.ts'
import { useScrollbarContext } from './ScrollAreaScrollbar.ts'

export interface ScrollAreaThumbProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: boolean
}

export const DEFAULT_SCROLL_AREA_THUMB_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<ScrollAreaThumbProps>

export interface UseScrollAreaThumbProps {
  forceMount?: boolean
}

export function useScrollAreaThumb(props: UseScrollAreaThumbProps) {
  const scrollbarContext = useScrollbarContext('ScrollAreaThumb')

  const isPresent = props.forceMount ? shallowRef(true) : usePresence(scrollbarContext.thumb, scrollbarContext.hasThumb)

  return {
    isPresent,
  }
}
