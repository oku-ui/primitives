import type { ElementType, MergeProps } from '@oku-ui/primitive'
import { useForwardRef, usePrevious, useSize } from '@oku-ui/use-composable'
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
  watchEffect,
} from 'vue'

const BUBBLE_INPUT = 'OkuBubbleInput'

type InputElement = ElementType<'input'>
export type _BubbleInputEl = HTMLInputElement

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
  setup(props, { attrs }) {
    const { control, checked, bubbles } = toRefs(props)
    const { ...inputAttrs } = attrs as InputElement
    const inputRef = ref<HTMLInputElement | null>(null)
    const prevChecked = usePrevious(checked)
    const controlSize = useSize(control as Ref<HTMLElement>)

    const forwardedRef = useForwardRef()

    onMounted(() => {
      watchEffect(() => {
        const input = inputRef.value!
        const inputProto = window.HTMLInputElement.prototype
        const descriptor = Object.getOwnPropertyDescriptor(
          inputProto,
          'checked',
        ) as PropertyDescriptor
        const setChecked = descriptor.set

        if (prevChecked.value !== checked.value && setChecked) {
          const event = new Event('click', { bubbles: bubbles.value })
          setChecked.call(input, checked.value)
          input.dispatchEvent(event)
        }
      })
    })

    const originalReturn = () =>
      h('input', {
        'type': 'checkbox',
        'aria-hidden': true,
        'defaultChecked': checked.value,
        // TODO: 'value': inputAttrs.value does not work
        ...inputAttrs,
        'tabindex': -1,
        'ref': forwardedRef,
        'style': {
          ...((inputAttrs.style as CSSProperties) || {}),
          ...controlSize.value,
          position: 'absolute',
          pointerEvents: 'none',
          opacity: 0,
          margin: 0,
        },
      })

    return originalReturn
  },
})

type _BubbleInput = MergeProps<BubbleInputProps, InputElement>

const OkuBubbleInput = BubbleInput as typeof BubbleInput &
(new () => { $props: _BubbleInput })

export { OkuBubbleInput }

export type { BubbleInputProps }
