export { default as ScrollAreaRoot } from './ScrollAreaRoot.vue'
export { default as ScrollAreaViewport } from './ScrollAreaViewport.vue'
export { default as ScrollAreaContent } from './ScrollAreaContent.vue'
export { default as ScrollAreaScrollbar } from './ScrollAreaScrollbar.vue'
export { default as ScrollAreaCorner } from './ScrollAreaCorner.vue'
export { default as ScrollAreaThumb } from './ScrollAreaThumb.vue'

export {
  type ScrollAreaRootProps,
  type ScrollAreaContext,
  provideScrollAreaContext,
  useScrollAreaContext,
} from './ScrollAreaRoot.ts'

export {
  type ScrollAreaScrollbarProps,
  type ScrollAreaThumbElement,
  type ScrollbarContext,
  provideScrollbarContext,
  useScrollbarContext,
} from './ScrollAreaScrollbar.ts'

export {
  type ScrollAreaThumbProps,
  type ScrollAreaThumbEmits,
} from './ScrollAreaThumb.ts'
