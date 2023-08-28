import type { PropType, Ref } from 'vue'
import { defineComponent, h } from 'vue'
import { createProvideScope } from '@oku-ui/provide'
import type { AriaAttributes, ElementType } from '@oku-ui/primitive'
import { Primitive, primitiveProps, propsOmit } from '@oku-ui/primitive'
import { createCollection } from '@oku-ui/collection'
import { useForwardRef } from '@oku-ui/use-composable'
import type { RovingFocusGroupProps } from '@oku-ui/roving-focus'
import type { Direction, ScopeSlider } from './utils'
import type { SliderThumbElement } from './sliderThumb'
import { type SliderHorizontalElement, type SliderHorizontalIntrinsicElement, type SliderOrientationPrivateProps, sliderHorizontalProps, sliderOrientationPrivateProps } from './sliderHorizontal'
import type { SliderVerticalElement, SliderVerticalIntrinsicElement, SliderVerticalProps } from './sliderVertical'
import { sliderVerticalProps } from './sliderVertical'

export const SLIDER_NAME = 'OkuSlider'

const { CollectionProvider, CollectionItemSlot, CollectionSlot, useCollection, createCollectionScope } = createCollection<SliderThumbElement, unknown>(SLIDER_NAME)

export {
  CollectionProvider,
  CollectionItemSlot,
  CollectionSlot,
  useCollection,
}

export const [createSliderProvider, createSliderScope] = createProvideScope(SLIDER_NAME, [
  createCollectionScope],
)

type SliderInjectValue = {
  disabled?: Ref<boolean>
  min: Ref<number>
  max: Ref<number>
  values: Ref<number[]>
  valueIndexToChangeRef: Ref<number>
  thumbs: Ref<Set<SliderThumbElement>>
  orientation: Ref<SliderProps['orientation']>
}

export const [sliderProvider, useSliderInject]
  = createSliderProvider<SliderInjectValue>(SLIDER_NAME)

interface SliderHorizontalProps extends SliderOrientationPrivateProps {
  dir?: Direction
}

export type SliderIntrinsicElement = SliderHorizontalIntrinsicElement | SliderVerticalIntrinsicElement
export type SliderElement = SliderHorizontalElement | SliderVerticalElement

export interface SliderProps extends Omit<
SliderHorizontalProps | SliderVerticalProps,
keyof SliderOrientationPrivateProps | 'defaultValue'
> {
  name?: string
  disabled?: boolean
  orientation?: AriaAttributes['aria-orientation']
  dir?: Direction
  min?: number
  max?: number
  step?: number
  minStepsBetweenThumbs?: number
  value?: number[]
  defaultValue?: number[]
  inverted?: boolean
}

export type SliderPropsEmits = {
  valueChange: (value: number[]) => true
  valueCommit: (value: number[]) => true
}

export const sliderProps = {
  props: {
    ...propsOmit(sliderHorizontalProps.props, [
      'min',
      'max',
      'inverted',
    ]),
    ...propsOmit(sliderVerticalProps.props, [
      'min',
      'max',
      'inverted',
    ]),
    name: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    disabled: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    orientation: {
      type: String as PropType<SliderProps['orientation']>,
      default: 'horizontal',
    },
    dir: {
      type: String as PropType<Direction>,
      default: undefined,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    minStepsBetweenThumbs: {
      type: Number,
      default: 0,
    },
    value: {
      type: Array as PropType<number[] | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: Array as PropType<number[] | undefined>,
      default: undefined,
    },
    inverted: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    ...sliderHorizontalProps.emits,
    ...sliderVerticalProps.emits,
    // eslint-disable-next-line unused-imports/no-unused-vars
    valueChange: (value: number[]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    valueCommit: (value: number[]) => true,
  },
}

// TODO: x

const label = defineComponent({
  name: SLIDER_NAME,
  inheritAttrs: false,
  props: {
    ...sliderProps.props,
  },
  emits: sliderProps.emits,
  setup(props, { attrs, slots }) {
    const { ...restAttrs } = attrs as SliderIntrinsicElement

    const forwardedRef = useForwardRef()

    const originalReturn = () => h(Primitive.span, {
      ...restAttrs,
      ref: forwardedRef,
      asChild: props.asChild,
      // burada kaldım
      onChange: (value) => {
        const thumbs = [...thumbRefs.current]
        thumbs[valueIndexToChangeRef.current]?.focus()
        restAttrs.onChange?.(value)
      },
      onMousedown: (event: MouseEvent) => {
        restAttrs.onMousedown?.(event)
        // prevent text selection when double clicking label
        if (!event.defaultPrevented && event.detail > 1)
          event.preventDefault()
      },
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuSlider = label as typeof label &
(new () => {
  $props: ScopeSlider<Partial<SliderElement>>
})
