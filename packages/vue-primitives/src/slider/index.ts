export { default as SliderRoot } from './SliderRoot.vue'
export { default as SliderTrack } from './SliderTrack.vue'
export { default as SliderRange } from './SliderRange.vue'
export { default as SliderThumb } from './SliderThumb.vue'

export {
  type SliderOrientationContext,
  provideSliderOrientationContext,
  useSliderOrientationContext,
} from './SliderOrientation.ts'

export {
  type SliderRootProps,
  type SliderRootEmits,
  type SliderContext,
  provideSliderContext,
  useSliderContext,
} from './SliderRoot.ts'

export {
  type SliderTrackProps,
} from './SliderTrack.ts'

export {
  type SliderRangeProps,
} from './SliderRange.ts'

export {
  type SliderThumbProps,
  type SliderThumbEmits,
} from './SliderThumb.ts'
