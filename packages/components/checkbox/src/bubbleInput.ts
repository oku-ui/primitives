import type { PropType } from 'vue'
import { computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'

import { usePrevious, useSize } from '@oku-ui/use-composable'

import type { OkuElement } from '@oku-ui/primitive'

import { type CheckedState, isIndeterminate } from './utils'

export type BubbleInputNaviteElement = Omit<OkuElement<'input', true>, 'checked'>

export interface BubbleInputProps {
  checked: CheckedState
  control: HTMLElement | null
  bubbles: boolean
}

export const bubbleInputProps = {
  props: {
    checked: {
      type: [Boolean, String, Number] as PropType<CheckedState>,
      required: true,
    },
    control: {
      type: Object as PropType<HTMLElement | null>,
      default: null,
      required: true,
    },
    bubbles: {
      type: Boolean,
      default: true,
      required: true,
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
    const { checked, bubbles, control } = toRefs(props)
    const _ref = ref<HTMLInputElement>()

    const prevChecked = usePrevious(checked)
    const controlSize = computed(() => useSize(control))

    watchEffect(() => {
      const input = _ref.value!
      const inputProto = window.HTMLInputElement.prototype
      const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'checked') as PropertyDescriptor
      const setChecked = descriptor.set

      if (prevChecked.value !== checked.value && setChecked) {
        const event = new Event('click', { bubbles: bubbles.value })
        input.indeterminate = isIndeterminate(checked.value)
        setChecked.call(input, isIndeterminate(checked.value) ? false : checked)
        input.dispatchEvent(event)
      }
    })

    return () =>
      h('input', {
        'type': 'checkbox',
        'aria-hidden': true,
        'defaultChecked': computed(() => isIndeterminate(checked.value) ? false : checked.value).value,
        ...attrs,
        'tabindex': -1,
        'ref': _ref,
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

export const OkuBubbleInput = bubbleInput as typeof bubbleInput
& (new () => {
  $props: BubbleInputNaviteElement
})
