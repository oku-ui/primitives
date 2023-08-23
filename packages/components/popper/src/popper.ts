import type { Ref } from 'vue'
import { defineComponent, ref } from 'vue'

import type { Measurable } from '@oku-ui/utils'
import { createProvideScope } from '@oku-ui/provide'
import type { ScopePopper } from './utils'
import { scopePopperProps } from './utils'

const POPPER_NAME = 'OkuPopper'

export const [createPopperProvider, createPopperScope]
  = createProvideScope(POPPER_NAME)

export type PopperProvideValue = {
  anchor: Ref<Measurable | null>
  onAnchorChange(anchor: Measurable | null): void
}

export const [popperProvider, usePopperInject]
  = createPopperProvider<PopperProvideValue>(POPPER_NAME)

interface PopperProps {
}

const Popper = defineComponent({
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
      onAnchorChange(_anchor: Measurable | null) {
        anchor.value = _anchor
      },
    })

    const originalReturn = () => slots.default?.()

    return originalReturn
  },
})

export const OkuPopper = Popper as typeof Popper &
(new () => { $props: ScopePopper<PopperProps> })

export type { PopperProps }
