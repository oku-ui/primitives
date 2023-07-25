import { computed, defineComponent, h, onMounted, ref, toRefs, useModel } from 'vue'
import type { ComputedRef, PropType, Ref } from 'vue'

import { Primitive } from '@oku-ui/primitive'
import type {
  ElementType,
  MergeProps,
  PrimitiveProps,
} from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'
import { useControllable, useRef } from '@oku-ui/use-composable'
import { composeEventHandlers, toValue } from '@oku-ui/utils'
import { clamp, getDecimalCount, roundValue } from './utils'
import { BubbleInput } from './BubbleInput'

type Orientation = 'horizontal' | 'vertical'

const PAGE_KEYS = ['PageUp', 'PageDown']
const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
const UP_KEYS = ['ArrowUp', 'ArrowRight', 'PageUp']
const DOWN_KEYS = ['ArrowDown', 'ArrowLeft', 'PageDown']

const SLIDER_NAME = 'OkuSlider'

type SliderElement = ElementType<'span'>

type SliderContextValue = {
  disabled?: Ref<boolean>
  min: number
  max: number
  value: Ref<number> | ComputedRef<number>
  step: number
}

interface SliderProps extends PrimitiveProps {
  name?: string
  disabled?: boolean
  orientation?: Orientation
  // TODO: direction support
  required?: boolean
  min?: number
  max?: number
  step?: number
  minStepsBetweenThumbs?: number
  value?: number
  defaultValue?: number | number[]
  onValueChange?: (value: number[]) => void
  onValueCommit?: (value: number[]) => void
  inverted?: boolean // inverted mode
}

const [createSliderContext, createSliderScope]
  = createProvideScope(SLIDER_NAME)

const [sliderProvider, useSliderContext]
  = createSliderContext<SliderContextValue>(SLIDER_NAME)

const Slider = defineComponent({
  name: SLIDER_NAME,
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Number as PropType<number>,
      default: undefined,
    },
    name: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    orientation: {
      type: String as PropType<Orientation>,
      default: 'horizontal',
    },
    required: {
      type: Boolean,
      default: false,
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
      type: Number,
      default: undefined,
    },
    defaultValue: {
      type: Number as PropType<number>,
      default: 0,
    },
    onValueChange: {
      type: Function as PropType<(value: number) => void>,
      default: undefined,
    },
    onValueCommit: {
      type: Function as PropType<(value: number) => void>,
      default: undefined,
    },
    inverted: {
      type: Boolean,
      default: false,
    },
    scopeSlider: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
    asChild: {
      type: Boolean,
      default: undefined,
    },
  },

  emits: ['update:modelValue'],
  setup(props, { attrs, expose, emit, slots }) {
    const {
      disabled,
      orientation,
      min,
      max,
      step,
      // minStepsBetweenThumbs,
      value: valueProp,
      defaultValue,
      onValueChange,
      onValueCommit,
      // inverted,
      name,
      scopeSlider,
      required,
    } = toRefs(props)

    const { ...sliderProps } = attrs as SliderElement

    const { $el, newRef: span } = useRef<SliderElement>()

    const modelValue = useModel(props, 'modelValue')

    const isFormControl = ref<boolean>(false)

    const hasConsumerStoppedPropagationRef = ref<boolean>(false)

    onMounted(() => {
      isFormControl.value = span.value
        ? typeof ($el.value as Element).closest === 'function'
        && Boolean(($el.value as Element).closest('form'))
        : true
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => modelValue.value ?? valueProp.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (value: number) => {
        onValueChange.value?.(value)
        emit('update:modelValue', value)
      },
    })

    // update functions
    function setValue(value: number, { commit } = { commit: false }) {
      const demicalCount = getDecimalCount(step.value)
      const snapToStep = roundValue(
        (Math.round(value - min.value) / step.value) * step.value + min.value, demicalCount,
      )

      const nextValue = clamp(snapToStep, [min.value, max.value])

      updateValue(nextValue)
    }

    const previousValue = ref<number>(state.value ?? 0)

    function getValueFromPointer(pointerValue: number) {
      const rect = ($el.value as Element)?.getBoundingClientRect()
      const { x, y } = rect
      const precent = orientation.value === 'horizontal'
        ? (pointerValue - x) / rect.width
        : (pointerValue - y) / rect.height
      const value = precent * (max.value - min.value) + min.value
      return value
    }

    function focusThumb() {
      const sliderElement = $el.value as Element
      (sliderElement.querySelector('[role="sliderThumb"]') as HTMLElement).focus()
    }

    function onSliderStart(value: number) {
      const parsedValue = getValueFromPointer(value)
      previousValue.value = parsedValue
      setValue(parsedValue)
    }

    function onSliderMove(value: number) {
      const parsedValue = getValueFromPointer(value)
      const hasChanged = previousValue.value !== parsedValue
      if (hasChanged)
        onValueChange.value?.(parsedValue)
      setValue(parsedValue)
    }

    function onSliderEnd(value: number) {
      const parsedValue = getValueFromPointer(value)
      const hasChanged = previousValue.value !== parsedValue
      if (hasChanged)
        onValueChange.value?.(parsedValue)
      setValue(parsedValue)
    }

    function onHomeKeyDown() {
      setValue(min.value)
    }
    function onEndKeyDown() {
      setValue(max.value)
    }

    function onStepKeyDown(event: KeyboardEvent) {
      if (UP_KEYS.includes(event.key))
        setValue((state.value ?? 0) + step.value)
      else if (DOWN_KEYS.includes(event.key))
        setValue((state.value ?? 0) - step.value)
      else
        throw new Error('Invalid key')
    }

    sliderProvider({
      disabled,
      scope: scopeSlider.value,
      min: min.value,
      max: max.value,
      value: state as ComputedRef<number>,
      step: step.value,
    })

    expose({
      innerRef: $el,
    })
    const originalReturn = () => [
      h(
        Primitive.span,
        {
          'type': 'span',
          'role': 'slider',
          'aria-orientation': toValue(orientation.value),
          'aria-valuemax': max.value,
          'aria-valuemin': min.value,
          'aria-valuenow': state.value,
          'aria-valuetext': state.value,
          'aria-labelledby': name.value,
          'aria-hidden': disabled.value,
          'ref': span,
          ...sliderProps,
          // slider events listeners
          'onKeydown': composeEventHandlers(sliderProps.onKeydown, (event) => {
            if (event.key === 'Home') {
              onHomeKeyDown()

              event.preventDefault()
            }
            else if (event.key === 'End') {
              onEndKeyDown()

              event.preventDefault()
            }
            else if (PAGE_KEYS.concat(ARROW_KEYS).includes(event.key)) {
              onStepKeyDown(event)

              event.preventDefault()
            }
          }),
          'onPointerdown': composeEventHandlers(sliderProps.onPointerdown, (event) => {
            ($el.value as unknown as HTMLElement)?.focus()
            const target = event.target as HTMLElement
            // 设置指针追踪，避免元素逃出区域，保证可以持续接收到pointer事件
            target.setPointerCapture(event.pointerId)
            onSliderStart(event.clientX)
            event.preventDefault()
            focusThumb()
          }),
          'onPointermove': composeEventHandlers(sliderProps.onPointermove, (event) => {
            const target = event.target as HTMLElement

            if (target.hasPointerCapture(event.pointerId))
              onSliderMove(event.clientX)
            event.preventDefault()
          }),
          'onPointerup': composeEventHandlers(sliderProps.onPointerup, (event) => {
            const target = event.target as HTMLElement
            // 设置指针追踪，避免元素逃出区域，保证可以持续接收到pointer事件
            target.releasePointerCapture(event.pointerId)
            onSliderEnd(event.clientX)
            event.preventDefault()
          }),
        },
        {
          default: () => slots.default?.(),
        },
      ),
      isFormControl.value
      // if this is a controlable component, we render an input to support form
      && h(BubbleInput, {
        control: span,
        bubbles: !hasConsumerStoppedPropagationRef.value,
        name: name.value,
        value: state.value,
        required: required.value,
        disabled: disabled.value,
        style: { transform: 'translateX(-100%)' },
      }),
    ]

    return originalReturn as unknown as {
      innerRef: SliderElement
    }
  },
})

type _Slider = MergeProps<SliderProps, SliderElement>

const OkuSlider = Slider as typeof Slider & (new () => { $props: _Slider })

export { OkuSlider, useSliderContext, createSliderScope }

export type { SliderProps }
