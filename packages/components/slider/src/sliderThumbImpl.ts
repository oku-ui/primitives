import { computed, defineComponent, h, ref, toRef, watchEffect } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef, useSize } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { CollectionItemSlot, convertValueToPercentage, getLabel, getThumbInBoundsOffset, scopeSliderProps, useSliderInject, useSliderOrientationInject } from './utils'
import { THUMB_NAME } from './sliderThumb'

export type SliderThumbImplIntrinsicElement = ElementType<'span'>
export type SliderThumbImplElement = HTMLSpanElement

export interface SliderThumbImplProps extends PrimitiveProps {
  index: number
}

export type SliderThumbImplEmits = {
  focus: [event: FocusEvent]
}

export const sliderThumbImplProps = {
  props: {
    index: {
      type: Number,
      required: true,
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    focus: (event: FocusEvent) => true,
  },
}

const THUMBIMPL_NAME = 'OkuSliderThumbImpl'
const sliderThumbImpl = defineComponent({
  name: THUMBIMPL_NAME,
  inheritAttrs: false,
  props: {
    ...sliderThumbImplProps.props,
    ...scopeSliderProps,
  },
  emits: sliderThumbImplProps.emits,
  setup(props, { attrs, slots, emit }) {
    const index = toRef(props, 'index')
    const inject = useSliderInject(THUMB_NAME, props.scopeOkuSlider)
    const orientation = useSliderOrientationInject(THUMB_NAME, props.scopeOkuSlider)
    const thumb = ref<HTMLSpanElement | null>(null)

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, thumb)
    const size = useSize(thumb)

    // We cast because index could be `-1` which would return undefined
    const value = computed(() => inject.values.value?.[index.value!] as number | undefined)
    const percent = computed(() => value.value === undefined ? 0 : convertValueToPercentage(value.value, inject.min.value, inject.max.value))
    const label = computed(() => getLabel(index.value!, inject.values.value!.length))
    const orientationSize = computed(() => size.value?.[orientation.size.value])

    const thumbInBoundsOffset = computed(() => orientationSize.value
      ? getThumbInBoundsOffset(orientationSize.value!, percent.value, orientation.direction.value)
      : 0)

    watchEffect((onClean) => {
      if (thumb.value)
        inject.thumbs.value.add(thumb.value)

      onClean(() => {
        if (thumb.value)
          inject.thumbs.value.delete(thumb.value)
      })
    })

    return () => h('span', {
      style: {
        transform: 'var(--oku-slider-thumb-transform)',
        position: 'absolute',
        [orientation.startEdge.value]: `calc(${percent.value}% + ${thumbInBoundsOffset.value}px)`,
      },
    }, {
      default: () => h(CollectionItemSlot, {
        scope: props.scopeOkuSlider,
      }, {
        default: () => h(Primitive.span, {
          'role': 'slider',
          'aria-label': attrs ? attrs['aria-label'] || label.value ? label.value : undefined : undefined,
          'aria-valuemin': inject.min.value,
          'aria-valuenow': value.value,
          'aria-valuemax': inject.max.value,
          'aria-orientation': inject.orientation.value,
          'data-orientation': inject.orientation.value,
          'data-disabled': inject.disabled?.value ? '' : undefined,
          'tabindex': inject.disabled?.value ? undefined : 0,
          ...attrs,
          'ref': composedRefs,
          /**
            * There will be no value on initial render while we work out the index so we hide thumbs
            * without a value, otherwise SSR will render them in the wrong position before they
            * snap into the correct position during hydration which would be visually jarring for
            * slower connections.
            */
          'style': value.value === undefined
            ? {
                display: 'none',
              }
            : {
                ...attrs.style as any,
              },
          'onFocus': composeEventHandlers<SliderThumbImplEmits['focus'][0]>((event) => {
            emit('focus', event)
          }, () => {
            inject.valueIndexToChangeRef.value = index.value!
          }),
        }, {
          default: () => slots.default?.(),
        }),
      }),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuSliderThumbImpl = sliderThumbImpl as typeof sliderThumbImpl &
(new () => {
  $props: Partial<SliderThumbImplElement>
})
