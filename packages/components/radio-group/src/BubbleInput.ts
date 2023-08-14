import type { ElementType, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { usePrevious, useSize } from '@oku-ui/use-composable'
import { computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import type { PropType } from 'vue'

const BUBBLE_INPUT_NAME = 'BubbleInput'

type BubbleInputElement = ElementType<'button'>
export type _BubbleInputEl = Omit<HTMLButtonElement, 'checked'>

interface BubbleInputProps {
  checked: boolean
  control: HTMLElement | null
  bubbles: boolean
}

const BubbleInputPropsObject = {
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
  props: BubbleInputPropsObject,
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

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _Props = MergeProps<BubbleInputProps, BubbleInputElement>

type IstanceBubbleType = InstanceTypeRef<typeof BubbleInput, _BubbleInputEl>

const OkuBubbleInput = BubbleInput as typeof BubbleInput & (new () => { $props: _Props })

export { OkuBubbleInput }

export type { BubbleInputProps, BubbleInputElement, IstanceBubbleType }
