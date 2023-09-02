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
    const composedRefs = useComposedRefs(_ref, forwardedRef, (el) => {
      inject.anchor.value = el as Measurable
    })

    watch(_ref, () => {
      // Consumer can anchor the popper to something that isn't
      // a DOM node e.g. pointer position, so we override the
      // `anchorRef` with their virtual ref in this case.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      inject.onAnchorChange(virtualRef?.value || _ref.value)
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
          }, slots)

    return originalReturn
  },
})

export const OkuPopperAnchor = popperAnchor as typeof popperAnchor &
(new () => {
  $props: ScopePopper<Partial<PopperAnchorElement>>
})
