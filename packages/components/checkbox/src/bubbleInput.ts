import type { PropType, Ref } from 'vue'
import { defineComponent, h, ref, toRefs, watchEffect } from 'vue'

import { usePrevious, useSize } from '@oku-ui/use-composable'

import type { ElementType, IPrimitiveProps } from '@oku-ui/primitive'

import { type CheckedState, isIndeterminate } from './utils'

type BubbleInputElement = ElementType<'input'>

interface BubbleInputProps extends IPrimitiveProps {
  checked: Ref<CheckedState>
  control: HTMLElement | null
  bubbles: boolean
}

const OkuBubbleInput = defineComponent({
  name: 'OkuBubbleInput',
  inheritAttrs: false,
  props: {
    checked: {
      type: [Boolean, String, Number] as PropType<
        boolean | string | number | undefined | 'indeterminate'
      >,
      default: false,
    },
    control: {
      type: Object as PropType<Ref<HTMLElement | null>>,
      default: null,
    },
    bubbles: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { attrs }) {
    const { ...inputAttrs } = attrs as BubbleInputElement
    const { checked, bubbles, control } = toRefs(props)
    const _ref = ref<HTMLInputElement>()

    const prevChecked = usePrevious(checked)
    const controlSize = useSize(control)

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
        'defaultChecked': isIndeterminate(checked.value) ? false : checked,
        ...inputAttrs,
        'tabIndex': -1,
        'ref': _ref,
        'style': {
          ...inputAttrs.style as any,
          ...controlSize,
          position: 'absolute',
          pointerEvents: 'none',
          opacity: 0,
          margin: 0,
        },
      })
  },
})

export type {
  BubbleInputProps,
}
export {
  OkuBubbleInput,
}
