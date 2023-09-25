import { defineComponent, ref } from 'vue'

import type { Measurable } from '@oku-ui/utils'
import type { PopperProps } from './props'
import { POPPER_NAME, popperProvider, scopePopperProps } from './props'

const popper = defineComponent({
  name: POPPER_NAME,
  inheritAttrs: false,
  props: {
    ...scopePopperProps,
  },
  setup(props, { slots }) {
    const anchor = ref<Measurable | null>(null)

    popperProvider({
      scope: props.scopeOkuPopper,
      anchor,
      onAnchorChange(value: Measurable | null) {
        anchor.value = value
      },
    })

    return () => slots.default?.()
  },
})

export const OkuPopper = popper as typeof popper &
(new () => { $props: PopperProps })
