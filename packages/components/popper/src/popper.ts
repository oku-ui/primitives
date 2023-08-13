import type { Ref } from 'vue'
import { defineComponent, ref } from 'vue'

import type { Measurable } from '@oku-ui/utils'
import type { Scope } from '@oku-ui/provide'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'

/* -------------------------------------------------------------------------------------------------
 * Popper
 * ----------------------------------------------------------------------------------------------- */

const POPPER_NAME = 'Popper'

export const [createPopperProvider, createPopperScope]
  = createProvideScope(POPPER_NAME)

export type PopperInjectValue = {
  anchor: Ref<Measurable | null>
  onAnchorChange(anchor: Measurable | null): void
}

export const [PopperProvider, usePopperInject]
  = createPopperProvider<PopperInjectValue>(POPPER_NAME)

interface PopperProps {
  scopeCheckbox?: Scope
}

const Popper = defineComponent({
  name: POPPER_NAME,
  inheritAttrs: false,
  props: {
    scopeCheckbox: {
      ...ScopePropObject,
    },
  },
  setup(props, { slots }) {
    const anchor = ref<Measurable | null>(null)

    PopperProvider({
      scope: props.scopeCheckbox,
      anchor,
      onAnchorChange(_anchor: Measurable | null) {
        anchor.value = _anchor
      },
    })

    const originalReturn = () => slots.default?.()

    return originalReturn
  },
})

type _PopperProps = PopperProps

const OkuPopper = Popper as typeof Popper &
(new () => { $props: _PopperProps })

export { OkuPopper }

export type { PopperProps }
