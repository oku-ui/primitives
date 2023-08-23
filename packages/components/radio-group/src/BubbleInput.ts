import type { ElementType } from '@oku-ui/primitive'
import { usePrevious, useSize } from '@oku-ui/use-composable'
import { computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import type { PropType } from 'vue'

const BUBBLE_INPUT_NAME = 'BubbleInput'

export type BubbleInputIntrinsicElement = ElementType<'button'>
export type BubbleInputElement = Omit<HTMLButtonElement, 'checked'>

interface BubbleInputProps {
  checked: boolean
  control: HTMLElement | null
  bubbles: boolean
}

const bubbleInputPropsObject = {
  checked: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  control: {
    type: HTMLElement as PropType<HTMLElement | null>,
    default: null,
  },
  bubbles: {
    type: Boolean as PropType<boolean | undefined>,
    default: false,
  },
}

const BubbleInput = defineComponent({
  name: BUBBLE_INPUT_NAME,
  inheritAttrs: false,
  props: bubbleInputPropsObject,
  setup(props, { attrs }) {
    const { control, checked } = toRefs(props)
    const bubbles = computed(() => props.bubbles ?? true)
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
      ...attrs,
      'tabindex': -1,
      'ref': inputRef,
      'style': {
        ...attrs.style as any,
        ...controlSize.value,
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
        margin: 0,
      },
    })
  },
})

const OkuBubbleInput = BubbleInput as typeof BubbleInput &
(new () => {
  $props: Partial<BubbleInputElement>
})

export { OkuBubbleInput }

export type { BubbleInputProps }
