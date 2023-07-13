import type { PropType, Ref } from 'vue'
import { defineComponent, ref, toRefs } from 'vue'

import type { RefElement } from '@oku-ui/primitive'
import type { Measurable } from '@oku-ui/utils'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'

/* -------------------------------------------------------------------------------------------------
 * Popper
 * ----------------------------------------------------------------------------------------------- */

const POPPER_NAME = 'Popper'

export const [createPopperProvider, _createPopperScope] = createProvideScope(POPPER_NAME)

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
      type: Object as unknown as PropType<Scope>,
      required: false,
      default: undefined,
    },
  },
  setup(props, { attrs, expose, slots }) {
    const { scopeCheckbox } = toRefs(props)
    const anchor = ref<Measurable | null>(null)

    PopperProvider({
      scope: scopeCheckbox.value as Scope,
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

type PopperRef = RefElement<typeof Popper>

const OkuPopper = Popper as typeof Popper & (new () => { $props: _PopperProps })

export {
  OkuPopper,
}

export type {
  PopperProps,
  PopperRef,
}
