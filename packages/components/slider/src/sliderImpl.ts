import { defineComponent, h, toRefs } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import type { ScopeSlider } from './utils'
import { ARROW_KEYS, PAGE_KEYS, SLIDER_NAME, scopeSliderProps, useSliderInject } from './utils'

export type SliderImplIntrinsicElement = ElementType<'span'>
export type SliderImplElement = HTMLSpanElement

export type SliderImplPrivateEmits = {
  'slideStart': [event: PointerEvent]
  'slideMove': [event: PointerEvent]
  'slideEnd': [event: PointerEvent]
  'homeKeyDown': [event: KeyboardEvent]
  'endKeyDown': [event: KeyboardEvent]
  'stepKeyDown': [event: KeyboardEvent]
  'keydown': [event: KeyboardEvent]
  'pointerdown': [event: PointerEvent]
  'pointermove': [event: PointerEvent]
  'pointerup': [event: PointerEvent]
}

export const sliderImplPrivateProps = {
  props: {},
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    slideStart: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    slideMove: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    slideEnd: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    homeKeydown: (event: KeyboardEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    endKeydown: (event: KeyboardEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    stepKeydown: (event: KeyboardEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    keydown: (event: KeyboardEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdown: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointermove: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerup: (event: PointerEvent) => true,
  },
}

export interface SliderImplProps extends PrimitiveProps {}

export type SliderImplEmits = SliderImplPrivateEmits

export const sliderImplProps = {
  props: {
    ...sliderImplPrivateProps.props,
    ...primitiveProps,
  },
  emits: {
    ...sliderImplPrivateProps.emits,
  },
}

const NAME = 'OkuSliderImpl'

const sliderImpl = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...sliderImplProps.props,
    ...scopeSliderProps,
  },
  emits: sliderImplProps.emits,
  setup(props, { attrs, slots, emit }) {
    const {
      scopeOkuSlider,
    } = toRefs(props)
    const inject = useSliderInject(SLIDER_NAME, scopeOkuSlider.value)

    const forwardedRef = useForwardRef()

    return () => h(Primitive.span, {
      ...attrs,
      ref: forwardedRef,
      onKeydown: composeEventHandlers<SliderImplPrivateEmits['keydown'][0]>((event) => {
        emit('keydown', event)
      }, (event) => {
        if (event.key === 'Home') {
          emit('homeKeydown', event)
          // Prevent scrolling to page start
          event.preventDefault()
        }
        else if (event.key === 'End') {
          emit('endKeydown', event)
          // Prevent scrolling to page end
          event.preventDefault()
        }
        else if (PAGE_KEYS.concat(ARROW_KEYS).includes(event.key)) {
          emit('stepKeydown', event)
          // Prevent scrolling for directional key presses
          event.preventDefault()
        }
      }),
      onPointerdown: composeEventHandlers<SliderImplPrivateEmits['pointerdown'][0]>((event) => {
        emit('pointerdown', event)
      }, (event) => {
        const target = event.target as HTMLElement
        target.setPointerCapture(event.pointerId)
        // Prevent browser focus behaviour because we focus a thumb manually when values change.
        event.preventDefault()
        // Touch devices have a delay before focusing so won't focus if touch immediately moves
        // away from target (sliding). We want thumb to focus regardless.
        if (inject.thumbs.value.has(target))
          target.focus()
        else
          emit('slideStart', event)
      }),
      onPointermove: composeEventHandlers<SliderImplPrivateEmits['pointermove'][0]>((event) => {
        emit('pointermove', event)
      }, (event) => {
        const target = event.target as HTMLElement
        if (target.hasPointerCapture(event.pointerId))
          emit('slideMove', event)
      }),
      onPointerup: composeEventHandlers<SliderImplPrivateEmits['pointerup'][0]>((event) => {
        emit('pointerup', event)
      }, (event) => {
        const target = event.target as HTMLElement
        if (target.hasPointerCapture(event.pointerId)) {
          target.releasePointerCapture(event.pointerId)
          emit('slideEnd', event)
        }
      }),
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuSliderImpl = sliderImpl as typeof sliderImpl &
(new () => {
  $props: ScopeSlider<Partial<SliderImplElement>>
})
