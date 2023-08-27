import type { PropType, Ref } from 'vue'
import { defineComponent, h, ref, toRefs, watch } from 'vue'

import type {
  ElementType,
  PrimitiveProps,
} from '@oku-ui/primitive'
import type { Measurable } from '@oku-ui/utils'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { usePopperInject } from './popper'
import type { ScopePopper } from './utils'
import { scopePopperProps } from './utils'

const ANCHOR_NAME = 'OkuPopperAnchor'

export type PopperAnchorIntrinsicElement = ElementType<'div'>
export type PopperAnchorElement = HTMLDivElement

export interface PopperAnchorProps extends PrimitiveProps {
  virtualRef?: Ref<Measurable | null>
}

export const popperAnchorProps = {
  props: {
    virtualRef: {
      type: Object as unknown as PropType<Ref<Measurable | null>>,
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
    const { virtualRef } = toRefs(props)
    const { ...attrsAnchor } = attrs as PopperAnchorIntrinsicElement
    const inject = usePopperInject(ANCHOR_NAME, props.scopeOkuPopper)

    const _ref = ref<HTMLDivElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(_ref, forwardedRef)

    watch(_ref, () => {
      inject.anchor.value
        = virtualRef.value?.value || (_ref.value as Measurable)
    })

    const originalReturn = () =>
      virtualRef.value
        ? null
        : h(
          Primitive.div,
          {
            ...attrsAnchor,
            asChild: props.asChild,
            ref: composedRefs,
          },
          {
            default: () => slots.default && slots.default?.(),
          },
        )

    return originalReturn
  },
})

export const OkuPopperAnchor = popperAnchor as typeof popperAnchor &
(new () => {
  $props: ScopePopper<Partial<PopperAnchorElement>>
})
