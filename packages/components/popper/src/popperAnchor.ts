import type { PropType, Ref } from 'vue'
import { defineComponent, h, toRefs, watch } from 'vue'

import type { ElementType, MergeProps, PrimitiveProps } from '@oku-ui/primitive'
import type { Measurable } from '@oku-ui/utils'
import type { Scope } from '@oku-ui/provide'
import { useRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { usePopperInject } from './popper'

/* -------------------------------------------------------------------------------------------------
 * PopperAnchor
 * ----------------------------------------------------------------------------------------------- */

const ANCHOR_NAME = 'PopperAnchor'

type PopperAnchorElement = ElementType<'div'>
interface PopperAnchorProps extends PrimitiveProps {
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
      type: Object as unknown as PropType<Scope>,
      required: false,
      default: undefined,
    },
    asChild: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { attrs, expose, slots }) {
    const { virtualRef, scopeCheckbox } = toRefs(props)
    const { ...attrsAnchor } = attrs as PopperAnchorElement
    const inject = usePopperInject(ANCHOR_NAME, scopeCheckbox.value)
    const { $el, newRef } = useRef<Measurable>()

    watch($el, () => {
      inject.value.anchor.value = virtualRef.value?.value || $el.value as Measurable
    })

    const originalReturn = () => virtualRef.value
      ? null
      : h(Primitive.div, {
        ...attrsAnchor,
        asChild: props.asChild,
        ref: newRef,
      },
      {
        default: () => slots.default && slots.default?.(),
      },
      )

    return originalReturn
  },
})

type _PopperAnchor = MergeProps<PopperAnchorProps, PopperAnchorElement>

const OkuPopperAnchor = PopperAnchor as typeof PopperAnchor & (new () => { $props: _PopperAnchor })

export {
  OkuPopperAnchor,
}

export type {
  PopperAnchorProps,
  PopperAnchorElement,
}
