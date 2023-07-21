import type { ElementType, MergeProps } from '@oku-ui/primitive'
import { usePrevious, useRef, useSize } from '@oku-ui/use-composable'
import type {
  CSSProperties,
  Ref,
} from 'vue'
import {
  defineComponent,
  h,
  onMounted,
  ref,
  toRefs,
  watch,
} from 'vue'

const BUBBLE_INPUT = 'OkuBubbleInput'

type InputElement = ElementType<'input'>

interface BubbleInputProps extends Omit<InputElement, 'checked'> {
  checked: boolean
  control: HTMLElement | null
  bubbles: boolean
}

export const BubbleInput = defineComponent({
  name: BUBBLE_INPUT,
  inheritAttrs: false,
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    bubbles: {
      type: Boolean,
      default: true,
    },
    control: {
      type: Object,
      required: true,
    },
  },
  setup(props, { attrs, expose }) {
    const { control, checked, bubbles } = toRefs(props)

    const { ...inputProps } = attrs as InputElement

    const inputRef = ref<HTMLInputElement | null>(null)
    const prevChecked = usePrevious(checked)
    const controlSize = useSize(control as Ref<HTMLElement>)

    const { $el } = useRef<InputElement>()

    onMounted(() => {
      watch(
        [prevChecked, checked, bubbles],
        () => {
          const input = inputRef.value!
          const inputProto = window.HTMLInputElement.prototype
          const descriptor = Object.getOwnPropertyDescriptor(
            inputProto,
            'checked',
          ) as PropertyDescriptor
          const setChecked = descriptor.set

          if (prevChecked !== checked.value && setChecked) {
            const event = new Event('click', { bubbles: bubbles.value })
            setChecked.call(input, checked.value)
            input.dispatchEvent(event)
          }
        },
        { immediate: true },
      )
    })
    expose({
      innerRef: $el,
    })

    const originalReturn = () =>
      h('input', {
        'type': 'checkbox',
        'aria-hidden': true,
        'defaultChecked': checked.value,
        ...inputProps,
        'tabindex': -1,
        'ref': inputRef,
        'style': {
          ...((inputProps.style as CSSProperties) || {}),
          ...controlSize,
          position: 'absolute',
          pointerEvents: 'none',
          opacity: 0,
          margin: 0,
        },
      })

    return originalReturn as unknown as {
      innerRef: InputElement
    }
  },
})

type _BubbleInput = MergeProps<BubbleInputProps, InputElement>

const OkuBubbleInput = BubbleInput as typeof BubbleInput &
(new () => { $props: _BubbleInput })

export { OkuBubbleInput }

export type { BubbleInputProps }
