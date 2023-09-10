import type { PropType, Ref } from 'vue'
import { defineComponent, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'

import type {
  OkuElement,
  PrimitiveProps,
} from '@oku-ui/primitive'
import type { Measurable } from '@oku-ui/utils'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { usePopperInject } from './popper'
import { scopePopperProps } from './utils'

const ANCHOR_NAME = 'OkuPopperAnchor'

export type PopperAnchorNaviteElement = OkuElement<'div'>
export type PopperAnchorElement = HTMLDivElement

export interface PopperAnchorProps extends PrimitiveProps {
  virtualRef?: Ref<Measurable | null>
}

export const popperAnchorProps = {
  props: {
    virtualRef: {
      type: Object as unknown as PropType<Measurable | null>,
      required: false,
      default: undefined,
    },
  },
  emits: {},
}

const popperAnchor = defineComponent({
  name: ANCHOR_NAME,
  inheritAttrs: false,
  props: {
    ...popperAnchorProps.props,
    ...scopePopperProps,
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const { virtualRef, scopeOkuPopper, ...anchorProps } = toRefs(props)
    const _reactive = reactive(anchorProps)
    const reactiveAnchorProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = usePopperInject(ANCHOR_NAME, scopeOkuPopper.value)

    const _ref = ref<HTMLDivElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(_ref, forwardedRef)

    watchEffect(() => {
      // Consumer can anchor the popper to something that isn't
      // a DOM node e.g. pointer position, so we override the
      // `anchorRef` with their virtual ref in this case.
      inject.onAnchorChange(virtualRef?.value || _ref.value)
    })

    const originalReturn = () =>
      virtualRef.value
        ? null
        : h(
          Primitive.div,
          {
            ...mergeProps(reactiveAnchorProps, attrs),
            ref: composedRefs,
          }, slots)

    return originalReturn
  },
})

export const OkuPopperAnchor = popperAnchor as typeof popperAnchor &
(new () => {
  $props: PopperAnchorNaviteElement
})
