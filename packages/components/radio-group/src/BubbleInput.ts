import type { OkuElement } from '@oku-ui/primitive'
import { reactiveOmit, usePrevious, useSize } from '@oku-ui/use-composable'
import { defineComponent, h, mergeProps, ref, toRefs, watchEffect } from 'vue'
import type { PropType } from 'vue'

const BUBBLE_INPUT_NAME = 'OkuBubbleInput'

export type BubbleInputNaviteElement = OkuElement<'button'>
export type BubbleInputElement = Omit<HTMLButtonElement, 'checked'>

export interface BubbleInputProps {
  checked: boolean
  control: HTMLElement | null
  bubbles: boolean
}

const bubbleInputPropsObject = {
  props: {
    checked: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    control: {
      type: Object as PropType<HTMLElement | null>,
      default: null,
    },
    bubbles: {
      type: Boolean as PropType<boolean | undefined>,
      default: true,
    },
  },
}

const bubbleInput = defineComponent({
  name: BUBBLE_INPUT_NAME,
  inheritAttrs: false,
  props: {
    ...bubbleInputPropsObject.props,
  },
  setup(props, { attrs }) {
    const { control, checked, bubbles, ...inputProps } = toRefs(props)
    const reactiveInputProps = reactiveOmit(inputProps, (key, _value) => key === undefined)

    const inputRef = ref<HTMLInputElement | null>(null)
    const prevChecked = usePrevious(checked)
    const controlSize = useSize(control)

    watchEffect(() => {
      const input = inputRef.value!
      const inputProto = window.HTMLInputElement.prototype
      const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'checked')
      const setChecked = descriptor?.set
      if (prevChecked.value !== checked.value && setChecked) {
        const event = new Event('input', { bubbles: bubbles.value })
        setChecked.call(input, checked.value)
        input.dispatchEvent(event)
      }
    })

    return () => h('input', {
      'type': 'radio',
      'aria-hidden': true,
      'defaultChecked': checked.value,
      ...mergeProps(attrs, reactiveInputProps),
      'tabindex': -1,
      'ref': inputRef,
      'style': {
        ...attrs.style as any,
        ...controlSize.value,
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
        margin: '0px',
      },
    })
  },
})

export const OkuBubbleInput = bubbleInput as typeof bubbleInput &
(new () => {
  $props: BubbleInputNaviteElement
})
