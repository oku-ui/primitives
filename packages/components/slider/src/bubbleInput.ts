import { defineComponent, h, ref, toRefs, watchEffect } from 'vue'

import { usePrevious } from '@oku-ui/use-composable'

import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'

type BubbleInputIntrinsicElement = ElementType<'input'>

type BubbleInputElement = Partial<Omit<HTMLInputElement, 'checked'>>

interface BubbleInputProps extends PrimitiveProps {
  value: number
}

export const bubbleInputProps = {
  props: {
    value: {
      type: Number,
      default: undefined,
    },

  },
}

const bubbleInput = defineComponent({
  name: 'OkuBubbleInput',
  inheritAttrs: false,
  props: {
    ...bubbleInputProps.props,
  },
  setup(props, { attrs }) {
    const { value } = toRefs(props)

    const inputRef = ref<HTMLInputElement | null>(null)
    const prevValue = usePrevious(value)

    watchEffect(() => {
      const input = inputRef.value
      const inputProto = window.HTMLInputElement.prototype
      const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'value') as PropertyDescriptor
      const setValue = descriptor.set
      if (prevValue.value !== value.value && setValue) {
        const event = new Event('input', { bubbles: true })
        setValue.call(input, value)
        input?.dispatchEvent(event)
      }
    })

    return () =>
      h('input', {
        style: { display: 'none' },
        ...attrs,
        ref: inputRef,
        defaultValue: value,
      })
  },
})

export const OkuBubbleInput = bubbleInput as typeof bubbleInput
& (new () => {
  $props: Partial<BubbleInputElement>
})

export type {
  BubbleInputProps,
}
