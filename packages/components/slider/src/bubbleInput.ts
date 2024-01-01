import { defineComponent, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'

import { reactiveOmit, usePrevious } from '@oku-ui/use-composable'

import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'

export type BubbleInputNaviteElement = OkuElement<'input'>

export type BubbleInputElement = Partial<Omit<HTMLInputElement, 'checked'>>

export interface BubbleInputProps extends PrimitiveProps {
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
    const { value, ...inputProps } = toRefs(props)
    const _reactive = reactive(inputProps)
    const reactiveInputProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

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
        ...mergeProps(attrs, reactiveInputProps),
        ref: inputRef,
        defaultValue: value.value,
      })
  },
})

export const OkuBubbleInput = bubbleInput as typeof bubbleInput
  & (new () => {
    $props: BubbleInputNaviteElement
  })
