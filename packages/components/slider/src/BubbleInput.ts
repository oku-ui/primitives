import type { ElementType, MergeProps } from '@oku-ui/primitive'
import { usePrevious, useRef, useSize } from '@oku-ui/use-composable'
import type { CSSProperties, Ref } from 'vue'
import { defineComponent, h, onMounted, ref, toRefs, watchEffect } from 'vue'

const BUBBLE_INPUT = 'OkuBubbleInput'

type InputElement = ElementType<'input'>

interface BubbleInputProps extends Omit<InputElement, 'range'> {
  value: number // ranger value
  control: HTMLElement | null
  bubbles: boolean
}

export const BubbleInput = defineComponent({
  name: BUBBLE_INPUT,
  inheritAttrs: false,
  props: {
    value: {
      type: Number,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    min: {
      type: Number,
      default: undefined,
    },
    max: {
      type: Number,
      default: undefined,
    },
    step: {
      type: Number,
      default: undefined,
    },
    bubbles: {
      type: Boolean,
      default: undefined,
    },
    control: {
      type: Object,
      required: undefined,
    },
  },
  setup(props, { attrs, expose }) {
    const { control, value, name, bubbles, min, max, step } = toRefs(props)
    const { ...inputAttrs } = attrs as InputElement
    const inputRef = ref<HTMLInputElement | null>(null)
    const prevValue = usePrevious(value)
    const controlSize = useSize(control as Ref<HTMLElement>)

    const { $el } = useRef<InputElement>()

    onMounted(() => {
      watchEffect(() => {
        const input = inputRef.value!
        const inputProto = window.HTMLInputElement.prototype
        const descriptor = Object.getOwnPropertyDescriptor(
          inputProto,
          'value',
        ) as PropertyDescriptor
        const setValue = descriptor.set

        if (prevValue.value !== value.value && setValue) {
          const event = new Event('pointerdown', { bubbles: bubbles.value })
          setValue.call(input, value.value)
          input.dispatchEvent(event)
        }
      })
    })

    expose({
      innerRef: $el,
    })

    const originReturn = () =>
      h('input', {
        'type': 'number',
        'aria-hidden': true,
        'defaultValue': value.value,
        'name': name.value,
        'min': min.value,
        'max': max.value,
        'step': step.value,
        ...inputAttrs,
        'tabindex': -1,
        'ref': inputRef,
        'style': {
          ...((inputAttrs.style as CSSProperties) || {}),
          ...controlSize.value,
          position: 'absolute',
          PointerEvent: 'none',
          opacity: 0,
          margin: 0,
        },
      })

    return originReturn as unknown as {
      innerRef: InputElement
    }
  },
})

type _BubbleInput = MergeProps<BubbleInputProps, InputElement>

const OkuBubbleInput = BubbleInput as typeof BubbleInput & (new () => { $props: _BubbleInput })

export { OkuBubbleInput }

export type { BubbleInputProps }
