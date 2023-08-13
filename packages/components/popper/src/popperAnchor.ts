import type { PropType, Ref } from 'vue'
import { defineComponent, h, ref, toRefs, watch } from 'vue'

import type {
  ComponentPublicInstanceRef,
  ElementType,
  IPrimitiveProps,
  InstanceTypeRef,
  MergeProps,
} from '@oku-ui/primitive'
import type { Measurable } from '@oku-ui/utils'
import { type Scope, ScopePropObject } from '@oku-ui/provide'
import { Primitive, PrimitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { usePopperInject } from './popper'

/* -------------------------------------------------------------------------------------------------
 * PopperAnchor
 * ----------------------------------------------------------------------------------------------- */

const ANCHOR_NAME = 'PopperAnchor'

type PopperAnchorElement = ElementType<'div'>
export type _PopperAnchorEl = HTMLDivElement

interface PopperAnchorProps extends IPrimitiveProps {
  virtualRef?: Ref<Measurable | null>
  scopeCheckbox?: Scope
}

const PopperAnchor = defineComponent({
  name: ANCHOR_NAME,
  inheritAttrs: false,
  props: {
    virtualRef: {
      type: Object as unknown as PropType<Ref<Measurable | null>>,
      required: false,
      default: undefined,
    },
    scopeCheckbox: {
      ...ScopePropObject,
    },
    ...PrimitiveProps,
  },
  setup(props, { attrs, slots }) {
    const { virtualRef } = toRefs(props)
    const { ...attrsAnchor } = attrs as PopperAnchorElement
    const inject = usePopperInject(ANCHOR_NAME, props.scopeCheckbox)

    const _ref = ref<ComponentPublicInstanceRef<HTMLDivElement> | null>(null)
    const composedRefs = useComposedRefs(_ref, useForwardRef())

    watch(_ref, () => {
      inject.anchor.value
        = virtualRef.value?.value || (_ref.value?.$el as Measurable)
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

type _PopperAnchor = MergeProps<PopperAnchorProps, PopperAnchorElement>
type InstancePopperAnchorType = InstanceTypeRef<typeof PopperAnchor, _PopperAnchorEl>

const OkuPopperAnchor = PopperAnchor as typeof PopperAnchor &
(new () => { $props: _PopperAnchor })

export { OkuPopperAnchor }

export type { PopperAnchorProps, PopperAnchorElement, InstancePopperAnchorType }
