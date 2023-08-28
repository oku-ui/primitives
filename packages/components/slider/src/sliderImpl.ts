import { defineComponent, h, toRefs } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import type { ScopeSlider } from './utils'
import { scopeSliderProps } from './utils'
import { SLIDER_NAME, useSliderInject } from './slider'

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
      asChild,
    } = toRefs(props)
    const { ...restAttrs } = attrs as SliderImplIntrinsicElement
    const inject = useSliderInject(SLIDER_NAME, scopeOkuSlider.value)

    const forwardedRef = useForwardRef()

    return () => h(Primitive.span, {
      ...attrs,
      ref: forwardedRef,
      onKeydown: composeEventHandlers((event) => {
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
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuSliderImpl = sliderImpl as typeof sliderImpl &
(new () => {
  $props: ScopeSlider<Partial<SliderImplElement>>
})
